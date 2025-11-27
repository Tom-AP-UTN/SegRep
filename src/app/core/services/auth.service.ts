import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../../core/models/usuario';

@Injectable({ providedIn: 'root' })

export class AuthService {

    private baseUrl = 'http://localhost:3000/usuarios';

    constructor(private http: HttpClient) {}

    login(email: string, password: string): Observable <Usuario[]> {

        return this.http.get <Usuario[]> (`${this.baseUrl}?email=${email}&password=${password}`);
    }
}