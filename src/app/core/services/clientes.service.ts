import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UsuariosService } from './usuarios.service';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  constructor(private usuariosService: UsuariosService) {}

  getAll(): Observable<Cliente[]> {

      return this.usuariosService.getAll().pipe(
        map(users => users.filter(u => u.rol === 'cliente') as Cliente[])
      );
  }

  getById(id: number): Observable<Cliente> {

      return this.usuariosService.getById(id) as Observable<Cliente>;
  }

  create(cliente: Cliente): Observable<Cliente> {

      cliente.rol = 'cliente';
      return this.usuariosService.create(cliente) as Observable<Cliente>;
  }

  update(cliente: Cliente): Observable<Cliente> {

      return this.usuariosService.update(cliente) as Observable<Cliente>;
  }


//--- De momento no voy a borrar usuarios, pero dejo la función.
/*
  delete(id: number): Observable<void> {

      return this.usuariosService.delete(id);
  }
*/
}