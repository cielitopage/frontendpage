import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { Page404Component } from './pages/page404/page404.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { BreadcrumbdComponent } from './shared/breadcrumbd/breadcrumbd.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CarrouselComponent } from './shared/carrousel/carrousel.component';
import { TestimonialComponent } from './shared/testimonial/testimonial.component';
import { CallactionComponent } from './shared/callaction/callaction.component';
import { FacilitisComponent } from './shared/facilitis/facilitis.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AboutComponent } from './pages/about/about.component';
import { HomeComponent } from './pages/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { BannerComponent } from './shared/banner/banner.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartstatusComponent } from './shared/cartstatus/cartstatus.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import {MatButtonModule} from '@angular/material/button';
import { ChicosComponent } from './pages/chicos/chicos.component';
import { ChicasComponent } from './pages/chicas/chicas.component';
import { BebesComponent } from './pages/bebes/bebes.component';
import { BlogComponent } from './pages/blog/blog.component';
import { BanneroffComponent } from './shared/banneroff/banneroff.component';
import { Banner3x2Component } from './shared/banner3x2/banner3x2.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { ValidateComponent } from './pages/validate/validate.component';
import { AdminComponent } from './dashboard/admin/admin.component';
import { AdminusersComponent } from './dashboard/adminusers/adminusers.component';
import { AdmincategoriasComponent } from './dashboard/admincategorias/admincategorias.component';
import { AdminproductosComponent } from './dashboard/adminproductos/adminproductos.component';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { ResetpasswordconfirmComponent } from './pages/resetpasswordconfirm/resetpasswordconfirm.component';
import { PerfilusuarioComponent } from './dashboard/perfilusuario/perfilusuario.component';
import { HeaderadminComponent } from './shared/headeradmin/headeradmin.component';
import { ModalImagenComponent } from './shared/modal-imagen/modal-imagen.component';
import { ProductonuevoComponent } from './dashboard/productonuevo/productonuevo.component';
import { ProductoeditarComponent } from './dashboard/productoeditar/productoeditar.component';
import { EstadoPipePipe } from './estado-pipe.pipe';
import { BusquedasComponent } from './shared/busquedas/busquedas.component';
import { BusquedasresultComponent } from './pages/busquedasresult/busquedasresult.component';





@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    Page404Component,
    DashboardComponent,
    BreadcrumbdComponent,
    HeaderComponent,
    FooterComponent,
    CarrouselComponent,
    TestimonialComponent,
    CallactionComponent,
    FacilitisComponent,
    ContactComponent,
    AboutComponent,
    HomeComponent,
    BannerComponent,
    CartstatusComponent,
    ChicosComponent,
    ChicasComponent,
    BebesComponent,
    BlogComponent,
    BanneroffComponent,
    Banner3x2Component,
    LoaderComponent,
    ValidateComponent,
    AdminComponent,
    AdminusersComponent,
    AdmincategoriasComponent,
    AdminproductosComponent,
    ResetpasswordComponent,
    ResetpasswordconfirmComponent,
    PerfilusuarioComponent,
    HeaderadminComponent,
    ModalImagenComponent,
    ProductonuevoComponent,
    ProductoeditarComponent,
    EstadoPipePipe,
    BusquedasComponent,
    BusquedasresultComponent,  

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
