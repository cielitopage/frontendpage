import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { Page404Component } from './pages/page404/page404.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { ChicosComponent } from './pages/chicos/chicos.component';
import { ChicasComponent } from './pages/chicas/chicas.component';
import { BebesComponent } from './pages/bebes/bebes.component';
import { BlogComponent } from './pages/blog/blog.component';
import { ValidateComponent } from './pages/validate/validate.component';


const routes : Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },  
  { path: '', component: HomeComponent , data: { title: 'Home' }}, 
  { path: 'home', component: HomeComponent , data: { title: 'Home' }},
  { path: 'about', component:AboutComponent, data: { title: 'About' }},
  { path: 'chicos', component:ChicosComponent, data: { title: 'Chicos' }},
  { path: 'chicas', component:ChicasComponent, data: { title: 'Chicas' }},
  { path: 'bebes', component:BebesComponent, data: { title: 'Bebes' }},
  { path: 'blog', component:BlogComponent, data: { title: 'Blog' }},
  { path: 'contact', component:ContactComponent, data: { title: 'Contact' }},
  { path: 'login', component:LoginComponent, data: { title: 'Login' }},
  { path: 'register', component:RegisterComponent, data: { title: 'Register' }},
  { path: 'user-actived/:token', component:ValidateComponent, data: { title: 'validate' }},
  { path: '**',component:Page404Component, data: { title: 'Page404' }}
];




@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
   
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
