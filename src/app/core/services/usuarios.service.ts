import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})

export class UsuariosService {

  private apiUrl = 'http://localhost:3000/usuarios';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Usuario[]> {

      return this.http.get<Usuario[]>(this.apiUrl);
  }

  getById(id: string): Observable<Usuario> {

      return this.http.get<Usuario>(`${this.apiUrl}/${id}`);
  }

  create(usuario: Usuario): Observable<Usuario> {

      return this.http.post<Usuario>(this.apiUrl, usuario);
  }

  update(usuario: Usuario): Observable<Usuario> {

      return this.http.put<Usuario>(`${this.apiUrl}/${usuario.id}`, usuario);
  }



//--- De momento no voy a borrar usuarios, pero dejo la función.
/*
  delete(id: string): Observable<void> {

      return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
*/
}