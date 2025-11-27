import { Routes } from '@angular/router';
import { Login } from './features/auth/pages/login/login';
import { AuthGuard } from './core/guards/auth.guard';
import { PublicLayout } from './layouts/publicLayout/public';
import { PrivateLayout } from './layouts/privateLayout/private';

export const routes: Routes = [

    // --- PUBLIC
    {
        path: 'public',
        component: PublicLayout,
        children: [
            { path: 'login', component: Login },

            {
                path: 'register',
                loadComponent: () =>
                    import('./features/auth/pages/register/register')
                        .then(m => m.Register)
            },

            { path: '', redirectTo: 'login', pathMatch: 'full' }
        ]
    },

    // --- PRIVATE
    {
        path: 'app',
        component: PrivateLayout,
        canActivate: [AuthGuard],
        children: [

            // DASHBOARD técnico
            {
                path: 'tickets/dashboard',
                loadComponent: () =>
                    import('./features/tickets/pages/dashboard/dashboard')
                        .then(m => m.Dashboard)
            },

            // LISTA de tickets
            {
                path: 'tickets/list',
                loadComponent: () =>
                    import('./features/tickets/pages/list/list')
                        .then(m => m.List)
            },

            // NUEVO ticket
            {
                path: 'tickets/new',
                loadComponent: () =>
                    import('./features/tickets/pages/new-ticket/new-ticket')
                        .then(m => m.NewTicket)
            },

            // VER ticket
            {
                path: 'tickets/:id',
                loadComponent: () =>
                    import('./features/tickets/pages/view-ticket/view-ticket')
                        .then(m => m.ViewTicket)
            },

            // NUEVO update
            {
                path: 'tickets/:id/new-update',
                loadComponent: () =>
                    import('./features/tickets/pages/new-update/new-update')
                        .then(m => m.NewUpdate)
            },

            // DASHBOARD CLIENTE — (TEMPORAL, hay que cambiarlo)
            {
                path: 'mis-tickets/dashboard',
                loadComponent: () =>
                    import('./features/tickets/pages/dashboard/dashboard')
                        .then(m => m.Dashboard)
            },

            {
                path: 'tickets/:id/edit',
                loadComponent: () =>
                    import('./features/tickets/pages/edit-ticket/edit-ticket')
                        .then(m => m.EditTicket)
            },

            // DEFAULT PRIVATE
            {
                path: '',
                redirectTo: '/app/tickets/dashboard',
                pathMatch: 'full'
            }
        ]
    },

    // --- DEFAULT GLOBAL
    { path: '', redirectTo: 'public/login', pathMatch: 'full' },
    { path: '**', redirectTo: 'public/login' }
];
