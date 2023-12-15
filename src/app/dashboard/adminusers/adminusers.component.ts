import { Component, OnInit, NgZone } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { FileuploadService } from 'src/app/services/fileupload.service';
import { Location } from '@angular/common';

moment.locale('es');

@Component({
  selector: 'app-adminusers',
  templateUrl: './adminusers.component.html',
  styleUrls: ['./adminusers.component.css']
})


export class AdminusersComponent implements OnInit {

  public usuarioActual = this.usuarioService.usuarioActual;
  public fechanacimiento = moment(this.usuarioActual.fechanac).format('YYYY-MM-DD');
  public imagenSubir!: File;
  public imagenTemp: string | ArrayBuffer | null = null;
  public cambiarImagentemp = false;
  public dia = 1;
  public emailVerified = this.usuarioService.usuarioActual.emailVerified;
  public contenido: string = '';
  public limiteCaracteres: number = 200;

  // public imagenTemp: any[] = [];



  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: [this.usuarioActual.nombre, [Validators.required, Validators.minLength(3)]],
    email: [this.usuarioActual.email, [Validators.required, Validators.email]],
    telefono: [this.usuarioActual.telefono, [Validators.required, Validators.pattern('[0-9]{10}')]],
    fechanac: [this.usuarioActual.fechanac, [Validators.required, this.dateValidator]],
    rol: [this.usuarioService.usuarioActual.rol, [Validators.required, Validators.minLength(6)]],
  } );

  public registerFormtestimonial = this.fb.group({
    mensaje: ['', Validators.required],
    uid: [this.usuarioService.usuarioActual.uid],

  }
  );

 

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService,
    private uploadService: FileuploadService,
    private location: Location

  ) { }

  ngOnInit(): void {

    this.usuarioService.validarToken().subscribe(resp => {
      console.log("resp", resp);
      this.usuarioService.usuarioActual = this.usuarioActual;            
      console.log("this.usuarioActual", this.usuarioActual.emailVerified);

    })


  }

  dateValidator(control: AbstractControl): { [key: string]: any } | null {
    const validDate = moment(control.value, 'YYYY-MM-DD', true).isValid();
    return validDate ? null : { 'invalidDate': { value: control.value } };
  }

  cambiarImagen(event: any) {
    const file = event.target.files[0];

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
          allowEscapeKey: false
        })
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
    this.uploadService
      .fileUpload(this.imagenSubir, 'usuarios', this.usuarioService.usuarioActual.uid as string)
      .then(img => {
        this.usuarioActual.img = img;
        Swal.fire(
          {
            title: 'Imagen actualizada correctamente',
            text: `Has actualizado tu imagen de perfil en nuestra base de datos`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
      }
      )
      .catch(err => {
        Swal.fire(
          {
            title: 'Error',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'Aceptar',
            confirmButtonColor: '#3085d6',
            allowOutsideClick: false,
            allowEscapeKey: false
          })
      }
      );

  }

  onSubmit() {
    this.formSubmitted = true;
    if (this.registerForm.invalid) {
      console.log("this.registerForm.invalid", this.registerForm.invalid);

      return;
    }

    const { nombre, email, telefono, fechanac, rol } = this.registerForm.value;
    this.usuarioService.actualizarUsuario({ nombre, email, telefono, fechanac, rol })
      .subscribe(
        {
          next: (resp) => {
            const { usuario }: any = resp
            this.usuarioActual.nombre = usuario.nombre;
            this.usuarioActual.email = usuario.email;
            this.usuarioActual.telefono = usuario.telefono;
            this.usuarioActual.fechanac = usuario.fechanac  ;
            this.usuarioActual.rol = usuario.rol;

            console.log("respu", resp);
            Swal.fire(
              {
                title: 'Usuario actualizado correctamente',
                text: `Has actualizado tu cuenta  " ${this.registerForm.get('email')?.value} " en nuestra base de datos`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
                allowEscapeKey: false
              })


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
                allowEscapeKey: false
              })
          }
        }
      );
  }

  createTestimonial() {

    this.usuarioService.createTestimonial(this.registerFormtestimonial.get('mensaje')?.value)
      .subscribe(
        {
          next: (resp) => {

            console.log("respu", resp);
            Swal.fire(
              {
                title: 'Testimonial enviado correctamente',
                text: `Has enviado tu testimonial  " ${this.registerFormtestimonial.get('mensaje')?.value} " en nuestra base de datos`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
                allowEscapeKey: false
              })
          },
          error: (err) => {
            console.log("err", err.error.errores.mensaje.msg);
            Swal.fire(
              {
                title: 'Error',
                text: err.error.errores.mensaje.msg,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
                allowEscapeKey: false
              })
          }
        }
      );

  }




  onSubmitTestimonials() {
    if (this.usuarioService.getTestimonials()
      .subscribe(
        {
          next: (resp) => {
            //  console.log("resjjjjjpu",resp.testimonials[0].usuario._id);
            // id =resp.testimonials[0].usuario._id;
            console.log("re_spu", resp.testimonials.map((resp: any) => resp.usuario._id));
            const id = resp.testimonials.map((resp: any) => resp.usuario._id);

            if (!id.includes(this.usuarioService.usuarioActual.uid)) {
              this.createTestimonial();
            } else {
              Swal.fire(
                {
                  title: 'Error',
                  text: "Ya has enviado un testimonial, solo puedes enviar uno",
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#3085d6',
                  allowOutsideClick: false,
                  allowEscapeKey: false
                })
            }

          },
          error: (err) => {
            console.log("err", err);
            Swal.fire(
              {
                title: 'Error',
                text: err.error.msg,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
                allowEscapeKey: false
              })
          }
        }
      )) {
      return;
    }
  }

  eliminarTestimonio() {
    if (this.usuarioService.getTestimonials()
      .subscribe(
        {
          next: (resp) => {

            console.log("respu", resp);
            if (resp.total === 0) {
              Swal.fire(
                {
                  title: 'Error',
                  text: "No tienes testimonios para eliminar",
                  icon: 'error',
                  confirmButtonText: 'Aceptar',
                  confirmButtonColor: '#3085d6',
                  allowOutsideClick: false,
                  allowEscapeKey: false
                })
            } else {
              this.usuarioService.eliminarTestimonio(resp.testimonials[0]._id)
                .subscribe(
                  {
                    next: (resp) => {

                      console.log("respu", resp);
                      Swal.fire(
                        {
                          title: 'Testimonial eliminado correctamente',
                          text: `Has eliminado tu testimonial  " ${this.registerFormtestimonial.get('mensaje')?.value} " en nuestra base de datos`,
                          icon: 'success',
                          confirmButtonText: 'Aceptar',
                          confirmButtonColor: '#3085d6',
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        })
                    },
                    error: (err) => {
                      console.log("err", err);
                      Swal.fire(
                        {
                          title: 'Error',
                          text: err.error.msg,
                          icon: 'error',
                          confirmButtonText: 'Aceptar',
                          confirmButtonColor: '#3085d6',
                          allowOutsideClick: false,
                          allowEscapeKey: false
                        })
                    }
                  }
                );
            }

          },
          error: (err) => {

            console.log("err", err);
            Swal.fire(
              {
                title: 'Error',
                text: err.error.msg,
                icon: 'error',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3085d6',
                allowOutsideClick: false,
                allowEscapeKey: false
              })
          }
        }
      )) {
      return;
    }

  }




  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }


  emailVerifiedtrue() {
    if (this.usuarioService.usuarioActual?.emailVerified === true) {
      return true;
    }
    return false;
  }



  volver(){
    this.location.back();
  }


 

  get caracteresRestantes(): number {
    return this.limiteCaracteres - this.contenido.length;
  }
  

}
