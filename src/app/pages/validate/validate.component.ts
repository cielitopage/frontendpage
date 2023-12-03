import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-validate',
  templateUrl: './validate.component.html',
  styleUrls: ['./validate.component.css']
})
export class ValidateComponent implements OnInit {

  public token!: string | null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService
  ) { }

  ngOnInit(): void {
    const tokenf = this.activatedRoute.snapshot.paramMap.get('token');
    this.token = tokenf;
  }



  validaremail(token: string | null) {
    console.log(token);
    return this.usuarioService.validaremail(token).subscribe(
      {
        next: (resp) => {
          this.router.navigateByUrl('/login');
        },
        error: (err) => {
          console.warn(err.error.msg);
        }
      }
    );
  }

}