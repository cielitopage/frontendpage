import { Injectable } from '@angular/core';
import { Cartitems } from '../models/cartitems';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const base_url = environment.baseUrl

@Injectable({
  providedIn: 'root'
})
export class CartserviceService {

  public cartItems: Cartitems[] = [];
  public totalPrice: Subject<number> = new Subject<number>();
  public totalQuantity: Subject<number> = new Subject<number>();
  public oferta: Subject<number> = new Subject<number>();
  public descuento!: number;

  //   storage: Storage = sessionStorage;

  storage: Storage = localStorage;

  constructor(
    private http: HttpClient,
  ) {
    let data = JSON.parse(this.storage.getItem('cartItems')!);
    if (data != null) {
      this.cartItems = data;
      this.computeCartTotals();
    }
  }

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

  addToCart(cartItem: Cartitems) {
    let alreadyExistsInCart: boolean = false;
    let existingCartItem: Cartitems | undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(tempCartItem => tempCartItem._id === cartItem._id);
      alreadyExistsInCart = (existingCartItem != undefined);
    }

    if (alreadyExistsInCart) {
      existingCartItem!.cantidad++;

    }
    else {
      this.cartItems.push(cartItem);
    }
    this.computeCartTotals();
  }


  computeCartTotals() {
    let totalPriceValue: number = 0;
    let totalQuantityValue: number = 0;
    let oferta: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPriceValue += currentCartItem.cantidad * currentCartItem.precio;
      totalQuantityValue += currentCartItem.cantidad;
      oferta = currentCartItem.oferta;

    }

    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);
    this.oferta.next(oferta);
    this.descuento = this.cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad * item.oferta / 100), 0);
    this.logCartData(totalPriceValue, totalQuantityValue, oferta, this.descuento);
    this.persistCartItems();
  }

  persistCartItems() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }


  logCartData(totalPriceValue: number, totalQuantityValue: number, oferta: number, descuento: number) {
    console.log('Contenido del carrito');
    for (let tempCartItem of this.cartItems) {
      const subTotalPrice = tempCartItem.cantidad * tempCartItem.precio;
      console.log(`nombre: ${tempCartItem.nombre}, cantidad: ${tempCartItem.cantidad}, precio: ${tempCartItem.precio}, subtotal: ${subTotalPrice}`);
    }
    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}, oferta: ${oferta}, descuento: ${descuento}`);
    console.log('----');
  }




  decrementQuantity(cartItem: Cartitems) {
    cartItem.cantidad--;
    if (cartItem.cantidad === 0) {
      this.remove(cartItem);
    }
    else {
      this.computeCartTotals();
    }
  }

  remove(cartItem: Cartitems) {
    const itemIndex = this.cartItems.findIndex(tempCartItem => tempCartItem._id === cartItem._id);

    if (itemIndex > -1) {
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
  }


  updateQuantity(cartItem: Cartitems) {

    cartItem.cantidad = cartItem.cantidad;
    this.computeCartTotals();

  }

  removeAll() {
    this.cartItems = [];
    this.computeCartTotals();
  }


 

  createOrder(order: any) {
    console.log("Compra realizada", order);
    this.removeAll();
  }

  createOrderDetail(cliente: any, shippingAddress: any, billingAddress: any, order: any,orderItems: any) {
    const url = `${base_url}/carrito`;

    return this.http.post(url, { cliente, shippingAddress, billingAddress, order,orderItems}, this.headers);


  }





}
