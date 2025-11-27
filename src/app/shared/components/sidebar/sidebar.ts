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

    usuario = computed(() => this.session.getUsuarioActivo());
    rol = computed(() => this.usuario()?.rol);

    sidebarLinks = computed(() => {
        const path = this.router.url;

        // TÉCNICO - TICKETS
        if (path.startsWith('/tickets')) {
            return [
                { label: 'Dashboard', path: '/tickets' },
                { label: 'Todos los tickets', path: '/tickets/list' },
                { label: 'Nuevo Ticket', path: '/tickets/new' }
            ];
        }

        // TÉCNICO - INVENTARIO
        if (path.startsWith('/inventario')) {
            return [
                { label: 'Mi Inventario', path: '/inventario' },
                { label: 'Agregar Ítem', path: '/inventario/new' }
            ];
        }

        // CLIENTE - MIS TICKETS
        if (path.startsWith('/mis-tickets')) {
            return [
                { label: 'Dashboard', path: '/mis-tickets' },
                { label: 'Todos mis tickets', path: '/mis-tickets/list' }
            ];
        }

        // CLIENTE o TÉCNICO - CLIENTES / PERFIL / etc
        return [];
    });

}