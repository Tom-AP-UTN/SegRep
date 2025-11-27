import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TicketsService } from '../../../../core/services/tickets.service';
import { ClientesService } from '../../../../core/services/clientes.service';
import { SessionService } from '../../../../core/services/session.service';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './new-ticket.html',
  styleUrls: ['./new-ticket.css']
})
export class NewTicket {

  clientes: any[] = [];

  constructor(
    private ticketsService: TicketsService,
    private clientesService: ClientesService,
    private session: SessionService,
    private router: Router
  ) {
    this.cargarClientes();
    this.setTecnicoActual();
  }

  // ------------------------------------------------------
  // Form del nuevo ticket
  // ------------------------------------------------------
  form = new FormGroup({
    titulo     : new FormControl('', [Validators.required]),
    descripcion: new FormControl('', [Validators.required, Validators.minLength(10)]),
    tipoMaquina: new FormControl('', [Validators.required]),
    idCliente  : new FormControl('', [Validators.required]),

    // ESTE CAMPO YA NO SE VE EN EL HTML: se completa solo
    idTecnico  : new FormControl('', [Validators.required])
  });

  get titulo     () { return this.form.get('titulo')!; }
  get descripcion() { return this.form.get('descripcion')!; }
  get tipoMaquina() { return this.form.get('tipoMaquina')!; }
  get idCliente  () { return this.form.get('idCliente')!; }
  get idTecnico  () { return this.form.get('idTecnico')!; }

  // ------------------------------------------------------
  // Cargar clientes
  // ------------------------------------------------------
  cargarClientes() {
    this.clientesService.getAll().subscribe(c => this.clientes = c);
  }

  // ------------------------------------------------------
  // Setear técnico actual automáticamente
  // ------------------------------------------------------
  setTecnicoActual() {
    const tecnicoActual = this.session.idUsuarioActual(); // Esto es un signal getter

    if (tecnicoActual) {
      this.idTecnico.setValue(tecnicoActual);
    }
  }

  // ------------------------------------------------------
  // Submit del form
  // ------------------------------------------------------
  onSubmit() {

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = {
      ...this.form.value,
      estado: 'pendiente',
      fechaCreacion: new Date().toISOString(),
      updates: []
    };

    this.ticketsService.create(data as any).subscribe(() => {
      // REDIRECT correcto
      this.router.navigate(['/app/tickets/list']);
    });
  }
}
