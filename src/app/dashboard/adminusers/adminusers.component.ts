import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { FileuploadService } from 'src/app/services/fileupload.service';

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})


export class AdminusersComponent  implements OnInit {

  public usuarioActual = this.usuarioService.usuarioActual;
  public fechanacimiento = moment(this.usuarioActual.fechanac).format('YYYY-MM-DD');
  public imagenSubir!: File;
  public imagenTemp: string | ArrayBuffer | null = null;
  public imagen = this.usuarioActual.img;
  public cambiarImagentemp = false;

  // public imagenTemp: any[] = [];



public formSubmitted = false;

public registerForm = this.fb.group({
  nombre: [this.usuarioActual.nombre, [Validators.required, Validators.minLength(3)]],
  email: [this.usuarioActual.email, [Validators.required, Validators.email]],
  telefono: [this.usuarioActual.telefono, [Validators.required, Validators.pattern('[0-9]{10}')]],
  fechanac: [this.usuarioActual.fechanac, Validators.required],
  rol: [this.usuarioService.usuarioActual.rol, [Validators.required, Validators.minLength(6)]],
 
}  
);


constructor(
  private router: Router,
  private fb: FormBuilder,
  private usuarioService: UsuarioService,
  private uploadService: FileuploadService

) {

 }

ngOnInit(): void {

 
}

cambiarImagen(event: any) {
  const file = event.target.files[0];
  this.cambiarImagentemp = true;
  if (!file) {
    return;
  }

  if (file.type.indexOf('image') < 0) {
    Swal.fire(
      {
        title: 'Error',
        text: 'El archivo seleccionado no es una imagen',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',  
        allowOutsideClick: false,
        allowEscapeKey: false })
    return;
  }
  this.imagenSubir = file;
  const reader = new FileReader();
  const url64 = reader.readAsDataURL(file);
  reader.onloadend = () => {
    this.imagenTemp = reader.result as string;

  };

}


subirImagen() {

  this.uploadService.fileUpload(this.imagenSubir, 'usuarios', this.usuarioActual.uid)


}

onSubmit() {
  this.formSubmitted = true;  
  if (this.registerForm.invalid) {
    return;
  }

  const { nombre, email, telefono, fechanac,rol } = this.registerForm.value;
  this.usuarioService.actualizarUsuario({ nombre, email, telefono, fechanac ,rol})
  .subscribe(
    {
      next: (resp) => {

        const { usuario}:any = resp

        this.usuarioActual.nombre = usuario.nombre;
        this.usuarioActual.email = usuario.email;
        this.usuarioActual.telefono = usuario.telefono;
        this.usuarioActual.fechanac = usuario.fechanac;
        this.usuarioActual.rol = usuario.rol;
   



     

       console.log("respu",resp );
        Swal.fire(
          {
            title: 'Usuario actualizado correctamente',
            text: `Has actualizado tu cuenta  " ${this.registerForm.get('email')?.value} " en nuestra base de datos`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6',  
            allowOutsideClick: false,
            allowEscapeKey: false })

            
       
      },
      error: (err) => {
        Swal.fire(
          {
            title: 'Error',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6',  
            allowOutsideClick: false,
            allowEscapeKey: false })
      }
    }
  )

  
}

campoNoValido(campo: string): boolean {
  if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
    return true;
  } else {
    return false;
  }
}





}
