import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClientesService } from '../../../../core/services/clientes.service';
import { TecnicosService } from '../../../../core/services/tecnicos.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
})
export class Register {

  constructor(
    private clientesService: ClientesService,
    private tecnicosService: TecnicosService,
    private router: Router
  ) {}

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),

    celular: new FormControl('', [Validators.required]),
    direccion: new FormControl('', [Validators.required]),

    nombre: new FormControl('', [Validators.required]),
    apellido: new FormControl('', [Validators.required]),

    rol: new FormControl<'cliente' | 'tecnico'>('cliente', [Validators.required]),

    // Campos opcionales de técnico
    nombreComercial: new FormControl(''),
    facebook: new FormControl(''),
    instagram: new FormControl(''),
    tiktok: new FormControl('')
  });

  submit() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const data = this.form.value;

    if (data!.rol === 'cliente') {

      this.clientesService.create({
        id: crypto.randomUUID(),
        email: data!.email!,
        password: data!.password!,
        celular: data!.celular!,
        direccion: data!.direccion!,
        rol: 'cliente',
        nombre: data!.nombre!,
        apellido: data!.apellido!
      }).subscribe(() => {
        this.router.navigate(['/public/login']);
      });

    } else {

      this.tecnicosService.create({
        id: crypto.randomUUID(),
        email: data!.email!,
        password: data!.password!,
        celular: data!.celular!,
        direccion: data!.direccion!,
        rol: 'tecnico',
        nombre: data!.nombre!,
        apellido: data!.apellido!,
        nombreComercial: data!.nombreComercial || '',
        facebook: data!.facebook || '',
        instagram: data!.instagram || '',
        tiktok: data!.tiktok || ''
      }).subscribe(() => {
        this.router.navigate(['/auth/login']);
      });
    }
  }
}
