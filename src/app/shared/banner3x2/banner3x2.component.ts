import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-banner3x2',
  templateUrl: './banner3x2.component.html',
  styleUrls: ['./banner3x2.component.css']
})
export class Banner3x2Component implements OnInit {

  banner3x2: boolean = false;

  banner3x2big :boolean = false;

  constructor() { }



  ngOnInit(): void {
    setTimeout(() => {
      this.banner3x2 = true;
    }, 3000);

    setTimeout(() => {
      this.banner3x2big = true;
    }, 1000);
  
  
  
  }



  //retrasar el banner 3x2 2 segundos










}
