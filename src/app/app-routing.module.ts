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
import { AdminComponent } from './dashboard/admin/admin.component';
import { authGuard } from './guards/auth.guard';
import { ResetpasswordComponent } from './pages/resetpassword/resetpassword.component';
import { ResetpasswordconfirmComponent } from './pages/resetpasswordconfirm/resetpasswordconfirm.component';
import { AdminusersComponent } from './dashboard/adminusers/adminusers.component';
import { PerfilusuarioComponent } from './dashboard/perfilusuario/perfilusuario.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { authGuardAdmin } from './guards/auth-admin.guard';
import { authGuardEmailVerified } from './guards/auth-email-verified.guard';
import { AdmincategoriasComponent } from './dashboard/admincategorias/admincategorias.component';
import { AdminproductosComponent } from './dashboard/adminproductos/adminproductos.component';
import { ProductonuevoComponent } from './dashboard/productonuevo/productonuevo.component';



const routes : Routes = [
  { path: '', redirectTo: '/', pathMatch: 'full' },  
  { path: '', component: HomeComponent , data: { title: 'Home' }}, 
  { path: 'home', component: HomeComponent , data: { title: 'Home' }},
  { path: 'about', component:AboutComponent, data: { title: 'About' }},
  { path: 'chicos', component:ChicosComponent, data: { title: 'Chicos' }},
  { path: 'chicas', component:ChicasComponent, data: { title: 'Chicas' }},
  { path: 'bebes', component:BebesComponent, data: { title: 'Bebes' }},
  { path: 'admin', component:DashboardComponent,canActivate: [authGuard,authGuardAdmin ], data: { title: 'Admin' }},//canActivate: [authGuard,authGuardAdmin ],
  { path: 'admin-categorias', component:AdmincategoriasComponent,canActivate: [authGuard,authGuardAdmin ], data: { title: 'Admin categorias' }},//canActivate: [authGuard,authGuardAdmin ],
  { path: 'admin-productos', component:AdminproductosComponent,canActivate: [authGuard,authGuardAdmin ], data: { title: 'Admin productos' }},//canActivate: [authGuard,authGuardAdmin ],
  { path: 'adminproductos/nuevo', component:ProductonuevoComponent,canActivate: [authGuard,authGuardAdmin ], data: { title: 'Crear productos' }},//canActivate: [authGuard,authGuardAdmin ],
  { path: 'perfil-usuario', component:PerfilusuarioComponent,canActivate: [authGuard,authGuardAdmin ], data: { title: 'Perfil Usuario' }},//canActivate: [authGuard,authGuardAdmin ],
  { path: 'admin-user', component:AdminusersComponent,canActivate: [authGuard], data: { title: 'Actualizar Perfil Usuario' }},
  { path: 'blog', component:BlogComponent, data: { title: 'Blog' }},
  { path: 'contact', component:ContactComponent, data: { title: 'Contact' }},
  { path: 'login', component:LoginComponent, data: { title: 'Login' }},
  { path: 'register', component:RegisterComponent, data: { title: 'Register' }},
  { path: 'user-actived/:token', component:ValidateComponent, data: { title: 'validate' }},
  { path: 'user-resetpassword/:token', component:ResetpasswordconfirmComponent, data: { title: 'Reset Password' }},
  { path: 'resetpassword', component:ResetpasswordComponent, data: { title: 'Reset Password' }},
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
