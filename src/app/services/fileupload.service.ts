import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const baseUrl= 'https://backendshopcielito-dev-kxct.2.us-1.fl0.io/api';

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor() { }

  async fileUpload(  archivo: File, tipo: 'usuarios'|'categorias'|'articulos',    id: string,) {     

    try {

      const url = `${baseUrl}/uploads/usuario/${ tipo }/${ id }`;

      console.log(url);

      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      
      });
      console.log( archivo);
      console.log(resp);
      // const url = `${ baseUrl }/uploads/usuario/${ tipo }/${ id }`;
      // const formData = new FormData();
      // formData.append('imagen', archivo);

      // const resp = await fetch( url, {
      //   method: 'PUT',
      //   headers: {
      //     'x-token': localStorage.getItem('token') || ''
      //   },
      //   body: formData
      // });

      // const data = await resp.json();
      // console.log(data);
      // if ( data.ok ) {
      //   return data.nombreArchivo;
      // }
      // return false;    
    } catch (err) {
      console.log(err);
    }
  }

}




