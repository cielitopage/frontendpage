import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../auth/interfaces/register-form-interfaces';
import { environment } from '../../environments/environment';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { LoginForm } from '../auth/interfaces/login-form-interfaces';
import { ResetForm } from '../auth/interfaces/reset-form-interfaces';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

declare const gapi: any;
declare const google: any;



const baseUrl: string = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario!: any;



  constructor(
    private http: HttpClient,
    private router: Router,
  ) { }



  getUsuarios() {
    return this.http.get('https://reqres.in/api/users?page=2');
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
    console.log("resetPassword", email);
     return this.http.put(`${baseUrl}/resetpassword/reset`, email);
  
     
  }

  resetPasswordConfirm(usuario:ResetForm) {

    console.log("resetPasswordConfirm service", usuario.password);
    console.log("resetPasswordConfirm service", usuario.id);
    const id = usuario.id;
    const password = usuario.password;
 

    return this.http.put(`${baseUrl}/resetpasswordconfirm/resetconfirm/${id}`, {password});
 

  }


  login(usuario: LoginForm | any) {
    return this.http.post(`${baseUrl}/login`, usuario)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token);
          localStorage.setItem('rol', resp.rol);

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
          console.log("loginGoogle", resp);
          const { email, google, name, rol, picture = '', uid } = resp;

          localStorage.setItem('token', resp.token)
          localStorage.setItem('nombre', resp.name);         
          localStorage.setItem('rol', resp.usuario.rol);

          if (rememberme) {
            localStorage.setItem('email', resp.usuario.email);
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
      tap((resp: any) => {
        const { nombre, email, uid, rol, img, google } = resp.usuario;
        console.log("authguard", resp);
        //  this.usuario = new Usuario( nombre, email,  uid, rol , img, google);  
        //  this.usuario.imprimirUsuario();
        localStorage.setItem('token', resp.token);

      }),
      map(resp => true),
      catchError(error => of(false))
    );

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('rol'); 
    localStorage.removeItem('nombre');
    localStorage.removeItem('img');
  
    if (this.auth2) {
      this.auth2.signOut().then(() => {
        console.log("User signed out.");
      });
    }  
  }


 

}


