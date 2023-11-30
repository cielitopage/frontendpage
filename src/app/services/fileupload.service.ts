import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const baseUrl: string = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor() { }


  async fileUpload(  archivo: File, tipo: 'usuarios'|'categorias'|'articulos',    id: any,) {     

    try {
      const url = `${ baseUrl }/uploads/usuario/${ tipo }/${ id }`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch( url, {
        method: 'PUT',
        headers: {
          'x-token': localStorage.getItem('token') || ''
        },
        body: formData
      });

      const data = await resp.json();    
   
      if ( data ) {      
        return data.nombreArchivo;
      }
      return false;    
    } catch (err) {
      console.log(err);     
    }
  }

}



