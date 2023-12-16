import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/usuario.service';
declare function customInitFunction(): any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {

 
    this.usuarioService.validarToken().subscribe(resp => {
      console.log("resp",resp); 
      
    } )
    
  }



  


}
