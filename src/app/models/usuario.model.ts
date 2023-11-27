


export class UsuarioModel {
    

    constructor(        
        public nombre: string,
        public email: string,       
        public emailVerified: boolean,
        public telefono?: string,
        public estado? : boolean,
        public password?: string,
        public rol? : string,
        public img?: string,
        public google?: boolean,
        public uid?: string,
        public neew? : boolean,     

    ) {   }




}