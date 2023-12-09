import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent  implements OnInit {

  public year: number = new Date().getFullYear();
  public productos: any[] = [];
  @ViewChild('googleButton') googleButton!: ElementRef;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
    private productoService: ProductoService,
  ) { }

  ngOnInit(): void {
    this.cargarProductos();
  }

  
  ngAfterViewInit(): void {
    this.googleInit();
  }


  googleInit() {
    google.accounts.id.initialize({
      client_id: "421085974774-n7vb932cu4h3oujad7c7ns3fa7rqaef3.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      this.googleButton.nativeElement,
      {
        theme: "dark",      
        size: "large",
        shape: "circle",
        width: "auto",
        text: "continue_with",  
        locale: "es",
        onsite_sitegap_client_id: "421085974774-n7vb932cu4h3oujad7c7ns3fa7rqaef3.apps.googleusercontent.com",     
        onsuccess: this.handleCredentialResponse,
        onfailure: this.handleCredentialResponse,
      }
    );
  }

  handleCredentialResponse(response: any) {
    this.usuarioService.loginGoogle(response.credential, 'rememberme')
      .subscribe(resp => {      
        Swal.fire('Bienvenido', resp.name, 'success');
        this.router.navigateByUrl('/admin-user');
      }
      );
  }

  cargarProductos() {
   
    this.productoService.cargarPrductos( 0 )
      .subscribe( ({ productos }) => {    
   
        this.productos = productos.productos;      
            
      });
  }
  


}
