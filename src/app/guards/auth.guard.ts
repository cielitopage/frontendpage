import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';

const baseUrl = environment.baseUrl;


interface CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

@Injectable({
  providedIn: 'root'
})


export class authGuard implements CanActivate {

    constructor(
      private usuarioService: UsuarioService,
      private router: Router,
     
    ) { }
  
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {   
  
      const token = localStorage.getItem('token') || '';

      return this.usuarioService.validarToken().pipe(
        tap( (valid) => {
          if (!valid) {
            Swal.fire({
                       icon: 'error',
                       title: 'Oops...',
                        text: 'Debes iniciar sesión para acceder a esta página ',
                        footer: '<a href="/login">Login</a>'
                            }
                        )
                        localStorage.clear(); 
            this.router.navigateByUrl('/login');
          }
        }
        )
      );
    }
  }


