import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit, AfterViewInit {

  @ViewChild('googleButton') googleButton!: ElementRef;

  public formSubmitted = false;
  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    rememberme: [true]
  });


  constructor(
    private router: Router,
    private fb: FormBuilder,
    private usuarioService: UsuarioService
  ) { }



 

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.googleInit();
  }


  googleInit() {
    google.accounts.id.initialize({
      client_id: "421085974774-n7vb932cu4h3oujad7c7ns3fa7rqaef3.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      this.googleButton.nativeElement,
      {
        theme: "outline",
        size: "large",
        width: "300",
        height: "30",
        text: "continue_with",
        shape: "rect",
        longtitle: true,
        onsuccess: this.handleCredentialResponse,
        onfailure: this.handleCredentialResponse,
      }
    );
  }

  handleCredentialResponse(response: any) {
    this.usuarioService.loginGoogle(response.credential, this.loginForm.get('rememberme')?.value)
      .subscribe(resp => {      
        Swal.fire('Bienvenido', resp.name, 'success');
        this.router.navigateByUrl('/admin-user');
      }
      );
  }



  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    // Realizar el posteo    
    this.usuarioService.login(this.loginForm.value)
      .subscribe({
        next: (resp) => {       
         
          Swal.fire('Bienvenido', resp.usuario.nombre, 'success');
          this.router.navigateByUrl('/admin-user');
        },
        error: (err) => {
          Swal.fire('Error', err.error.msg, 'error');
        }
      });
  }


  campoNoValido(campo: string): boolean {
    if (this.loginForm.get(campo)?.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }




}
