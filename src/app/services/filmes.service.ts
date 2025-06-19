import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient) { }

  private apiURL = 'http://localhost:8080/api/movies';

  getFilmesPopular(): Observable<any[]>{
    return this.http.get<any[]>(`${this.apiURL}/popular`);
  }
  
  buscarFilmes(query: string): Observable<any[]>{
    return this.http.get<any>(`${this.apiURL}/search?query=${query}`);
  }

}
