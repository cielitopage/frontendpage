import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';


declare function customInitFunction(): any;
declare function initEasing(): any;
declare function initOwlCarousel(): any;
declare function customInitFunctionWay(): any;
declare function customInitFunctionWow(): any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute  ,
   
    
  ) { }
  ngOnInit(): void {
    customInitFunction();
    initEasing();
    initOwlCarousel();
    customInitFunctionWay();
    customInitFunctionWow();
   
  }


  isMenuCollapsed = true;

 


  // logout(): void {

  //   this.router.navigate(['/login']);


}
