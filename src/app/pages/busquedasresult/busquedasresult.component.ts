import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Producto } from 'src/app/models/product.models';
import { ProductoService } from 'src/app/services/producto.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-busquedasresult',
  templateUrl: './busquedasresult.component.html',
  styleUrls: ['./busquedasresult.component.css']
})
export class BusquedasresultComponent implements OnInit {

  public termino: string = '';
  public cargando: boolean = true;
  public productos: Producto[] = [];
  public desde: number = 0;
  public totalRegistros: number = 0;
  public ok: boolean = false;
  public total: number = 0;


  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productoService: ProductoService,
    private location: Location


  ) { }

  ngOnInit(): void {

    this.activatedRoute.params.subscribe( params => {
      console.log(params['termino']);

   this.termino = params['termino'];
    this.buscarProducto( params['termino'] );

 
    });



  }

  buscarProducto(termino: string) {  
    if (termino.length === 0) {
      return this.cargarProductos();
    }
    this.productoService.buscarProducto(termino)
      .subscribe((productos: Producto[]) => {
        this.productos = productos;
        this.cargando = false;
        

      }
      )
  }

  cargarProductos() {
    this.cargando = true;
    this.productoService.cargarPrductos( this.desde )
      .subscribe( ({ productos }) => {
        this.cargando = false;
        this.productos = productos.productos;
        this.totalRegistros = productos.total;
        this.ok = productos.ok;
        this.total = productos.total;
            
      });
  }
  

  volver(){
    this.location.back();
  }




}
