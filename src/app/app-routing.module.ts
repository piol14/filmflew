
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//--
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
//--
//import { AdminClienteViewRoutedComponent } from './components/cliente/admin-cliente-view-routed/admin-cliente-view-routed.component';
import { AdminClientePlistRoutedComponent } from './components/cliente/admin-cliente-plist-routed/admin-cliente-plist-routed.component';
import { AdminClienteEditRoutedComponent } from './components/cliente/admin-cliente-edit-routed/admin-cliente-edit-routed.component';
import { AdminClienteNewRoutedComponent } from './components/cliente/admin-cliente-new-routed/admin-cliente-new-routed.component';
import { AdminPeliculaNewRoutedComponent } from './components/pelicula/admin-pelicula-new-routed/admin-pelicula-new-routed.component';
import { AdminReplyPlistRoutedComponent } from './components/alquiler/admin-reply-plist-routed/admin-reply-plist-routed.component';
import { AdminPeliculaPlistRoutedComponent } from './components/pelicula/admin-pelicula-plist-routed/admin-pelicula-plist-routed.component';
import { AdminAlquilerNewRoutedComponent } from './components/alquiler/admin-alquiler-new-routed/admin-alquiler-new-routed.component';
//--
import { AdminAlquilerEditRoutedComponent } from './components/alquiler/admin-alquiler-edit-routed/admin-alquiler-edit-routed.component';
import { AdminPeliculaEditRoutedComponent } from './components/pelicula/admin-pelicula-edit-routed/admin-pelicula-edit-routed.component';
import { AdminPeliculaViewRoutedComponent } from './components/pelicula/admin-pelicula-view-routed/admin-pelicula-view-routed.component';
import { AdminReplyViewRoutedComponent } from './components/alquiler/admin-reply-view-routed/admin-reply-view-routed.component';
import { AdminClienteViewRoutedComponent } from './components/cliente/admin-cliente-view-routed/admin-cliente-view-routed.component';
const routes: Routes = [
  { path: '', component: HomeRoutedComponent },
  { path: 'home', component: HomeRoutedComponent },
  //--
  { path: 'admin/cliente/plist', component: AdminClientePlistRoutedComponent },
  { path: 'admin/cliente/view/:id', component: AdminClienteViewRoutedComponent },    
  { path: 'admin/cliente/new', component: AdminClienteNewRoutedComponent },
  { path: 'admin/cliente/edit/:id', component: AdminClienteEditRoutedComponent },
  //--  
  { path: 'admin/pelicula/plist', component: AdminPeliculaPlistRoutedComponent},
  { path: 'admin/pelicula/view/:id', component: AdminPeliculaViewRoutedComponent },    
  { path: 'admin/pelicula/new', component: AdminPeliculaNewRoutedComponent },  
  { path: 'admin/pelicula/edit/:id', component: AdminPeliculaEditRoutedComponent },  
  //--
  { path: 'admin/reply/plist', component: AdminReplyPlistRoutedComponent },
  { path: 'admin/reply/view/:id', component: AdminReplyViewRoutedComponent },    
  { path: 'admin/reply/new', component: AdminAlquilerNewRoutedComponent},  
  { path: 'admin/reply/edit/:id', component: AdminAlquilerEditRoutedComponent},
  //--
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
