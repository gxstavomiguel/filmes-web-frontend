import { Component, OnInit } from '@angular/core';
import { FilmesService } from '../services/filmes.service';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  constructor(private filmesService: FilmesService) {}

  filmes: any[] = [];
  searchControl = new FormControl('');
  selectedFilme: any = null;

  ngOnInit(): void {
    this.filmesService.getFilmesPopular().subscribe((dados) => {
      this.filmes = dados;
    });

    this.searchControl.valueChanges
      .pipe(debounceTime(500), 
      distinctUntilChanged())
      .subscribe((query: string | null) => {
        if (!query || query.trim().length === 0) {
          this.filmesService.getFilmesPopular().subscribe((dados) => {
            this.filmes = dados;
          });
        } else {
          this.filmesService.buscarFilmes(query).subscribe((resultados) => {
            this.filmes = resultados;
          });
        }
      });
  }

  carregarImagem(path: string): string {
    return `https://image.tmdb.org/t/p/w500${path}`;
  }

  abrirModal(filme: any) {
  this.selectedFilme = filme;
}

fecharModal() {
  this.selectedFilme = null;
}

}
