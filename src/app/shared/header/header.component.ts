import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

declare function customInitFunction(): any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute  
    
  ) { }
  ngOnInit(): void {
    customInitFunction();
   
  }


  isMenuCollapsed = true;

 


  // logout(): void {

  //   this.router.navigate(['/login']);


}
