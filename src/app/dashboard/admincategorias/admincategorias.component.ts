import { Component, OnInit } from "@angular/core";
import { Categoria } from "src/app/models/categoria.models";
import { BusquedaService } from "src/app/services/busqueda.service";
import { CategoriasService } from "src/app/services/categorias.service";
import { ModalImagenService } from "src/app/services/modal-imagen.service";
import { UsuarioService } from "src/app/services/usuario.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-admincategorias',
  templateUrl: './admincategorias.component.html',
  styleUrls: ['./admincategorias.component.css']
})
export class AdmincategoriasComponent implements OnInit {
  public usuarioActual = this.usuarioService.usuarioActual;
  public categorias: Categoria[] = [];
  public usuario = this.usuarioService.usuarioActual.nombre;
  public imagenT: string = '';
  public cargando: boolean = true;
  public desde: number = 0;
  public totalCategorias: number = 0;

  public categoriaDB: any;

  constructor(

    private categoriasService: CategoriasService,
    public modalImagenService: ModalImagenService,
    private usuarioService: UsuarioService,
    private busquedasService: BusquedaService,
  ) { }

  ngOnInit() {
    this.cargarCategorias();
    this.modalImagenService.nuevaImagen.subscribe(img => this.cargarCategorias());

    this.usuarioService.validarToken().subscribe(resp => {     
      this.usuarioService.usuarioActual = this.usuarioActual;    

    })

  }

  buscarCategoria(termino: string) {  
    if (termino.length === 0) {
      return this.cargarCategorias();
    }
    this.categoriasService.buscarCategoria(termino)
      .subscribe((categorias: Categoria[]) => {
        this.categorias = categorias;
      }
      )
  }


  cargarCategorias() {
    this.cargando = true;
    this.categoriasService.cargarCaregorias(this.desde)
      .subscribe(resp => {
        this.totalCategorias = resp.total;
        this.categorias = resp.categorias;
        this.cargando = false;
      
      })
  }

  categoryExists(name: string): boolean {
    return this.categorias.some(category => category.nombre === name);
  }

  async agregarCategoria() {
    const { value = '' } = await Swal.fire<string>({
      title: 'Ingrese el nombre de la nueva categoria',
      input: 'text',
      inputLabel: 'Nombre de la categoria',
      inputPlaceholder: 'Nombre de la categoria',
      showCancelButton: true,
    })
    if (this.categoryExists(value)) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'La categoria ya existe!',
      })
    }
    if (value?.trim().length === 0) {
      return;
    }

    this.categoriasService.crearCategoria(value)
      .subscribe((resp: any) => {
        this.categorias.push(resp.categoria);
        Swal.fire('Creado', resp.categoria.nombre, 'success');
        Swal.fire({
          title: '¿Desea agregar una imagen a la categoria?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: `Si`,
          denyButtonText: `No`,
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            this.modalImagenService.abrirModal('categorias', resp.categoria._id);
          } else if (result.isDenied) {
            Swal.fire('No se agrego imagen', '', 'info')
          }
        })

        this.cargarCategorias();
      }

      )
  }

  editarCategoria(categoria: Categoria) {
    if (categoria.usuario?._id !== this.usuarioService.usuarioActual.uid) {
      Swal.fire('Error', 'No puede editar esta categoria,solo su categria es editable', 'error');
      return;
    }
    Swal.fire({
      title: 'Editar categoria',
      text: `Editar categoria ${categoria.nombre}`,
      input: 'text',
      inputValue: categoria.nombre,
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return 'Debe ingresar un nombre'

        }
        if (this.categoryExists(value)) {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'La categoria ya existe!',
          })
        }
        return null
      }
    }).then((value) => {
      if (value.isConfirmed) {
        this.categoriasService.actualizarCategoria(categoria._id, value.value)
          .subscribe(resp => {
            Swal.fire('Actualizado', categoria.nombre, 'success');
            this.cargarCategorias();
          })
      }
    });
  }


  guardarCategoria(nombre: string = this.categoriaDB.nombre) {

    this.categoriasService.crearCategoria(nombre)
      .subscribe((resp: any) => {
        this.categorias.push(resp.categoria);
        Swal.fire('Creado', resp.categoria.nombre, 'success');
        this.cargarCategorias();
      }
      )
  }



  eliminarCategoria(categoria: Categoria) {
    if (categoria.usuario?._id !== this.usuarioService.usuarioActual.uid) {
      Swal.fire('Error', 'No puede editar esta categoria,solo su categria es editable', 'error');
      return;
    }
    Swal.fire({
      title: '¿Borrar categoria?',
      text: `Esta a punto de borrar a ${categoria.nombre}`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borrar',
      cancelButtonText: 'No, cancelar',
    }).then((result) => {
      if (result.value) {
        this.categoriasService.borrarCategoria(categoria._id)
          .subscribe(resp => {
            this.cargarCategorias();
            Swal.fire(
              'Borrado!',
              `La categoria ${categoria.nombre} ha sido borrada`,
              'success'
            );
          })
      }
    });


  }

  abrirModal(categoria: Categoria) {
    if (categoria.usuario?._id !== this.usuarioService.usuarioActual.uid) {
      Swal.fire('Error', 'No puede editar esta categoria,solo su categria es editable', 'error');
      return;
    }
    this.modalImagenService.abrirModal('categorias', categoria._id, categoria.img);
  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalCategorias) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarCategorias();

  }

  cambiarEstado(categoria: Categoria) {
    if (categoria.usuario?._id !== this.usuarioService.usuarioActual.uid) {
      Swal.fire('Error', 'No puede editar esta categoria,solo su categria es editable', 'error');
      return;
    }

    if (categoria.nombre) {
      this.categoriasService.actualizarEstadoCategoria(categoria._id, categoria.estado, categoria.nombre)
        .subscribe(resp => {
          Swal.fire('Actualizado', categoria.nombre, 'success');
          this.cargarCategorias();
        })
    } else {
      // Manejar el caso cuando categoria.nombre es undefined
    }
  }


}