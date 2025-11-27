import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from "./shared/components/sidebar/sidebar";

@Component({

  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, Sidebar],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})

export class AppComponent {
  protected readonly title = signal('SegRep');
}
