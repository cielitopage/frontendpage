import { Categoria } from "./categoria.models";

interface _ProductoUsuario {
    _id: string;
    nombre: string;
    img: string;

}
  

export class Producto {
    constructor(
        public  _id: string,
        public   nombre: string,
        public   img: string,
        public   precio: number,
        public   cantidad:  number,
        public   oferta:  number,
        public   descripcion?: string,      
        public   img1?: string,     
        public   usuario?: _ProductoUsuario,
        public   categoria?: Categoria,      
        public   disponible?: boolean,
        public   linkdepago?: string,
        public   estado?: boolean,     
        public   tags?: string[],
        public   talla?:  number,
     

    ) { }

}