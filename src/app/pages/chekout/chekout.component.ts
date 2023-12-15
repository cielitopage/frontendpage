import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cartitems } from 'src/app/models/cartitems';
import { CartserviceService } from 'src/app/services/cartservice.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-chekout',
  templateUrl: './chekout.component.html',
  styleUrls: ['./chekout.component.css']
})
export class ChekoutComponent  implements OnInit {

  public usuarioActual = this.usuarioService.usuarioActual;
  public checkoutFormGroup: FormGroup 
  public totalPrice: number = 0;
  public totalQuantity: number = 0;
  public discount: number = 0;

  public cartItems: Cartitems[] = [];
  public total: number = 0;
  public cantidad: number = 0;
  public oferta: number = 0;
  public descuento!: number ;
  public totalPagar!: number ;
  public ofertaAplicada!: number ;
  public subtotal!: number ;
  public order : any[]  = [];
  
  constructor(
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,
    private cartService: CartserviceService ,
    ) { }

  ngOnInit(): void {

    this.listCartDetail();

    this.usuarioService.validarToken().subscribe(resp => {      
      this.usuarioService.usuarioActual = this.usuarioActual;
      console.log("this.usuarioActual",this.usuarioActual);    
    })
    
    this.checkoutFormGroup = this.formBuilder.group({
       cliente: this.formBuilder.group({
        nombre: this.usuarioActual.nombre,
        tel: this.usuarioActual.telefono,
        email: this.usuarioActual.email,
      }),
      shippingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2)]),
        city: new FormControl('', [Validators.required, Validators.minLength(2)]),
        state: new FormControl('', [Validators.required, Validators.minLength(2)]),
        country: new FormControl('', [Validators.required, Validators.minLength(2)]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2)])
      }),
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [Validators.required, Validators.minLength(2)]),
        city: new FormControl('', [Validators.required, Validators.minLength(2)]),
        state: new FormControl('', [Validators.required, Validators.minLength(2)]),
        country: new FormControl('', [Validators.required, Validators.minLength(2)]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2)])
      })
    });
  }



  listCartDetail() {  
    this.cartItems = this.cartService.cartItems;
    console.log("this.cartItems",this.cartItems);
    this.cartService.totalPrice.subscribe(data => this.total = data);
    this.cartService.totalQuantity.subscribe(data => this.cantidad = data);
    this.cartService.oferta.subscribe(data => this.oferta = data);
    this.cartService.computeCartTotals();
    this.descuento = this.cartItems.reduce((acc, item) => acc + (item.precio * item.cantidad * item.oferta / 100), 0);  
    this.subtotal = this.total - this.descuento;
    this.totalPagar = this.total - this.descuento;   
    this.crearOrder();   
   
  }

  crearOrder (){

    this.order.push({
      cantidad : this.cantidad,
      total : this.totalPagar ,


  })
  console.log("this.order",this.order);
  }


  get  street() { return this.checkoutFormGroup.get('shippingAddress.street'); }
  get  city() { return this.checkoutFormGroup.get('shippingAddress.city'); }
  get  state() { return this.checkoutFormGroup.get('shippingAddress.state'); }
  get  country() { return this.checkoutFormGroup.get('shippingAddress.country'); }
  get  zipCode() { return this.checkoutFormGroup.get('shippingAddress.zipCode'); }

  get  billingStreet() { return this.checkoutFormGroup.get('billingAddress.street'); }
  get  billingCity() { return this.checkoutFormGroup.get('billingAddress.city'); }
  get  billingState() { return this.checkoutFormGroup.get('billingAddress.state'); }
  get  billingCountry() { return this.checkoutFormGroup.get('billingAddress.country'); }
  get  billingZipCode() { return this.checkoutFormGroup.get('billingAddress.zipCode'); }



  copyShippingAddressToBillingAddress(event: any) {
    console.log(event.target.checked);
    if (event.target.checked) {
      this.checkoutFormGroup.controls['billingAddress']
            .setValue(this.checkoutFormGroup.controls['shippingAddress'].value);
    }
    else {
      this.checkoutFormGroup.controls['billingAddress'].reset();
    }    
  }



  onSubmit() {
    console.log("Handling the submit button");
    console.log(this.checkoutFormGroup.get('cliente')!.value);
    console.log(this.checkoutFormGroup.get('shippingAddress')!.value);
    console.log(this.checkoutFormGroup.get('billingAddress')!.value);

    console.log("this.cartItems",this.cartItems);

   

    this.cartService.createOrderDetail(this.checkoutFormGroup.controls['cliente'].value,
                                      this.checkoutFormGroup.controls['shippingAddress'].value,
                                      this.checkoutFormGroup.controls['billingAddress'].value,
                                      this.order,
                                      this.cartItems)
    .subscribe(
      {
        next: response => {
         Swal.fire({
          title: 'Pedido realizado con exito!',
          text: 'Gracias por su compra',
          icon: 'success',
          confirmButtonText: 'OK'
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
            this.cartService.removeAll();
          }
        })
        }
      }
    );


    this.checkoutFormGroup.reset();
  }
}
