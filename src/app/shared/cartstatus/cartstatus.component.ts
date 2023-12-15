import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartserviceService } from 'src/app/services/cartservice.service';


@Component({
  selector: 'app-cartstatus',
  templateUrl: './cartstatus.component.html',
  styleUrls: ['./cartstatus.component.css'],

})
export class CartstatusComponent implements OnInit {
  public totalPrice : number = 0.00;
  public totalQuantity : number = 0;


  constructor(
    private router: Router,
    private cartService: CartserviceService
  
  ) { 
    this.updateCartStatus();
  }

  ngOnInit() {
    
    
  }


  updateCartStatus() {
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data


    );

    

  

  }



}
