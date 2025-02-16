import { Component } from '@angular/core';
import { PokemonService } from '../pokemon.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { forkJoin, map } from 'rxjs';

@Component({
  selector: 'app-pokemon-show',
  templateUrl: './pokemon-show.component.html',
  styleUrls: ['./pokemon-show.component.css'],
  imports: [FormsModule, CommonModule]
})
export class PokemonShowComponent {


  pokemon: any = {
    name: '',
    types: [],
    sprite: '',
    evolutionChain: [],
    movimientos: []
  };

  inputName: string = '';

  constructor(private pokemonService: PokemonService) { }
  getPokemon(): void {

    this.pokemon = {
      name: '',
      types: [],
      sprite: '',
      evolutionChain: [],
      movimientos: []
    };
  
    this.pokemonService.getPokemon(this.inputName).subscribe(
      (data: any) => {
        this.pokemon.name = data.name;
        data.types.map((typeInfo: any) => {
          const type ={
            name: typeInfo.type.name,
            color: this.getColor(typeInfo.type.name)
          }
          this.pokemon.types.push(type);
        });
        this.pokemon.sprite = data.sprites.other['official-artwork'].front_default;
  
        const moveObservables = data.moves.map((moveInfo: any) => {
          return this.pokemonService.getMove(moveInfo.move.url).pipe(
            map((moveData: any) => ({
              name: moveInfo.move.name,
              type: moveData.type.name,
              color: this.getColor(moveData.type.name)
            }))
          );
        });
  
        forkJoin<any[]>(moveObservables).subscribe((moves: any[]) => {
          this.pokemon.movimientos = moves;
        });
  
        // Obtener la línea evolutiva
        this.pokemonService.getPokemonSpecies(data.species.url).subscribe((speciesData: any) => {
          this.pokemonService.getEvolutionChain(speciesData.evolution_chain.url).subscribe((evolutionData: any) => {
            this.pokemon.evolutionChain = this.extractEvolutionNames(evolutionData.chain);
          });
        });
      },
      (error: any) => {
        alert('El Pokémon no existe');
      }
    );
  
    console.log(this.pokemon);
  }

  extractEvolutionNames(chain: any): any[] {
    let evolutionNames: any[] = [];
    let currentChain = chain;

    while (currentChain) {
      const poke = {
        name: currentChain.species.name,
        sprite: ''
      };

      this.pokemonService.getPokemon(currentChain.species.name).subscribe((data: any) => {
        poke.sprite = data.sprites.other['official-artwork'].front_default;
      });

      evolutionNames.push(poke);
      currentChain = currentChain.evolves_to[0];
    }

    return evolutionNames;
  }

  getColor(type: string): string {
    switch (type) {
      case 'normal':
        return '#A8A77A';
      case 'fire':
        return '#EE8130';
      case 'water':
        return '#6390F0';
      case 'electric':
        return '#F7D02C';
      case 'grass':
        return '#7AC74C';
      case 'ice':
        return '#96D9D6';
      case 'fighting':
        return '#C22E28';
      case 'poison':
        return '#A33EA1';
      case 'ground':
        return '#E2BF65';
      case 'flying':
        return '#A98FF3';
      case 'psychic':
        return '#F95587';
      case 'bug':
        return '#A6B91A';
      case 'rock':
        return '#B6A136';
      case 'ghost':
        return '#735797';
      case 'dragon':
        return '#6F35FC';
      case 'dark':
        return '#705746';
      case 'steel':
        return '#B7B7CE';
      case 'fairy':
        return '#D685AD';
      default:
        return '#000000';
    }
  }
}