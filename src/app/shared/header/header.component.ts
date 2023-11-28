import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';


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
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService
  ) {
    
  }




  ngOnInit(): void {
   
    this.getuser();
    customInitFunction();
    initEasing();
    initOwlCarousel();
    customInitFunctionWay();
    customInitFunctionWow();

  }


  isMenuCollapsed = true;


  logout() {
   this.usuarioService.logout();
    this.router.navigateByUrl('/login');
  }

  getuser() {
    const token = localStorage.getItem('token') || '';

    if (token.length !== 0) {
      


    
      return true;
    } 
    return false
  }

















}