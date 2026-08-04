import { usePage } from '@inertiajs/react';

export function useAuth() {
    const { auth } = usePage().props;

    return {
        user: auth.user,
        isAdmin: auth.user?.role === 'admin',
    };
}
