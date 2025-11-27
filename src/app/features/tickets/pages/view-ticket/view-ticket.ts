import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TicketsService } from '../../../../core/services/tickets.service';
import { ClientesService } from '../../../../core/services/clientes.service';
import { TecnicosService } from '../../../../core/services/tecnicos.service';
import { SessionService } from '../../../../core/services/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-ticket',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './view-ticket.html'
})
export class ViewTicket {

  ticket: any = null;
  updates: any[] = [];
  otroUsuario: any = null;
  rol: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private ticketsService: TicketsService,
    private clientesService: ClientesService,
    private tecnicosService: TecnicosService,
    private session: SessionService
  ) {
    this.rol = this.session.rolActual();
    this.cargarTicket();
  }

  cargarTicket() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.ticketsService.getById(id).subscribe(t => {
      if (!t) return;

      const userId = this.session.idUsuarioActual();
      const rol = this.session.rolActual();

      // ------ PROTECCIÓN de acceso ------
      if (
        (rol === 'tecnico' && t.idTecnico !== userId) ||
        (rol === 'cliente' && t.idCliente !== userId)
      ) {
        this.router.navigate(['/app/tickets/list']);
        return;
      }

      this.ticket = t;
      this.updates = [...this.ticket.updates].sort(
        (a, b) => b.fechaUpdate.localeCompare(a.fechaUpdate)
      );


      this.cargarOtroUsuario();
    });
  }

  // ---------------------------------------------
  // Cargar CLIENTE si soy técnico
  // Cargar TÉCNICO si soy cliente
  // ---------------------------------------------
  cargarOtroUsuario() {

    if (!this.ticket) return;

    if (this.rol === 'tecnico') {
      this.clientesService.getById(this.ticket.idCliente)
        .subscribe(c => this.otroUsuario = c);

    } else {
      this.tecnicosService.getById(this.ticket.idTecnico)
        .subscribe(t => this.otroUsuario = t);
    }
  }

}
