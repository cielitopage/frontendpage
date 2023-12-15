import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/services/usuario.service';
import { map } from 'rxjs';

declare function customInitFunction(): any;

@Component({
  selector: 'app-testimonial',
  templateUrl: './testimonial.component.html',
  styleUrls: ['./testimonial.component.css']
})
export class TestimonialComponent implements  OnInit {

  public testimonial: any = [];
  public cargando = false;
  public desde = 0;
  public email: string = '';
  public mensaje: string = '';
  public nombre: string = '';
  public img = '';

 

  constructor(
    private router: Router,
    private usuarioService: UsuarioService,
  ) { }

  ngOnInit() {
    customInitFunction();
    this.getTestimonial();
  }

  

  getTestimonial() {
    this.usuarioService.getTestimonials()
      .subscribe((testimonial) => {

        console.log("testimonial",testimonial.testimonials);



        console.log("leo",testimonial.testimonials.map((resp: any) => resp.mensaje  ));

         this.testimonial = testimonial.testimonials;

        console.log("this.testimonial",this.testimonial);

     


   

    

     
      
      });
  }

}
