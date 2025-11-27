import { Component, computed } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SessionService } from '../../../core/services/session.service';
import { computeMsgId } from '@angular/compiler';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})

export class Sidebar {

    constructor(private session: SessionService) {}

    rol = computed(() => this.session.getUsuarioActivo()?.rol);
}
