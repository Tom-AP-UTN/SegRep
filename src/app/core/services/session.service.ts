import { Injectable, signal, computed } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { Usuario } from '../models/usuario';
import { map, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class SessionService {

    private readonly STORAGE_KEY = 'session-user';

  // Estado interno manejado con una signal
    private usuarioActualSignal = signal<Usuario | null>(this.cargarStorage());

  // Helpers computados
    usuarioActual   = computed(() => this.usuarioActualSignal()             );
    isLoggedIn      = computed(() => this.usuarioActualSignal() !== null    );
    rolActual       = computed(() => this.usuarioActualSignal()?.rol ?? null);
    idUsuarioActual = computed(() => this.usuarioActualSignal()?.id ?? null );

    constructor(private usuariosService: UsuariosService) {}

  // ----------------------------------
  //  LOGIN
  // ----------------------------------

    login(email: string, password: string): Observable<Usuario | null> {

        return this.usuariosService.getAll().pipe(
            map(users => {

                const user = users.find(u => u.email === email && u.password === password) || null;

                if (user) {
                    this.usuarioActualSignal.set(user);
                    this.guardarStorage(user);
                }

                return user;
            })
        );
    }



  // ----------------------------------
  //  LOGOUT
  // ----------------------------------

    logout(): void {

        this.usuarioActualSignal.set(null);
        localStorage.removeItem(this.STORAGE_KEY);
    }



  // ---------------------------------------------------
  //  Helpers para session persistida en localStorage.
  //  Me guardan el usuario aunque se cierre el nav.
  // ---------------------------------------------------

    private cargarStorage(): Usuario | null {

        const data = localStorage.getItem(this.STORAGE_KEY);
        return data ? JSON.parse(data) : null;
    }

    private guardarStorage(user: Usuario): void {

        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(user));
    }

}