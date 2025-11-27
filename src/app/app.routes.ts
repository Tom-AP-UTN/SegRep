import { Routes } from '@angular/router';
import { Public } from './layouts/public/public';
import { Private } from './layouts/private/private';
import { Login } from './features/auth/pages/login/login';
import { Home } from './features/dashboard/pages/home/home';
import { AuthGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    {
        path: 'auth',
        component: Public,
        children: [
            { path: '', component: Login }
        ]
    },
    {
        path: '',
        component: Private,
        canActivate: [AuthGuard],
        children: [
            { path: 'dashboard', component: Home }
        ]
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];