import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RegisterForm } from '../auth/interfaces/register-form-interfaces';
import { environment } from '../../environments/environment';

const baseUrl: string = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

 

  constructor(
    private http: HttpClient
  ) { }



  getUsuarios(){
    return this.http.get('https://reqres.in/api/users?page=2');
  }

  getUsuarioById(id:string){
    return this.http.get(`https://reqres.in/api/users/${id}`);
  }

  crearUsuario(usuario:RegisterForm){ 
    console.log("usuario service",usuario);
  
    return this.http.post<RegisterForm>(`${baseUrl}/usuarios`,usuario);
   
  }
  // /validate/:token
  validaremail(token:string | null){
    console.log("token service",token);
    return this.http.get(`${baseUrl}/validate-email/validate/${token}`);
  
  }


}
