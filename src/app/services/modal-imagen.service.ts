import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class ModalImagenService {

  imagenTemp: string = '';
  public _mostrarModal: boolean = true;

  public tipo!: 'usuarios' | 'productos' | 'categorias' | 'articulos';
  public id: string = '';
  public img: string = 'no-image';
  public img1: string = 'no-image';
  public nuevaImagen: EventEmitter <string> = new EventEmitter <string> ();

  constructor() { }

  get mostrarModal() {  
    return this._mostrarModal;
  }
  

  abrirModal(
    tipo: 'usuarios' | 'productos' | 'categorias' | 'articulos',
    id: string = '',
    img?: string
  ) {
    this._mostrarModal = false;
    this.tipo = tipo;
    this.id = id;

    if (img) {
      this.img = `${base_url}/upload/${tipo}/${img}`;
    } else {
      this.img = 'no-image';
    }

  }

  
  abrirModalImagen1(
    tipo: 'usuarios' | 'productos' | 'categorias' | 'articulos',
    id: string = '',
    img1?: string
  ) {
    this._mostrarModal = false;
    this.tipo = tipo;
    this.id = id;

    if (img1) {
      this.img1 = `${base_url}/upload/imagen1/${tipo}/${img1}`;
    } else {
      this.img1 = 'no-image';
    }

  }

  cerrarModal() {
    this._mostrarModal = true; 

  }

  

  imagenCargada(img: string) {
    this.nuevaImagen.emit(img);
  }

  imagenCargada1(img1: string) {
    this.nuevaImagen.emit(img1);
  }
  


}