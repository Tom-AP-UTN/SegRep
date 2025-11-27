import { Component } from '@angular/core';
import { TicketsService } from '../../../../core/services/tickets.service';
import { SessionService } from '../../../../core/services/session.service';
import { ClientesService } from '../../../../core/services/clientes.service';
import { TecnicosService } from '../../../../core/services/tecnicos.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tickets-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './list.html'
})
export class List {

  tickets: any[] = [];
  rol: string | null = null;

  // MAPAS PARA MOSTRAR NOMBRES EN LA TABLA (NO FORMAN PARTE DEL TICKET)
  clientesMapa: Record<string, string> = {};
  tecnicosMapa: Record<string, string> = {};

  constructor(
    private ticketsService: TicketsService,
    private session: SessionService,
    private clientesService: ClientesService,
    private tecnicosService: TecnicosService
  ) {
    this.rol = this.session.rolActual();
    this.cargarTickets();
  }

  cargarTickets() {

    const userId = this.session.idUsuarioActual()!;
    const rol = this.session.rolActual();

    if (rol === 'tecnico') {

      this.ticketsService.getByTecnico(userId)
        .subscribe(t => {
          this.tickets = t;

          t.forEach(ticket => {
            this.clientesService
              .getById(ticket.idCliente)
              .subscribe(c => {
                this.clientesMapa[ticket.idCliente] = `${c.nombre} ${c.apellido}`;
              });
          });
        });

    } else {

      this.ticketsService.getByCliente(userId)
        .subscribe(t => {
          this.tickets = t;

          t.forEach(ticket => {
            this.tecnicosService
              .getById(ticket.idTecnico)
              .subscribe(tc => {
                this.tecnicosMapa[ticket.idTecnico] = `${tc.nombre} ${tc.apellido}`;
              });
          });
        });

    }
  }

}
