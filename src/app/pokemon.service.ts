import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemon(name: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${name}`);
  }

  getPokemonSpecies(url: string): Observable<any> {
    return this.http.get(url);
  }

  getEvolutionChain(url: string): Observable<any> {
    return this.http.get(url);
  }

  getMove(url: string): Observable<any> {
    return this.http.get(url);
  }
}