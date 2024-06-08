import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Personaje } from './models/personaje.module';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { PaginaResponse } from './models/pagina-response.module';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  data: Personaje[] = [];
  pagina = 1;
  paginaMaxima = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getPagina();
  }

  getPagina() {
    const headers = new HttpHeaders();
    const url = `https://futuramaapi.com/api/characters?page=${this.pagina}`;
    this.http.get<PaginaResponse>(url, { headers }).subscribe(res => {
      this.data = res.items;
      this.pagina = res.page;
      this.paginaMaxima = res.pages;
    }, e => {
      alert('Error desconocido');
      console.log(e);
    });
  }

  anteriorPagina() {
    if (this.pagina !== 1) {
      this.pagina = this.pagina - 1;
      this.getPagina();
    } else {
      alert('Ya te encuentras en la primera página')
    }
  }

  siguientePagina() {
    if (this.pagina !== this.paginaMaxima) {
      this.pagina = this.pagina + 1;
      this.getPagina();
    } else {
      alert('Ya no hay más páginas que cargar')
    }
  }
}
