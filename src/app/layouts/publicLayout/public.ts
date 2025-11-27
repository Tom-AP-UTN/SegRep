import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-public-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './public.html',
  styleUrl: './public.css',
})

export class PublicLayout {

}
