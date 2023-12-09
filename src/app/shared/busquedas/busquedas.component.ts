import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-busquedas',
  templateUrl: './busquedas.component.html',
  styleUrls: ['./busquedas.component.css']
})
export class BusquedasComponent implements OnInit {

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }
  
    ngOnInit(): void {
   
    }

    buscar(termino: string) {

      console.log(termino);

      if (termino.length < 1) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Debe ingresar un termino de busqueda!',
        
        })
        return;
      }

      this.router.navigate(['/buscar', termino]);
      
      
    }

}
