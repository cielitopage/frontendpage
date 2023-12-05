import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/usuario.model';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class BusquedaService {

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

  buscar(termino: string) {
    const url = `${base_url}/buscar/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          const usuarios = resp.usuarios.map(
            (user: { nombre: string; email: string;  rol: string; img: string;telefono: string;fechanac: string;estado: boolean; google: boolean; uid: string;emailVerified: boolean; })   => new UsuarioModel(user.nombre, user.email, user.rol, user.img, user.telefono,user.fechanac,user.estado, user.google, user.uid,user.emailVerified)
          );
          return {
            total: resp.total,
            usuarios
          }
        }));
  }


  buscarGlobal(termino: string) {
    const url = `${base_url}/buscar/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          return resp;
        }));
  }


  searchBlog(termino: string) {
    const url = `${base_url}/buscar/search/${termino}`;
    return this.http.get<any[]>(url, this.headers)
      .pipe(
        map((resp: any) => {
          return resp;
        }));
  }



}