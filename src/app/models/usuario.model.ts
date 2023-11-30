import { environment } from "src/environments/environment";



const baseUrl = environment.baseUrl;

export class UsuarioModel { 
   
    
    constructor(     
        
        public nombre: string,
        public email: string,
        public rol : string,
        public img: string ,
        public telefono?: string,
        public estado? : boolean,       
        public google?: boolean,
        public uid?: string,
       
        ) {      
     
       
    }
    

    

   get imagenUrl(){
        
        if (!this.img) {
            return `${baseUrl}/uploads/usuarios/no-image`;
        } else if (this.img.includes('https')) {
            return this.img;
        } else if (this.img) {
            return this.img;
        } else {
            return `${baseUrl}/uploads/usuarios/no-image`;
        }
  
  }


 



}