import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Producto } from 'src/app/models/product.models';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-detailproduct',
  templateUrl: './detailproduct.component.html',
  styleUrls: ['./detailproduct.component.css']
})
export class DetailproductComponent implements OnInit {

  public cargando: boolean = true;
  public productos!: Producto; 

  public nombre: string = '';
  public precio: number = 0;
  public descripcion: string = '';
  public categoria: string = '';
  public linkdepago: string = '';
  public oferta: number = 0;
  public talla: string = '';
  public tags: string = '';
  public id: string = '';
  public img: string = '';
  public img1: string = '';
  public estado: boolean = false;
  public categoriaid: string = '';




  
  constructor(
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
    
    
  ) { }

  ngOnInit(): void {

    this.usuarioService.validarToken().subscribe(resp => {
      this.usuarioService.usuarioActual = this.usuarioService.usuarioActual;
    })

    this.activatedRoute.params.subscribe(({ id }) => {
      this.cargarProducto(id);
    }) 

   
  }

  agregarAlCarrito(productos: Producto) {
    console.log(productos);
    }
  
 
  cargarProducto(id: string) {   
    this.productoService.cargarProductosPorId(id)
      .subscribe(producto => {            
          this.nombre =producto.productos.productos.nombre,
          this.precio = producto.productos.productos.precio,
          this.descripcion = producto.productos.productos.descripcion,
          this.categoria = producto.productos.productos.categoria.nombre, 
          this.linkdepago = producto.productos.productos.linkdepago,
          this.oferta = producto.productos.productos.oferta,
          this.talla = producto.productos.productos.talla,
          this.tags = producto.productos.productos.tags,    
          this.id = producto.productos.productos._id,
          this.img = producto.productos.productos.img,
          this.img1 = producto.productos.productos.img1,  
          this.estado = producto.productos.productos.estado,     
          this.productos = producto.productos.productos,   
         this.cargando = false;
           }
      )}

    
      volver(){
        this.location.back();
      }

}
