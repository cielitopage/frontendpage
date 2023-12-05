import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';

import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';
import { environment } from 'src/environments/environment';
import { UsuarioModel } from '../models/usuario.model';

const baseUrl = environment.baseUrl;


interface CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

@Injectable({
  providedIn: 'root'
})


export class authGuardAdmin implements CanActivate {

    constructor(
      private usuarioService: UsuarioService,
      private router: Router,
     
    ) { }
  
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  
      const rol = this.usuarioService.usuarioActual.rol;

      if (rol === 'SUPER_ADMIN_ROLE') {
        return true;
      } else {
        Swal.fire({
                   icon: 'error',
                   title: 'Oops...',
                    text: 'Debes iniciar sesión como administrador para acceder a esta página ',
                 
                        }
                    )
                    .then((result) => {
                      if (result.isConfirmed) {
                        this.usuarioService.logout();
                        localStorage.clear();
                        this.router.navigateByUrl('/login');
                      }
                    }
                    )
                    
                 
                
                  
                  
          

        return false;
      }





    }

    
  }


