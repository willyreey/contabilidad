import { useMemo, useState } from "react";
import * as XLSX from "xlsx";

const ALLOWED_EXTENSIONS = ["csv", "xlsx", "xls", "xml", "txt"];
const MAX_FILE_SIZE_MB = 5;

function normalizeType(value) {
  const normalized = `${value ?? ""}`.toLowerCase();

  if (normalized.includes("egre")) {
    return "egreso";
  }

  if (normalized.includes("ingr") || normalized.includes("ingreso")) {
    return "ingreso";
  }

  return "ingreso";
}

function normalizeAmount(value) {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  const numericValue = `${value}`.replace(/[^0-9.-]/g, "");
  return Number.parseFloat(numericValue || "0");
}

function normalizeDate(value) {
  if (!value) {
    return "Sin fecha";
  }

  const textValue = `${value}`.trim();
  return textValue;
}

function normalizeTransaction(raw) {
  const date = normalizeDate(
    raw.date || raw.fecha || raw.Date || raw.Fecha || raw.createdAt || raw.created_at
  );

  const type = normalizeType(
    raw.type || raw.Tipo || raw.tipo || raw.operation || raw.operacion || raw.movimiento || raw.movimiento_tipo
  );

  const description =
    raw.description ||
    raw.descripcion ||
    raw.concept ||
    raw.concepto ||
    raw.memo ||
    raw.detalle ||
    "Sin descripcion";

  const amount = normalizeAmount(
    raw.amount || raw.monto || raw.Amount || raw.Monto || raw.valor || raw.Valor || raw.total || raw.Total
  );

  const category =
    raw.category || raw.categoria || raw.classification || raw.clasificacion || raw.account || raw.cuenta || "General";

  const reference = raw.reference || raw.referencia || raw.id || raw.codigo || "-";

  return {
    date,
    description: `${description}`,
    amount,
    type,
    category: `${category}`,
    reference: `${reference}`,
  };
}

function getExtension(fileName) {
  return (fileName.split(".").pop() || "").toLowerCase();
}

function parseRowObjects(rows) {
  return rows
    .map((row) => normalizeTransaction(row))
    .filter((row) => row.description !== "" && (row.amount !== 0 || row.type));
}

async function parseXmlFile(file) {
  const text = await file.text();
  const parser = new DOMParser();
  const xml = parser.parseFromString(text, "application/xml");
  const recordNodes = Array.from(xml.querySelectorAll("transaction, row, registro"));

  if (recordNodes.length === 0) {
    throw new Error("No se encontraron registros válidos dentro del XML.");
  }

  const rows = recordNodes.map((node) => {
    const getValue = (tag) => {
      const element = node.querySelector(tag);
      return element ? element.textContent : "";
    };

    return {
      date: getValue("date") || getValue("fecha"),
      description: getValue("description") || getValue("descripcion") || getValue("concept"),
      amount: getValue("amount") || getValue("monto") || getValue("valor"),
      type: getValue("type") || getValue("tipo") || getValue("movimiento"),
      category: getValue("category") || getValue("categoria"),
      reference: getValue("reference") || getValue("referencia") || getValue("id"),
    };
  });

  return parseRowObjects(rows);
}

async function parseTextFile(file) {
  const text = await file.text();
  const lines = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (lines.length === 0) {
    throw new Error("El archivo de texto está vacío.");
  }

  const rows = [];

  for (const line of lines) {
    const parts = line.split(/\s*\|\s*|\s*,\s*|\s*\t\s*/).filter(Boolean);
    if (parts.length >= 4) {
      rows.push({
        date: parts[0],
        type: parts[1],
        description: parts[2],
        amount: parts[3],
        category: parts[4] || "General",
        reference: parts[5] || "-",
      });
    }
  }

  if (rows.length === 0) {
    throw new Error("No fue posible interpretar el texto como movimientos contables.");
  }

  return parseRowObjects(rows);
}

async function parseSpreadsheetFile(file) {
  const extension = getExtension(file.name);
  const buffer = extension === "csv" ? await file.text() : await file.arrayBuffer();
  const workbook = XLSX.read(buffer, extension === "csv" ? { type: "string" } : { type: "array" });
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json(sheet, { defval: "" });

  if (!rows.length) {
    throw new Error("El archivo no contiene filas para procesar.");
  }

  return parseRowObjects(rows);
}

export default function ImportTransactions() {
  const [transactions, setTransactions] = useState([]);
  const [fileName, setFileName] = useState("");
  const [error, setError] = useState("");
  const [status, setStatus] = useState("Esperando archivo");

  const summary = useMemo(() => {
    const ingresos = transactions.filter((item) => item.type === "ingreso");
    const egresos = transactions.filter((item) => item.type === "egreso");
    const totalIngresos = ingresos.reduce((sum, item) => sum + item.amount, 0);
    const totalEgresos = egresos.reduce((sum, item) => sum + item.amount, 0);

    return {
      ingresos: ingresos.length,
      egresos: egresos.length,
      totalIngresos,
      totalEgresos,
      saldo: totalIngresos - totalEgresos,
    };
  }, [transactions]);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return;
    }

    const extension = getExtension(selectedFile.name);

    if (!ALLOWED_EXTENSIONS.includes(extension)) {
      setError("Solo se aceptan archivos CSV, XLSX, XML o TXT.");
      setTransactions([]);
      setFileName("");
      setStatus("Formato no soportado");
      return;
    }

    if (selectedFile.size > MAX_FILE_SIZE_MB * 1024 * 1024) {
      setError(`El archivo no debe superar ${MAX_FILE_SIZE_MB}MB.`);
      setTransactions([]);
      setFileName("");
      setStatus("Archivo demasiado grande");
      return;
    }

    setError("");
    setFileName(selectedFile.name);
    setStatus("Procesando archivo...");

    try {
      let parsedTransactions = [];

      if (extension === "xml") {
        parsedTransactions = await parseXmlFile(selectedFile);
      } else if (extension === "txt") {
        parsedTransactions = await parseTextFile(selectedFile);
      } else {
        parsedTransactions = await parseSpreadsheetFile(selectedFile);
      }

      setTransactions(parsedTransactions);
      setStatus(`Procesado correctamente: ${parsedTransactions.length} movimientos`);
    } catch (parseError) {
      setTransactions([]);
      setStatus("No fue posible procesar el archivo");
      setError(parseError.message || "Ocurrió un error inesperado.");
    }
  };

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2 className="h4 fw-bold mb-1">Importar movimientos</h2>
          <p className="mb-0" style={{ color: "var(--color-text-muted)" }}>
            Sube un archivo para analizar ingresos y egresos y prepararlos para guardarlos en el backend.
          </p>
        </div>
      </div>

      <div className="card border-0 mb-4" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div className="card-body">
          <label className="form-label fw-semibold">Selecciona un archivo</label>
          <input className="form-control" type="file" accept=".csv,.xlsx,.xls,.xml,.txt" onChange={handleFileChange} />
          <div className="form-text">Formatos soportados: CSV, XLSX/XLS, XML y TXT.</div>

          {fileName ? (
            <div className="alert alert-info mt-3 mb-0" role="alert">
              Archivo cargado: <strong>{fileName}</strong> · {status}
            </div>
          ) : null}

          {error ? (
            <div className="alert alert-danger mt-3 mb-0" role="alert">
              {error}
            </div>
          ) : null}
        </div>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ boxShadow: "var(--shadow-sm)" }}>
            <div className="card-body">
              <div className="small text-muted">Ingresos</div>
              <div className="h4 fw-bold mb-0">{summary.ingresos}</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ boxShadow: "var(--shadow-sm)" }}>
            <div className="card-body">
              <div className="small text-muted">Egresos</div>
              <div className="h4 fw-bold mb-0">{summary.egresos}</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ boxShadow: "var(--shadow-sm)" }}>
            <div className="card-body">
              <div className="small text-muted">Total ingresos</div>
              <div className="h4 fw-bold mb-0">${summary.totalIngresos.toFixed(2)}</div>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card border-0 h-100" style={{ boxShadow: "var(--shadow-sm)" }}>
            <div className="card-body">
              <div className="small text-muted">Saldo</div>
              <div className={`h4 fw-bold mb-0 ${summary.saldo >= 0 ? "text-success" : "text-danger"}`}>
                ${summary.saldo.toFixed(2)}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card border-0" style={{ boxShadow: "var(--shadow-sm)" }}>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead style={{ backgroundColor: "var(--color-background)" }}>
                <tr>
                  <th>Fecha</th>
                  <th>Tipo</th>
                  <th>Descripcion</th>
                  <th>Monto</th>
                  <th>Categoria</th>
                  <th>Referencia</th>
                </tr>
              </thead>
              <tbody>
                {transactions.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center py-4" style={{ color: "var(--color-text-muted)" }}>
                      Aún no hay movimientos cargados.
                    </td>
                  </tr>
                ) : (
                  transactions.map((item, index) => (
                    <tr key={`${item.reference}-${index}`}>
                      <td>{item.date}</td>
                      <td>
                        <span className={`badge ${item.type === "ingreso" ? "bg-success" : "bg-danger"}`}>
                          {item.type}
                        </span>
                      </td>
                      <td>{item.description}</td>
                      <td>${item.amount.toFixed(2)}</td>
                      <td>{item.category}</td>
                      <td>{item.reference}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
