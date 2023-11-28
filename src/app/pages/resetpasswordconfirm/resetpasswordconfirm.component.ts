import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-resetpasswordconfirm',
  templateUrl: './resetpasswordconfirm.component.html',
  styleUrls: ['./resetpasswordconfirm.component.css']
})
export class ResetpasswordconfirmComponent implements OnInit {


public token: string | null = '';


  public formSubmitted = false;

  public resetForm = this.formBuilder.group({
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
    id: ['', [Validators.required]]
  },
    {
      validators: this.passwordsIguales('password', 'password2')
    }
  );



  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private usuarioService: UsuarioService,

  ) { }
  ngOnInit(): void {
    this.activatedRoute.params.subscribe(({ token }) => {    
      this.token = token;
    });

    this.obtenerusuario();
  }

  obtenerusuario() {
    this.usuarioService.validaremail(this.token)
      .subscribe({
        next: (resp:any) => {         
          this.resetForm.get('id')?.setValue(resp.usuario.uid);          
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
  

  resetpassword() {
    this.formSubmitted = true;
    if (this.resetForm.invalid) {
      return;   
      }


    this.usuarioService.resetPasswordConfirm(this.resetForm.value)
      .subscribe({
        next: (resp:any) => {
       
          Swal.fire({
            title: 'Contraseña actualizada correctamente!',
            text: resp.msg,
            icon: 'success',
            confirmButtonText: 'Ok'
          });
          this.router.navigateByUrl('/login');
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

  validarPassword() {
    const pass1 = this.resetForm.get('password')?.value;
    const pass2 = this.resetForm.get('password2')?.value;
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
