import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//--
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

//--
import { DialogService, DynamicDialogModule } from 'primeng/dynamicdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { PaginatorModule } from 'primeng/paginator';
//--
import { HomeRoutedComponent } from './components/shared/home-routed/home-routed.component';
import { MenuUnroutedComponent } from './components/shared/menu-unrouted/menu-unrouted.component';
//--

import { AdminAlquilerEditRoutedComponent } from './components/alquiler/admin-alquiler-edit-routed/admin-alquiler-edit-routed.component';
import { AdminPeliculaNewRoutedComponent } from './components/pelicula/admin-pelicula-new-routed/admin-pelicula-new-routed.component';
import {AdminAlquilerPlistRoutedComponent } from './components/alquiler/admin-alquiler-plist-routed/admin-alquiler-plist-routed.component';
import { AdminPeliculaPlistUnroutedComponent } from './components/pelicula/admin-pelicula-plist-unrouted/admin-pelicula-plist-unrouted.component';
import { AdminPeliculaDetailUnroutedComponent  } from './components/pelicula/admin-pelicula-detail-unrouted/admin-pelicula-detail-unrouted.component';
import { AdminAlquilerPlistUnroutedComponent } from './components/alquiler/admin-alquiler-plist-unrouted/admin-alquiler-plist-unrouted.component';
import { AdminPeliculaPlistRoutedComponent  } from './components/pelicula/admin-pelicula-plist-routed/admin-pelicula-plist-routed.component';

import { AdminAlquilerNewRoutedComponent } from './components/alquiler/admin-alquiler-new-routed/admin-alquiler-new-routed.component';
import { AdminAlquilerFormUnroutedComponent } from './components/alquiler/admin-alquiler-form-unrouted/admin-alquiler-form-unrouted.component';
import { AdminPeliculaViewRoutedComponent } from './components/pelicula/admin-pelicula-view-routed/admin-pelicula-view-routed.component';
import {  AdminPeliculaEditRoutedComponent } from './components/pelicula/admin-pelicula-edit-routed/admin-pelicula-edit-routed.component';
import { TrimPipe } from './pipes/trim.pipe.ts.pipe';
import { ClienteAjaxService } from './service/cliente.ajax.service.service';
import { AlquilerAjaxService } from './service/alquiler.ajax.service.service';
import { PeliculaAjaxService } from './service/pelicula.ajax.service.service';
import { AdminClienteDetailUnroutedComponent } from './components/cliente/admin-cliente-detail-unrouted/admin-cliente-detail-unrouted.component';
import { AdminClienteFormUnroutedComponent } from './components/cliente/admin-cliente-form-unrouted/admin-cliente-form-unrouted.component';
import { AdminClienteNewRoutedComponent } from './components/cliente/admin-cliente-new-routed/admin-cliente-new-routed.component';
import { AdminClientePlistUnroutedComponent } from './components/cliente/admin-cliente-plist-unrouted/admin-cliente-plist-unrouted.component';
import { AdminClientePlistRoutedComponent } from './components/cliente/admin-cliente-plist-routed/admin-cliente-plist-routed.component';
import { AdminClienteSelectionUnroutedComponent} from './components/cliente/admin-cliente-selection-unrouted/admin-cliente-selection-unrouted.component';
import { AdminClienteEditRoutedComponent } from './components/cliente/admin-cliente-edit-routed/admin-cliente-edit-routed.component';
import { AdminClienteViewRoutedComponent } from './components/cliente/admin-cliente-view-routed/admin-cliente-view-routed.component';
import { AdminPeliculaFormUnroutedComponent } from './components/pelicula/admin-pelicula-form-unrouted/admin-pelicula-form-unrouted.component';
import { AdminPeliculaSelectionUnroutedComponent } from './components/pelicula/admin-pelicula-selection-unrouted/admin-pelicula-selection-unrouted.component';
import { AdminAlquilerDetailUnroutedComponent } from './components/alquiler/admin-alquiler-detail-unrouted/admin-alquiler-detail-unrouted.component';
import { AdminAlquilerViewRoutedComponent } from './components/alquiler/admin-alquiler-view-routed/admin-alquiler-view-routed.component';
import { MatSelectModule } from '@angular/material/select';
import { FooterUnroutedComponent } from './components/shared/footer-unrouted/footer-unrouted.component';
import { SessionAjaxService } from './service/session.ajax.service.ts.service';
import { CryptoService } from './service/cripto.service';
import { LoginRoutedComponent } from './components/shared/login-routed/login-routed.component';
import { AuthInterceptor } from './components/interceptor/auth.interceptor';

@NgModule({
  declarations: [
    TrimPipe,
    AppComponent,
    HomeRoutedComponent,
    MenuUnroutedComponent,
    //--
    AdminClienteDetailUnroutedComponent,
    AdminClienteFormUnroutedComponent,
    AdminClienteNewRoutedComponent,
    AdminClientePlistUnroutedComponent, 
    AdminClientePlistRoutedComponent,
    AdminClienteSelectionUnroutedComponent,
    AdminClienteEditRoutedComponent,
    AdminClienteViewRoutedComponent,
    //--
    AdminPeliculaPlistRoutedComponent,
    AdminPeliculaViewRoutedComponent,
    AdminPeliculaNewRoutedComponent,
    AdminPeliculaEditRoutedComponent,
    AdminPeliculaPlistUnroutedComponent,
    AdminPeliculaDetailUnroutedComponent ,
    AdminPeliculaFormUnroutedComponent,
    AdminPeliculaSelectionUnroutedComponent,
    //--
    AdminAlquilerFormUnroutedComponent ,
    AdminAlquilerPlistRoutedComponent,
    AdminAlquilerViewRoutedComponent,
    AdminAlquilerNewRoutedComponent,
    AdminAlquilerEditRoutedComponent,
    AdminAlquilerPlistUnroutedComponent,
    AdminAlquilerDetailUnroutedComponent,
    //--
    LoginRoutedComponent,
    FooterUnroutedComponent
    
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    //--
    BrowserAnimationsModule,
    DynamicDialogModule,
    BrowserAnimationsModule,
    PaginatorModule,
    TableModule,
    ConfirmDialogModule,
    //--
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatRadioModule,
    MatFormFieldModule,
    MatSelectModule,
    ConfirmPopupModule
  ],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService,
    MatSnackBar,
    ClienteAjaxService,
    PeliculaAjaxService,
    AlquilerAjaxService,
    SessionAjaxService,
    CryptoService,
    
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    { provide: ConfirmationService, useClass: ConfirmationService },
{ provide: MatSnackBar, useClass: MatSnackBar },


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
