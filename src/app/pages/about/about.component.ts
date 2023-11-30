import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
 
})
export class AboutComponent implements OnInit {



  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {

 
    this.usuarioService.validarToken().subscribe(resp => {
      console.log("resp",resp);     
      
    } )
}


}
