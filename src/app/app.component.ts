import { Component, OnInit } from '@angular/core';

declare function customInitFunction(): any;
declare function initEasing(): any;
declare function initOwlCarousel(): any;
declare function customInitFunctionWay(): any;
declare function customInitFunctionWow(): any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements  OnInit {



  constructor() { }
 

  ngOnInit() {
  customInitFunction();
  initEasing();
  initOwlCarousel();
  customInitFunctionWay();
  customInitFunctionWow();

  }
}
