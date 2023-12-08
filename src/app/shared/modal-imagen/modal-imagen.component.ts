import { Component, OnInit } from '@angular/core';

import { UsuarioModel } from 'src/app/models/usuario.model';
import { FileuploadService } from 'src/app/services/fileupload.service';


import { ModalImagenService } from 'src/app/services/modal-imagen.service';
import { UsuarioService } from 'src/app/services/usuario.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: ['./modal-imagen.component.css']
})
export class ModalImagenComponent implements OnInit {

  public usuarioActual = this.usuarioService.usuarioActual;
  public imagenactual = this.usuarioActual.img;

  public imagenSubir!: File;
  public imgUrl!: string;
  public usuario!: UsuarioModel;
  public imagenTemp: string | ArrayBuffer | null = null;

  constructor(
    public modalImagenService: ModalImagenService,
    private fileupladService: FileuploadService,
    private usuarioService: UsuarioService,

  ) {

  }

  ngOnInit(): void {

    this.usuarioService.validarToken().subscribe(resp => {
      console.log("resp", resp);
      this.usuarioService.usuarioActual = this.usuarioActual;
      console.log("this.usuarioActual", this.usuarioActual.emailVerified);
    })

  }



  ocultarModal() {
    this.imagenTemp = null;
    this.modalImagenService.cerrarModal();
  }


  cambiarImagen(event: any) {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    if (file.type.indexOf('image') < 0) {
      Swal.fire(
        {
          title: 'Error',
          text: 'El archivo seleccionado no es una imagen',
          icon: 'error',
          confirmButtonText: 'Aceptar',
          confirmButtonColor: '#3085d6',
          allowOutsideClick: false,
          allowEscapeKey: false
        })
      return;
    }
    this.imagenSubir = file;
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.imagenTemp = reader.result as string;

    };

  }



  subirImagen() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileupladService.fileUpload(this.imagenSubir, tipo, id)
      .then(img =>
        setTimeout(() => {
          this.modalImagenService.nuevaImagen.emit(img);
          this.usuarioActual.img = img;
          this.ocultarModal();
          Swal.fire('Actualizado', 'Imagen actualizada correctamente', 'success');
        }
          , 1000)
      )
      .catch(err => {
        console.log(err);

      });
  }

  subirImagen1() {
    const id = this.modalImagenService.id;
    const tipo = this.modalImagenService.tipo;

    this.fileupladService.fileUploadImagen1(this.imagenSubir, tipo, id)
      .then(img =>
        setTimeout(() => {
          this.modalImagenService.nuevaImagen.emit(img);
          this.usuarioActual.img = img;
          this.ocultarModal();
          Swal.fire('Actualizado', 'Imagen actualizada correctamente', 'success');
        }
          , 1000)
      )
      .catch(err => {
        console.log(err);

      });
  }



}