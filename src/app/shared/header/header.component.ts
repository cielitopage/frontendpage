import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { GlobalService } from 'src/app/global.service';
import { CartserviceService } from 'src/app/services/cartservice.service';

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

  public img = '';
  public usuario = '';
  public logeado = true;



  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private cartService: CartserviceService,
  
  ) {      
  }

  ngOnInit() {       

    this.getuser();     
    customInitFunction();
    initEasing();
    initOwlCarousel();
    customInitFunctionWay();
    customInitFunctionWow();  

    
  this.usuarioService.validarToken().subscribe(resp => {
    console.log("resp",resp);     
   this.usuarioService.usuarioActual;
  } )
 
  
  }



  isMenuCollapsed = true;


  logout() {
    this.usuarioService.logout();
    this.cartService.removeAll();
    localStorage.removeItem('cartItems');
    this.router.navigateByUrl('/login');
  }



  getuser() {
    this.img=  this.usuarioService.usuarioActual?.imagenUrl;
    this.usuario=  this.usuarioService.usuarioActual?.nombre;      
    const token = localStorage.getItem('token') || '';  
  
    if (token.length !== 0 && this.usuarioService.usuarioActual?.emailVerified === true) {
      this.logeado = false;
          return true; 
           }
    return false
  }


  admin() {
    const token = localStorage.getItem('token') || ''; 
    
    if (token.length !== 0 &&this.usuarioService.usuarioActual?.rol === 'SUPER_ADMIN_ROLE') {
      return true;
    }
    return false;
  }

  emailVerified() {
    if (this.usuarioService.usuarioActual?.emailVerified === true) {
      return true;
    }
    return false;
  }

  









  



  
}











