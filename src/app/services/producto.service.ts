import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Producto } from '../models/product.models';


const base_url = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class ProductoService {


  constructor(
    private http: HttpClient,
    private router: Router,
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


  cargarPrductos(desde: number = 0) {
    const url = `${base_url}/productos?desde=${desde}`;

    return this.http.get(url, this.headers)
      .pipe(
        map((resp: any) => {
          return {
            productos: resp,
            ok: true,
            total: resp.total
          }
        }
        )
      );
  }

  cargarPrductosPorId(id: string) {
    const url = `${base_url}/productos/${id}`;

    return this.http.get(url, this.headers)

      .pipe(
        map((resp: any) => {
         return {
            productos: resp,
            ok: true
          }
        }
        )
      );
  }

  cargarPrductosPorCategoria(id: any) {

    const url = `${base_url}/productos/categoria/${id}`;

    return this.http.get(url, this.headers)

      .pipe(
        map((resp: any) => {
          return {
            productos: resp,
            ok: true
          }
        }
        )
      );
  }



  crearProducto(producto: { nombre: string, precio: number, linkdepago: string, categoria: string, descripcion: string, talla: number, oferta: number, tags: string }) {
    const url = `${base_url}/productos`;
    return this.http.post(url, {
      nombre: producto.nombre,
      precio: producto.precio,
      linkdepago: producto.linkdepago,
      categoria: producto.categoria,
      descripcion: producto.descripcion,
      talla: producto.talla,
      oferta: producto.oferta,
      tags: producto.tags
    }, this.headers);

  }

  editarProducto(  id: string, producto: Producto) { 
    const url = `${base_url}/productos/${id}`;
    return this.http.put(url, producto, this.headers);
  }

  borrarProducto(_id: any) {
    const url = `${base_url}/productos/${_id}`;
    return this.http.delete(url, this.headers);
  }


  buscarProducto(termino: string) {
    const url = `${base_url}/buscar/${termino}`;
    return this.http.get(url, this.headers)
      .pipe(
        map((resp: any) => {
          return resp.productos;
        })
      );
  }


  actualizarLink(linkdepago: string, producto: Producto) {
    producto.linkdepago = linkdepago;
    return this.http.put(`${base_url}/productos/link/${producto._id}`, producto, this.headers);
  }

  eliminarLink(linkdepago: string, producto: Producto) {
    producto.linkdepago = linkdepago;
    return this.http.put(`${base_url}/productos/link/${producto._id}`, producto, this.headers);
  }

  cambiarEstado(estado: any,producto: Producto) {


    producto.estado = estado;
    return this.http.put(`${base_url}/productos/estado/${producto._id}`, producto, this.headers);
  }


  actualizarEstadoCategoria(_id: any, estado: any, nombre: string) {
    const url = `${base_url}/categorias/${_id}`;
    return this.http.put(url, { estado, nombre }, this.headers);

  }









}