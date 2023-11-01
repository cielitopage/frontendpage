import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { Page404Component } from './pages/page404/page404.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


const routes : Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },  
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component:AboutComponent},
  { path: 'contact', component:ContactComponent},
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent},
  { path: '**',component:Page404Component}  
];




@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
   
  ],
  exports: [RouterModule]

})
export class AppRoutingModule { }
