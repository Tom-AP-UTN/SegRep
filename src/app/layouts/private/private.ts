import { Component, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../../shared/components/navbar/navbar';
import { Sidebar } from '../../shared/components/sidebar/sidebar';
import { SessionService } from '../../core/services/session.service';

@Component({
    selector: 'app-private',
    standalone: true,
    imports: [
        RouterOutlet,
        Navbar,
        Sidebar,
    ],
    templateUrl: './private.html',
    styleUrl: './private.css'
})

export class Private {

    constructor(private session: SessionService) {}

    usuario = computed(() => this.session.getUsuarioActivo());
}