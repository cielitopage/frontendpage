import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/product.models';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-bebes',
  templateUrl: './bebes.component.html',
  styleUrls: ['./bebes.component.css']
})
export class BebesComponent  implements OnInit {

  public usuario = this.usuarioService.usuarioActual.nombre;
  public usuarioActual = this.usuarioService.usuarioActual;
  public desde: number = 0;
  public totalProductos: number = 0;
  public cargando: boolean = true;
  public productos: Producto[] = []; 
  public hasta : number = 0;
  public totalRegistros: number = 0;
  public ok: boolean = false;
  public total: number = 0;
  public estado: boolean  | undefined;
  public categorias: any;
  public categoria: any;


 
  constructor(
    private productoService: ProductoService,
    private usuarioService: UsuarioService, 
    private categoriasService:CategoriasService

     ) { }

  ngOnInit(): void {    

    this.cargarCategorias();
      this.usuarioService.validarToken().subscribe(resp => {     
      this.usuarioService.usuarioActual = this.usuarioActual;
    })
  }

  
  cargarCategorias() {
    this.cargando = true;
    this.categoriasService.buscarCategoria("bebes")
      .subscribe((categorias: any) => {
        this.cargando = false;
        this.categorias = categorias;
        this.categoria =this.categorias.map((categoria: { _id: any; }) => categoria._id);
        this.cargarProductosPorCategoria(this.categoria);
       
      }
      )
      }
  


 

  cargarProductosPorCategoria(id: string) {
    this.cargando = true;   
    this.productoService.cargarPrductosPorCategoria(id )
      .subscribe( ({ productos }) => {    
        this.cargando = false;
        this.productos = productos.productos;
        this.totalRegistros = productos.total;
        this.ok = productos.ok;
        this.total = productos.total;     
        
      });
  }


  buscarProducto(termino: string) {  
    if (termino.length === 0) {
      return this.cargarProductos();
    }
    this.productoService.buscarProducto(termino)
      .subscribe((productos: Producto[]) => {
        this.productos = productos;
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
        this.estado = productos.productos.map((producto: { estado: any; }) => producto.estado);

        console.log("estado chicos",productos.productos.map((producto: { categoria: any; }) => producto.categoria.nombre));
        
      });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;
    console.log(desde);
    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarProductos();
  }



  

}

