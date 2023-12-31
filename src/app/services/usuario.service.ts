import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../auth/interfaces/register-form-interfaces';

import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { LoginForm } from '../auth/interfaces/login-form-interfaces';
import { ResetForm } from '../auth/interfaces/reset-form-interfaces';
import Swal from 'sweetalert2';
import { Data, Router } from '@angular/router';
import { UsuarioModel } from '../models/usuario.model';
import { environment } from 'src/environments/environment';

declare const gapi: any;
declare const google: any;



const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuarioActual: UsuarioModel = new UsuarioModel('', '', '', '', '', '',false, false, '',false);


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {


  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid(): string {
    return this.usuarioActual.uid || '';
  }


 

  getUsuarioById(id: string) {
    return this.http.get(`https://reqres.in/api/users/${id}`);
  }

  crearUsuario(usuario: RegisterForm) {
    return this.http.post<RegisterForm>(`${baseUrl}/usuarios`, usuario)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
        })
      );

  }
  // /validate/:token
  validaremail(token: string | null) {
    return this.http.get(`${baseUrl}/validate-email/validate/${token}`);

  }

  resetPassword(email: any) {
  
    return this.http.put(`${baseUrl}/resetpassword/reset`, email);


  }

  resetPasswordConfirm(usuario: ResetForm) {
    const id = usuario.id;
    const password = usuario.password;
    return this.http.put(`${baseUrl}/resetpasswordconfirm/resetconfirm/${id}`, { password });

  }


  login(usuario: LoginForm | any) {
    return this.http.post(`${baseUrl}/login`, usuario)
      .pipe(
        tap((resp: any) => {   
          localStorage.setItem('token', resp.token);
          if (usuario.rememberme) {
            localStorage.setItem('email', usuario.email);      

          } else {
            localStorage.removeItem('email');
          }
        })
      );
  }


  googleInit() {
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1024348454013-i936bdigj86lup1kb88ecevv9r8rahl6.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      });
    })
  }



  loginGoogle(token: string, rememberme: any) {
    return this.http.post(`${baseUrl}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          const { email, google, name, rol, picture = '', uid } = resp;
          localStorage.setItem('token', resp.token)     

          if (rememberme) {
            localStorage.setItem('email', email);
          } else {
            localStorage.removeItem('email');
          }

        })
      );

  }
 

  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${baseUrl}/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      map((resp: any) => {
        const { nombre, email, rol, img = '', telefono, fechanac,estado, google, uid,emailVerified } = resp.usuario;
        this.usuarioActual = new UsuarioModel(nombre, email, rol, img, telefono,fechanac, estado, google, uid,emailVerified);       
        
        localStorage.setItem('token', resp.token);
        return true;
      }),
      catchError(error => of(false))
    );

  }

  logout() {
    localStorage.removeItem('token');  
    sessionStorage.removeItem('cartItems');
 

    if (this.auth2) {
      this.auth2.signOut().then(() => {
        console.log("User signed out.");
        sessionStorage.removeItem('cartItems');
      });
    }
  }

  actualizarUsuario(usuario: { nombre: any, email: any, telefono: any, fechanac:any ,rol:any}) {  
    
    return this.http.put(`${baseUrl}/usuarios/${this.uid}`, usuario, {
      headers: {
        'x-token': this.token
      }
    });
  }

  getUsuarios( desde: number = 0 ) {
    return this.http.get(`${ baseUrl }/usuarios?desde=${ desde }`, {
      headers: {
        'x-token': this.token
      }
    } 
    )
    .pipe(
      delay(1500),
      map( resp => {
      
        let { total, usuarios } = resp as any;
         usuarios = usuarios.map(
          (user: any) => new UsuarioModel( user.nombre, user.email, user.rol, user.img, user.telefono,user.fechanac,user.estado, user.google, user.uid,user.emailVerified )
        );
        return {
          total: total,
          usuarios
        };
      }
      )
    );
  }

  


  actualizarRol( usuario: UsuarioModel ) { 
    return this.http.put(`${ baseUrl }/usuarios/${ usuario.uid }`, usuario, {
      headers: {
        'x-token': localStorage.getItem('token') || ''
      }          
    } 
    )
    .pipe(
      map( (resp: any) => {
        const { nombre, email, uid, rol, img, google } = resp.usuario;
        return new UsuarioModel( nombre, email, rol, img, '', '', false, google, uid,false );         
      }
      )
    );

}

actualizarEstado( usuario: UsuarioModel ) { 
  return this.http.put(`${ baseUrl }/usuarios/${ usuario.uid }`, usuario, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }          
  } 
  )
  .pipe(
    map( (resp: any) => {
      const { nombre, email, uid, rol, img, google } = resp.usuario;
      return new UsuarioModel( nombre, email, rol, img, '', '', false, google, uid,false );         
    }
    )
  );

}

eliminarUsuario( id: string ) {

  return this.http.delete(`${ baseUrl }/usuarios/${ id }`, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }          
  } 
  );
}


createTestimonial(mensaje: any,iduser :any) {
  return this.http.post(`${ baseUrl }/testimonials`, {mensaje,iduser}, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }          
  } 
  );

}

getTestimonials() {
  return this.http.get(`${ baseUrl }/testimonials`, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }          
  } 
  )
  .pipe(
    delay(1500),
    map( resp => {
    
      let { total, testimonials } = resp as any;
     
      return {
        total: total,
        testimonials
      };
    }
    )
  );

}


actualizarTestimonial(mensaje: any,id:string) {
 
  return this.http.put(`${ baseUrl }/testimonials/${ id }`, mensaje, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }          
  } 
  );

}

eliminarTestimonio( iduser: string ) {



  return this.http.delete(`${ baseUrl }/testimonials/${ iduser }`, {
    headers: {
      'x-token': localStorage.getItem('token') || ''
    }          
  } 
  );

}





}




