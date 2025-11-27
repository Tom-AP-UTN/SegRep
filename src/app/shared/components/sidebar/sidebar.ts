import { Component, computed } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { SessionService } from '../../../core/services/session.service';

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './sidebar.html',
    styleUrl: './sidebar.css'
})

export class Sidebar {

    constructor(
        private router: Router,
        private session: SessionService
    ) { }

    usuario = computed(() => this.session.usuarioActual());
    rol = computed(() => this.usuario()?.rol);

    sidebarLinks = computed(() => {
        
        const path = this.router.url;

        // TECNICO - TICKETS
        if (path.startsWith('/app/tickets')) {
            return [
                { label: 'Dashboard', path: '/app/tickets/dashboard' },
                { label: 'Todos los tickets', path: '/app/tickets/list' },
                { label: 'Nuevo Ticket', path: '/app/tickets/new' }
            ];
        }

        // TÉCNICO - INVENTARIO
        if (path.startsWith('/app/inventario')) {
            return [
                { label: 'Mi Inventario', path: '/app/inventario' },
                { label: 'Agregar Ítem', path: '/app/inventario/new' }
            ];
        }

        // CLIENTE - MIS TICKETS
        if (path.startsWith('/app/mis-tickets')) {
            return [
                { label: 'Dashboard', path: '/app/mis-tickets/dashboard' },
                { label: 'Todos mis tickets', path: '/app/mis-tickets/list' }
            ];
        }

        return [];
    });

}