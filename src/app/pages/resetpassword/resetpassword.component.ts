import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent  implements OnInit {

  public formSubmitted = false;

  public resetForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
  });


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,

  ) { }



  ngOnInit(): void {

  }



  reset() {
    this.formSubmitted = true;

    if (this.resetForm.invalid) {
      return;
    }

    this.usuarioService.resetPassword(this.resetForm.value)
      .subscribe({
        next: (resp) => {
          Swal.fire({
            title: 'Success!',
            text: 'Revise su correo electrónico para restablecer su contraseña',
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router.navigateByUrl('/home');
        },
        error: (err) => {
          Swal.fire({
            title: 'Error!',
            text: err.error.msg,
            icon: 'error',
            confirmButtonText: 'Ok'
          });
        }
      });
      }

  

  campoNoValido(campo: string): boolean {
    if (this.resetForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

}