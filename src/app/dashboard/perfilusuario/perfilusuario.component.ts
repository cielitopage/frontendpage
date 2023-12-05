import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { BusquedaService } from 'src/app/services/busqueda.service';
import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfilusuario',
  templateUrl: './perfilusuario.component.html',
  styleUrls: ['./perfilusuario.component.css']
})
export class PerfilusuarioComponent implements OnInit {
  public usuarioActual = this.usuarioService.usuarioActual;

  public usuario = this.usuarioService.usuarioActual.nombre;
  public totalUsuarios: number = 0;
  public desde: number = 0;
  public usuarios: any = [];
  public cargando: boolean = true;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private usuarioService: UsuarioService,
    private busquedasService: BusquedaService,
    private modalImagenService: ModalImagenService,

  ) { }

  ngOnInit(): void {
    this.getUsuarios();
    this.modalImagenService.nuevaImagen
      .subscribe(resp => {
      
        this.usuarioActual.img = resp;
        this.getUsuarios();
      });

    
      

  }

  abrirModal(usuario: UsuarioModel) {
 
    this.modalImagenService.abrirModal('usuarios', usuario.uid, usuario.img)  
  }

  getUsuarios() {
    this.usuarioService.getUsuarios(this.desde)
      .subscribe((resp: any) => {
        this.totalUsuarios = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });
  }

  

  cambiarRol(usuario: UsuarioModel) {
    if (usuario.uid === this.usuarioService.usuarioActual.uid) {
      Swal.fire('Error', 'No puede cambiarse el rol a si mismo', 'error');
      return;
    }
 
    this.usuarioService.actualizarRol(usuario)
      .subscribe(
        resp => {
          Swal.fire('Rol actualizado', usuario.nombre, 'success');

        }
      )

  }

  cambiarEstado(usuario: UsuarioModel) {
    if (usuario.uid === this.usuarioService.usuarioActual.uid) {
      Swal.fire('Error', 'No puede cambiarse el estado a si mismo', 'error');
      return;
    }

    console.log(usuario);
    this.usuarioService.actualizarEstado(usuario)
      .subscribe(
        resp => {
          Swal.fire('Estado actualizado', usuario.nombre, 'success');

        }
      )

  }

  cambiarDesde(valor: number) {
    const desde = this.desde + valor;
    console.log(desde);

    if (desde >= this.totalUsuarios) {
      return;
    }

    if (desde < 0) {
      return;
    }

    this.desde += valor;
    this.getUsuarios();
  
  }


  buscar(termino: string) {
    console.log(termino);
    if (termino.length === 0) {
      return this.getUsuarios();
    }
    this.busquedasService.buscar(termino)
      .subscribe(resp => {

        this.totalUsuarios = resp.usuarios.length;
        this.usuarios = resp.usuarios;
        this.cargando = false;
        this.usuario = this.usuarioService.usuarioActual.nombre;
        console.log(resp.usuarios);
      }
      );
  }



}
