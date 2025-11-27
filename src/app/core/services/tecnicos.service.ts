import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { UsuariosService } from './usuarios.service';
import { Tecnico } from '../models/tecnico';

@Injectable({
  providedIn: 'root'
})

export class TecnicosService {

  constructor(private usuariosService: UsuariosService) {}

  getAll(): Observable<Tecnico[]> {

      return this.usuariosService.getAll().pipe(
        map(users => users.filter(u => u.rol === 'tecnico') as Tecnico[])
      );
  }

  getById(id: string): Observable<Tecnico> {

      return this.usuariosService.getById(id) as Observable<Tecnico>;
  }

  create(tecnico: Tecnico): Observable<Tecnico> {

      tecnico.rol = 'tecnico';
      return this.usuariosService.create(tecnico) as Observable<Tecnico>;
  }

  update(tecnico: Tecnico): Observable<Tecnico> {

      return this.usuariosService.update(tecnico) as Observable<Tecnico>;
  }


//--- De momento no voy a borrar usuarios, pero dejo la función.
/*
  delete(id: string): Observable<void> {

      return this.usuariosService.delete(id);
  }
*/
}