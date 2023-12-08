import { Categoria } from "./categoria.models";

interface _ProductoUsuario {
    _id: string;
    nombre: string;
    img: string;

}
  

export class Producto {
    constructor(
        public   nombre: string,
        public   descripcion?: string,
        public   img?: string,
        public   img1?: string,
        public  _id?: string,
        public   usuario?: _ProductoUsuario,
        public   categoria?: Categoria,
        public   precio?: number,
        public   disponible?: boolean,
        public   linkdepago?: string,
        public   estado?: boolean,
        public   oferta?:  number,
        public   tags?: string[],
        public   talla?:  number,

    ) { }

}