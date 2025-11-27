import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TicketsService } from '../../../../core/services/tickets.service';
import { SessionService } from '../../../../core/services/session.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './edit-ticket.html'
})
export class EditTicket {

  ticket: any = null;

  form = new FormGroup({
    titulo: new FormControl('', Validators.required),
    descripcion: new FormControl('', Validators.required),
    tipoMaquina: new FormControl('', Validators.required),
    estado: new FormControl('pendiente'),
    idCliente: new FormControl('', Validators.required),
    idTecnico: new FormControl('', Validators.required),
  });

  constructor(
    private route: ActivatedRoute,
    private ticketsService: TicketsService,
    private session: SessionService,
    private router: Router
  ) {
    this.cargarTicket();
  }

  cargarTicket() {
    const id = this.route.snapshot.paramMap.get('id')!;

    this.ticketsService.getById(id).subscribe(t => {
      if (t) {
        this.ticket = t;
        this.form.patchValue(t);
      }
    });
  }

  guardar() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const actualizado = {
      ...this.ticket,
      ...this.form.value
    };

    this.ticketsService.update(actualizado).subscribe(() => {
      this.router.navigate(['/app/tickets', this.ticket.id]);
    });
  }
}
