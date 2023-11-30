import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from './services/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService
  ) { }

  getuser(img: string) {
    this.usuarioService.validarToken().subscribe(resp => {
      console.log("resp", resp);
      this.usuarioService.usuarioActual?.imagenUrl;
      console.log("img", this.usuarioService.usuarioActual);

    })
  }

  




}
