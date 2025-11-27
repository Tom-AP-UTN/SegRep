import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sidebar } from '../../shared/components/sidebar/sidebar';

@Component({
  selector: 'app-private',
  imports: [RouterOutlet, Sidebar],
  templateUrl: './private.html',
  styleUrl: './private.css',
})
export class Private {

}
