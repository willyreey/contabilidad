<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function create(): Response
    {
        return Inertia::render('Users/Create', [
            'status' => session('status'),
        ]);
    }

    public function store(StoreUserRequest $request): RedirectResponse
    {
        User::create([
            ...$request->safe()->except('password'),
            'password' => Hash::make($request->validated('password')),
            'role' => 'user',
        ]);

        return redirect()->route('usuarios.create')->with('status', 'Usuario creado correctamente.');
    }
}
