import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.models';
import { Producto } from 'src/app/models/product.models';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-adminproductos',
  templateUrl: './adminproductos.component.html',
  styleUrls: ['./adminproductos.component.css']
})
export class AdminproductosComponent  implements OnInit {

  public usuario = this.usuarioService.usuarioActual.nombre;
  public usuarioActual = this.usuarioService.usuarioActual;
  public categoriaseleccionad: Categoria | undefined;
 
  public producto :any
  public categorias: any[] = [];

  public desde: number = 0;
  public totalProductos: number = 0;
  public cargando: boolean = true;
  public productos: Producto[] = []; 
  public hasta : number = 0;
  public totalRegistros: number = 0;
  public ok: boolean = false;
  public total: number = 0;
  public submitted = false; 

  public prodtcForm!: FormGroup;

 


  constructor(
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
    private modalImagenService: ModalImagenService,
    private categoriasService: CategoriasService,
  
    private fb : FormBuilder,
    
  
  ) { }
  ngOnInit(): void {

    this.prodtcForm = this.fb.group({
      nombre: ['',Validators.required],
      precio: ['',Validators.required],
      categoria: ['',Validators.required],
      descripcion: ['',Validators.required],
      linkdepago: ['']
      
    })    

    this.usuarioService.validarToken().subscribe(resp => {     
      this.usuarioService.usuarioActual = this.usuarioActual;
    })

    this.cargarProductos();
    this.cargarCategorias();

    this.prodtcForm.get('categoria')?.valueChanges
    .subscribe( cat => {
      this.categoriaseleccionad = this.categorias.find(categoria => categoria._id === cat);  
    })  

    this.modalImagenService.nuevaImagen.subscribe(img => this.cargarProductos());
    this.modalImagenService.nuevaImagen.subscribe(img1 => this.cargarProductos());
   
  }

  cargarCategorias() {  
    this.categoriasService.cargarCaregorias()
      .subscribe(resp => {
        this.categorias = resp.categorias;       
      })
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
          
    });
}


  cambiarDesde(valor: number) {
  const desde = this.desde + valor;
  if (desde >= this.totalRegistros) {
    return;
  }
  if (desde < 0) {
    return;
  }
  this.desde += valor;
  this.cargarProductos();




  }

  eliminarProducto(producto: Producto) {
  if (producto.usuario?._id !== this.usuarioService.usuarioActual.uid) {
    Swal.fire('Error', 'No puede eliminar esta categoria,solo su categria es editable', 'error');
    return;
  }
  Swal.fire({
    title: '¿Borrar producto?',
    text: `Esta a punto de borrar a ${producto.nombre}`,
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Si, borrar',
    cancelButtonText: 'No, cancelar',
    reverseButtons: true
  }).then((result) => {
    if (result.value) {
      this.productoService.borrarProducto(producto._id)
        .subscribe(resp => {
          this.cargarProductos();
          Swal.fire(
            'Borrado!',
            `El producto ${producto.nombre} ha sido borrado`,
            'success'
          );
        })
    }
  });
  }

  abrirModal(producto: Producto) {
    if (producto.usuario?._id !== this.usuarioService.usuarioActual.uid) {
      Swal.fire('Error', 'No puede editar esta categoria,solo su categria es editable', 'error');
      return;
    }
    this.modalImagenService.abrirModal('productos', producto._id, producto.img)    
  }
  abrirModalImagen1(producto: Producto) {
    if (producto.usuario?._id !== this.usuarioService.usuarioActual.uid) {
      Swal.fire('Error', 'No puede editar esta categoria,solo su categria es editable', 'error');
      return;
    }
    this.modalImagenService.abrirModalImagen1('productos', producto._id, producto.img1)    
  }

  onScroll(): void {
    this.hasta += 10;
    this.cargarProductos();
  }

  actualizarLink(linkdepago:string,producto: Producto) {
    if (producto.usuario?._id !== this.usuarioService.usuarioActual.uid) {
      Swal.fire('Error', 'No puede editar esta categoria,solo su categria es editable', 'error');
      return;
    }
    Swal.fire({
      title: 'Actualizar link',
      text: `Esta a punto de actualizar el link de ${producto.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, actualizar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.productoService.actualizarLink(linkdepago,producto)
          .subscribe(resp => {
            this.cargarProductos();
            Swal.fire(
              'Actualizado!',
              `El link de ${producto.nombre} ha sido actualizado`,
              'success'
            );
          })
      }
    });
  }

  eliminarLink(producto: Producto) {
    if (producto.usuario?._id !== this.usuarioService.usuarioActual.uid) {
      Swal.fire('Error', 'No puede editar esta categoria,solo su categria es editable', 'error');
      return;
    }
    Swal.fire({
      title: '¿Borrar link?',
      text: `Esta a punto de borrar el link de ${producto.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
        this.productoService.eliminarLink(producto.linkdepago='',  producto)
          .subscribe(resp => {
            this.cargarProductos();
            Swal.fire(
              'Borrado!',
              `El link de ${producto.nombre} ha sido borrado`,
              'success'
            );
          })
      }
    });
  } 





}
