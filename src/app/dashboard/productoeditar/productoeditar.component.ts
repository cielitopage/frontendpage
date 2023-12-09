import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria } from 'src/app/models/categoria.models';
import { CategoriasService } from 'src/app/services/categorias.service';
import { ProductoService } from 'src/app/services/producto.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productoeditar',
  templateUrl: './productoeditar.component.html',
  styleUrls: ['./productoeditar.component.css']
})
export class ProductoeditarComponent implements OnInit {
  public usuario = this.usuarioService.usuarioActual.nombre;
  public prodtcForm!: FormGroup;
  public categorias: Categoria[] = [];
  public categoriaseleccionad: Categoria | undefined;
  public productoseleccionado!: any;
  public id!: string;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb : FormBuilder,
    private categoriasService: CategoriasService,
    private productoService: ProductoService,
    private usuarioService: UsuarioService,
 
 
  ) { }

  ngOnInit() {
    this.prodtcForm = this.fb.group({
      nombre: ['',Validators.required],
      precio: ['',Validators.required],
      oferta: [''],
      categoria: ['',Validators.required],
      descripcion: ['',Validators.required],
      talla:['',Validators.required],
      linkdepago: [''],
      tags: [''],      
    })

    this.cargarCategorias() ;

    this.prodtcForm.get('categoria')?.valueChanges
    .subscribe( cat => {
      this.categoriaseleccionad = this.categorias.find(categoria => categoria._id === cat);  
    })    

    this.activatedRoute.params.subscribe(({id}) => {    
      this.id = id;
      this.cargarProducto(id);
    })

    
  }


  cargarProducto(id: string) {   
    this.productoService.cargarPrductosPorId(id)
      .subscribe(producto => {      

        this.prodtcForm.setValue({
          nombre: producto.productos.productos.nombre,
          precio: producto.productos.productos.precio,
          descripcion: producto.productos.productos.descripcion,
          categoria: producto.productos.productos.categoria._id,
          linkdepago: producto.productos.productos.linkdepago,
          oferta: producto.productos.productos.oferta,
          talla: producto.productos.productos.talla,
          tags: producto.productos.productos.tags,       
        });
        
      });

  }



  guardar(){      
    this.productoService.editarProducto( this.id,this.prodtcForm.value)
    .subscribe( (resp:any) => {     
      Swal.fire('Guardado', 'Producto guardado correctamente', 'success');
      this.router.navigateByUrl('/admin-productos');     
    } )
  }


  camposNoValidos(campo: string): boolean {
    if (this.prodtcForm.get(campo)?.invalid && this.prodtcForm.get(campo)?.touched) {
      return true;
    } else {
      return false;
    }
  }

  cargarCategorias() {  
    this.categoriasService.cargarCaregorias()
      .subscribe(resp => {
        this.categorias = resp.categorias;       
      })
  }

}