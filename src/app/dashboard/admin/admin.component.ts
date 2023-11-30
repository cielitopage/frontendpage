import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent   implements OnInit {

  public img = '';
  public usuario = '';

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
  
  ) { }

  ngOnInit(): void {

    this.usuarioService.validarToken().subscribe(resp => {
      console.log("resp", resp);
      
           
      });

      this.getuser();

  }


  getuser() {
    this.img=  this.usuarioService.usuarioActual?.imagenUrl;
        this.usuario=  this.usuarioService.usuarioActual?.nombre;   

    const token = localStorage.getItem('token') || '';   
    if (token.length !== 0) {   
      
      return true;    }
    return false
  }






}
