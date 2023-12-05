import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';

import Swal from 'sweetalert2';
import { UsuarioService } from '../services/usuario.service';
import { environment } from 'src/environments/environment';

const baseUrl = environment.baseUrl;


interface CanActivate {
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree;
}

@Injectable({
  providedIn: 'root'
})


export class authGuardEmailVerified implements CanActivate {

    constructor(
      private usuarioService: UsuarioService,
      private router: Router,
     
    ) { }
  
    canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  
      const emailverified = this.usuarioService.usuarioActual.emailVerified;

      console.log("emailverified",emailverified);

      if (emailverified  === true) {
        return true;
      } else {
        Swal.fire({
                   icon: 'error',
                   title: 'Oops...',
                    text: 'Debes verificar tu email para acceder a esta página ',
                    
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


