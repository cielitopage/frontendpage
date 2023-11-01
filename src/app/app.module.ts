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
    BannerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
