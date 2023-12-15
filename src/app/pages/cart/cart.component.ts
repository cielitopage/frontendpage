import { Component, OnInit,Input } from '@angular/core';
import { Router } from '@angular/router';
import { Cartitems } from 'src/app/models/cartitems';
import { Producto } from 'src/app/models/product.models';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements   OnInit {

  // recibimos el producto desde el componente padre

  public usuario = this.usuarioService.usuarioActual.nombre;
  public usuarioActual = this.usuarioService.usuarioActual;
  public desde: number = 0;
  public totalProductos: number = 0;
  public cargando: boolean = true;
  public productos: Producto[] = [];
  public hasta : number = 0;
  public totalRegistros: number = 0;
  public ok: boolean = false;
  public total: number = 0;
  public estado: boolean  | undefined;
  public categorias: any;
  public categoria: any;

  @Input() producto: any ;



  constructor(
    private cartService: CartserviceService,
    private usuarioService: UsuarioService, 
    private categoriasService:CategoriasService,
    private router: Router,
  ) { }



  ngOnInit(): void {
   
  }



  
  agregarAlCarrito(producto: Producto) {
    console.log(producto);

    Swal.fire({
      title: '¿Estas seguro?',
      text: `¿Seguro que deseas agregar al carrito el producto ${producto.nombre}?`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {

      if (resp.value) {

        const cartItem = new Cartitems(producto);
    
    this.cartService.addToCart(cartItem);
        Swal.fire({
          title: 'Producto agregado',
          text: `El producto ${producto.nombre} se ha agregado al carrito correctamente`,
          icon: 'success'
        })

      }

    });
    }



    quitarDelCarrito(producto: Producto) {
      console.log(producto);
  
      Swal.fire({
        title: '¿Estas seguro?',
        text: `¿Seguro que deseas eliminar del carrito el producto ${producto.nombre}?`,
        icon: 'question',
        showConfirmButton: true,
        showCancelButton: true
      }).then(resp => {
  
        if (resp.value) {
  
          const cartItem = new Cartitems(producto);
      
      this.cartService.remove(cartItem);
          Swal.fire({
            title: 'Producto eliminado',
            text: `El producto ${producto.nombre} se ha eliminado del carrito correctamente`,
            icon: 'success'
          })
  
        }
  
      });
      }
  

}
