import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public rol!: string;
  public usuario = this.usuarioService.usuarioActual.nombre;


  
 
  constructor(
    private usuarioService: UsuarioService,
    private router: Router,

  ) { }

  ngOnInit(): void {

  
  }

}
