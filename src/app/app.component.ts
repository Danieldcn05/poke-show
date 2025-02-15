import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PokemonShowComponent } from './pokemon-show/pokemon-show.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, PokemonShowComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'poke-show';
}
