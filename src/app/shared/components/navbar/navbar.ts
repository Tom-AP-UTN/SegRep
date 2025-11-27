import { Component, computed } from '@angular/core';
import { Router } from '@angular/router';
import { SessionService } from '../../../core/services/session.service';

@Component({
    selector: 'app-navbar',
    standalone: true,
    templateUrl: './navbar.html',
    styleUrl: './navbar.css'
})

export class Navbar {

    constructor( private session: SessionService, private router: Router) { }

    usuario = computed(() => this.session.getUsuarioActivo());
    rol = computed(() => this.usuario()?.rol);

    logout(): void {
        
        this.session.clear();
        this.router.navigateByUrl('/auth', { replaceUrl: true });
    }
}