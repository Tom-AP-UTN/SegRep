import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, switchMap, map } from 'rxjs';
import { Ticket } from '../models/ticket';
import { Update } from '../models/update';

@Injectable({
  providedIn: 'root'
})

export class TicketsService {

  private apiUrl = 'http://localhost:3000/tickets';

  constructor(private http: HttpClient) {}

  // ------------------------------
  //  TICKETS ABM
  // ------------------------------

  getAll(): Observable<Ticket[]> {

      return this.http.get<Ticket[]>(this.apiUrl);
  }

  getById(id: string): Observable<Ticket> {

      return this.http.get<Ticket>(`${this.apiUrl}/${id}`);
  }

  create(ticket: Ticket): Observable<Ticket> {

      return this.http.post<Ticket>(this.apiUrl, ticket);
  }

  update(ticket: Ticket): Observable<Ticket> {

      return this.http.put<Ticket>(`${this.apiUrl}/${ticket.id}`, ticket);
  }

  delete(id: string): Observable<void> {

      return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Tickets del técnico actual
  getByTecnico(idTecnico: string) {

    return this.http.get<Ticket[]>(`${this.apiUrl}?idTecnico=${idTecnico}`);
  }

  // Tickets del cliente actual
  getByCliente(idCliente: string) {

    return this.http.get<Ticket[]>(`${this.apiUrl}?idCliente=${idCliente}`);
  }



  
  // --------------------------------------------------------------------------------
  //  UPDATES (anidados) - Lo diseñé como íntegro al ticket, así que lo dejo acá
  // --------------------------------------------------------------------------------

  agregarUpdate(idTicket: string, update: Omit<Update, 'nroUpdate'>): Observable<Ticket> {

      return this.getById(idTicket).pipe(
        switchMap(ticket => {

          // Generar nroUpdate
          const nroUpdate = ticket.updates.length + 1;

          const updateFinal: Update = { ...update, nroUpdate };

        ticket.updates.push(updateFinal);
        return this.update(ticket);
      })
    );
  }


  eliminarUpdate(idTicket: string, nroUpdate: number): Observable<Ticket> {

      return this.getById(idTicket).pipe(
        switchMap(ticket => {

          ticket.updates = ticket.updates.filter(u => u.nroUpdate !== nroUpdate);

          // Recalcular correlativos
          ticket.updates = ticket.updates.map((u, index) => ({...u, nroUpdate: index + 1 }));

          return this.update(ticket);
      })
    );
  }


  editarUpdate(idTicket: string, nroUpdate: number, cambios: Partial<Update>): Observable<Ticket> {

      return this.getById(idTicket).pipe(
        switchMap(ticket => {

          const index = ticket.updates.findIndex(u => u.nroUpdate === nroUpdate);
          if (index === -1) return this.update(ticket);

          // Mantener nroUpdate original
          ticket.updates[index] = { ...ticket.updates[index], ...cambios, nroUpdate };

          return this.update(ticket);
      })
    );
  }

}