import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';


const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root'
})
export class FileuploadService {

  constructor() { }


  async fileUpload(  archivo: File, tipo: 'productos'|'usuarios'|'categorias'|'articulos',    id: string,) {     

    try {
      const url = `${ base_url }/uploads/${ tipo }/${ id }`;
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
      console.log(data);
      if ( data.ok ) {
        return data.nombreArchivo;
      }
      return false;    
    } catch (err) {
      console.log(err);     
    }
  }


}




