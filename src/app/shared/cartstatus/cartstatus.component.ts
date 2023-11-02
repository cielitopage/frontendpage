import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-cartstatus',
  templateUrl: './cartstatus.component.html',
  styleUrls: ['./cartstatus.component.css'],

})
export class CartstatusComponent implements OnInit {
  public totalPrice : number = 180.76;
  public totalQuantity : number = 2;

  constructor() { }

  ngOnInit(): void {
  }

}
