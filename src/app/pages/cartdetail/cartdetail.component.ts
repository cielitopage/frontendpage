import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cartitems } from 'src/app/models/cartitems';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-cartdetail',
  templateUrl: './cartdetail.component.html',
  styleUrls: ['./cartdetail.component.css']
})
export class CartdetailComponent implements   OnInit {
  public usuario = this.usuarioService.usuarioActual.nombre;
  public cargando: boolean = true;
  public cartItems: Cartitems[] = [];
  public total: number = 0;
  public cantidad: number = 0;
  public oferta: number = 0;
  public descuento!: number ;
  public totalPagar!: number ;
  public ofertaAplicada!: number ;
  public subtotal!: number ;


  constructor(
    private usuarioService: UsuarioService, 
    private cartService: CartserviceService ,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.listCartDetail();
  }
  // producto.precio * producto.cantidad * producto.oferta / 100 

  listCartDetail() {  
    this.cartItems = this.cartService.cartItems;
    this.cartService.totalPrice.subscribe(data => this.total = data);
    this.cartService.totalQuantity.subscribe(data => this.cantidad = data);
    this.cartService.oferta.subscribe(data => this.oferta = data);
    this.cartService.computeCartTotals();
    this.descuento = this.cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad * item.oferta / 100), 0);
    this.ofertaAplicada = this.cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad * item.oferta / 100), 0);
    this.subtotal = this.total - this.descuento;
    this.totalPagar = this.total - this.descuento;   
    this.cargando = false;
  }

  actualizarCantidad(cartItem: Cartitems) {
    this.cartService.updateQuantity(cartItem);
    this.listCartDetail();
  }

  quitarDelCarrito(producto: Cartitems) {
    this.cartService.remove(producto);
    this.listCartDetail();
  }

  vaciarCarrito() {
    this.cartService.removeAll();
    this.listCartDetail();
  }

  realizarPedido() {
    this.router.navigate(['/checkout']);
  }



}
