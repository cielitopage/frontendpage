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
import { FormsModule } from '@angular/forms';
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
    Banner3x2Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
