import { Injectable } from '@angular/core';
import { Usuario } from '../../core/models/usuario';

@Injectable({ providedIn: 'root' })

export class SessionService {

    private key = 'usuarioActivo';

    setUsuarioActivo(usuario: Usuario): void {

        localStorage.setItem(this.key, JSON.stringify(usuario));
    }

    getUsuarioActivo(): Usuario | null {

        const raw = localStorage.getItem(this.key);
        return raw ? JSON.parse(raw) : null;
    }

    clear(): void {

        localStorage.removeItem(this.key);
    }

    isLogged(): boolean {
      
        return this.getUsuarioActivo() !== null;
    }
}