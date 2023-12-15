import { Producto } from "./product.models"



export class Cartitems {
   
    public nombre: string;  
    public _id: string;
    public img: string;
    public precio: number;
    public cantidad: number ;
    public oferta: number;
  

    constructor( product :Producto) {
        this.nombre = product.nombre;
        this._id = product._id;        
        this.img = product.img;
        this.precio = product.precio;
        this.cantidad = product.cantidad || 1;
        this.oferta = product.oferta;


    }



}
