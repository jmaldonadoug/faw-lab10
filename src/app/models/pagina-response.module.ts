import { Personaje } from "./personaje.module";

export interface PaginaResponse { 
  items: Personaje[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
