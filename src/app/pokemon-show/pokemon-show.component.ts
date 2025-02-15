import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pokemon-show',
  templateUrl: './pokemon-show.component.html',
  styleUrls: ['./pokemon-show.component.css'],
  imports: [FormsModule]
})
export class PokemonShowComponent {

  pokemon: any = {
    name: '',
    types: []
  };

  inputName: string = '';

  constructor(private pokemonService: PokemonService) { }

  getPokemon(): void {
    this.pokemonService.getPokemon(this.inputName).subscribe((data: any) => {
      this.pokemon.name = data.name;
      this.pokemon.types = data.types.map((typeInfo: any) => typeInfo.type.name);

      console.log('Nombre:', this.pokemon.name);
      console.log('Tipos:', this.pokemon.types.join(', '));
    });
  }
}