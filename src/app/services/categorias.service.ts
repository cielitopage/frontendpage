import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';


const base_url = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class CategoriasService {


  constructor(
    private http: HttpClient,

  ) { }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarCaregorias(desde: number = 0) {
    const url = `${base_url}/categorias?desde=${desde}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          return {
            total: resp.total,
            categorias: resp.categorias,

          }
        }
        )
      );
  }


  crearCategoria(nombre: string) {
    const url = `${base_url}/categorias`;
    return this.http.post(url, { nombre }, this.headers);

  }

  actualizarCategoria(_id: any, nombre: string) {
    const url = `${base_url}/categorias/${_id}`;
    return this.http.put(url, { nombre }, this.headers);
  }
  
  actualizarEstadoCategoria(_id: any, estado: any, nombre: string) {
    const url = `${base_url}/categorias/${_id}`;
    return this.http.put(url, { estado, nombre }, this.headers);

  }


  borrarCategoria(_id: any) {
    const url = `${base_url}/categorias/${_id}`;
    return this.http.delete(url, this.headers);
  }



  buscarCategoria(termino: string) {
    const url = `${base_url}/buscar/${termino}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: any) => {
          return resp.categorias;
        })
      );

  }






}