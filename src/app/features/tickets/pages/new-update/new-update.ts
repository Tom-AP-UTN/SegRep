import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TicketsService } from '../../../../core/services/tickets.service';

@Component({
  selector: 'app-new-update',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './new-update.html',
  styleUrls: ['./new-update.css']
})
export class NewUpdate {

  ticket: any = null;
  updateForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private ticketsService: TicketsService
  ) {
    // Crear el form DESPUÉS de inyectar fb
    this.updateForm = this.fb.group({
      detalleUpdate: ['', Validators.required],
      nuevoEstado: [''],       // opcional
      imagenUpdate: ['']       // base64 o URL
    });

    this.cargarTicket();
  }

  cargarTicket() {
  const id = this.route.snapshot.paramMap.get('id')!;

  this.ticketsService.getById(id).subscribe(t => {

    if (!t) return;

    //  Bloqueo: ticket finalizado = no se puede editar
    if (t.estado === 'finalizado') {
      this.router.navigate(['/app/tickets', t.id]);
      return;
    }

    this.ticket = t;
    this.updateForm.patchValue({
      nuevoEstado: '',
      detalleUpdate: '',
      imagenUpdate: ''
    });
  });
}


  async handleImageUpload(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const base64 = await this.toBase64(file);
    this.updateForm.patchValue({ imagenUpdate: base64 });
  }

  toBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  guardar() {
    if (!this.ticket) return;
    if (this.updateForm.invalid) {
      this.updateForm.markAllAsTouched();
      return;
    }

    const updates = this.ticket.updates || [];

    const nuevoUpdate = {
      nroUpdate: updates.length + 1,
      fechaUpdate: new Date().toISOString(),
      detalleUpdate: this.updateForm.value.detalleUpdate!,
      nuevoEstado: this.updateForm.value.nuevoEstado || null,
      imagenUpdate: this.updateForm.value.imagenUpdate || null
    };

    const ticketActualizado = {
      ...this.ticket,
      estado: nuevoUpdate.nuevoEstado || this.ticket.estado,
      updates: [...updates, nuevoUpdate]
    };

    this.ticketsService.update(ticketActualizado)
      .subscribe(() => {
        this.router.navigate(['/app/tickets', this.ticket.id]);
      });
  }

}
