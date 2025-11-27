import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsService } from '../../../../core/services/tickets.service';
import { ClientesService } from '../../../../core/services/clientes.service';
import { TecnicosService } from '../../../../core/services/tecnicos.service';
import { SessionService } from '../../../../core/services/session.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tickets-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class Dashboard {

  ticket: any = null;
  update: any = null;
  otroUsuario: any = null;  // cliente si es técnico, técnico si es cliente

  rol: string | null = null;

  constructor(
    private ticketsService: TicketsService,
    private clientesService: ClientesService,
    private tecnicosService: TecnicosService,
    private session: SessionService
  ) {
    this.rol = this.session.rolActual();
    this.cargarDashboard();
  }

  cargarDashboard() {
    this.ticketsService.getAll().subscribe(tickets => {
      if (!tickets || tickets.length === 0) return;

      // ORDENAMOS por fechaCreacion DESC y tomamos el último
      const ultimo = [...tickets].sort((a, b) =>
        new Date(b.fechaCreacion).getTime() - new Date(a.fechaCreacion).getTime()
      )[0];

      this.ticket = ultimo;

      // Como por ahora no estamos usando "último update", tomamos updates[0] si existe
      this.update = ultimo.updates?.length > 0 ? ultimo.updates[0] : null;

      // Cargar al otro usuario:
      if (this.rol === 'tecnico') {
        // cargar cliente
        this.clientesService.getById(ultimo.idCliente).subscribe(c => this.otroUsuario = c);
      } else {
        // cargar técnico
        this.tecnicosService.getById(ultimo.idTecnico).subscribe(t => this.otroUsuario = t);
      }
    });
  }

}
