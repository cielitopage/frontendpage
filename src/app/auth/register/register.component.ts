import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  token: string|undefined;

  public formSubmitted = false;

  public registerForm = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
    rememberme: [false, Validators.requiredTrue]
  },
    {
      validators: this.passwordsIguales('password', 'password2')
    }
  );



  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService

    




  ) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.formSubmitted = true;  

    if (this.registerForm.valid) {
      // Realizar el posteo
      console.log(this.registerForm.value);
      this.usuarioService.crearUsuario(this.registerForm.value).subscribe(
        {
          next: (resp) => {
            console.log("respuesta del comp",resp.token);
            localStorage.setItem('token',resp.token!);
            Swal.fire(
              {
                title: 'Te has registrado correctamente',
                text: `En breve recibirás un correo electrónico a${this.registerForm.get('email')?.value}para validar tu cuenta`,
                icon: 'success',
                confirmButtonText: 'Aceptar',
                confirmButtonColor: '#3085d6',  
                allowOutsideClick: false,
                allowEscapeKey: false })
            this.router.navigateByUrl('/home');
       
          },
          error: (err) => {
            console.warn(err.error.msg);
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
      );
    } else {
      // Mostrar mensaje de error
      console.log('Formulario no valido');
    }

  }

  campoNoValido(campo: string): boolean {
    if (this.registerForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  aceptarTerminos() {
    return !this.registerForm.get('rememberme')?.value && this.formSubmitted;
  }

  validarPassword() {
    const pass1 = this.registerForm.get('password')?.value;
    const pass2 = this.registerForm.get('password2')?.value;

    if ((pass1 !== pass2) && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  passwordsIguales(pass1Name: string, pass2Name: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);

      if (pass1Control?.value === pass2Control?.value) {
        pass2Control?.setErrors(null);
      } else {
        pass2Control?.setErrors({ noEsIgual: true });
      }
    }
  }






}
