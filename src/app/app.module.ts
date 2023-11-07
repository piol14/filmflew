import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//--
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSnackBar } from '@angular/material/snack-bar';
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

import { AdminReplyEditRoutedComponent } from './components/reply/admin-reply-edit-routed/admin-reply-edit-routed.component';
import { AdminThreadNewRoutedComponent } from './components/thread/admin-thread-new-routed/admin-thread-new-routed.component';
import { AdminReplyPlistRoutedComponent } from './components/reply/admin-reply-plist-routed/admin-reply-plist-routed.component';
import { AdminThreadPlistUnroutedComponent } from './components/thread/admin-thread-plist-unrouted/admin-thread-plist-unrouted.component';
import { AdminThreadDetailUnroutedComponent } from './components/thread/admin-thread-detail-unrouted/admin-thread-detail-unrouted.component';
import { AdminReplyPlistUnroutedComponent } from './components/reply/admin-reply-plist-unrouted/admin-reply-plist-unrouted.component';
import { AdminReplyDetailUnroutedComponent } from './components/reply/admin-reply-detail-unrouted/admin-reply-detail-unrouted.component';
import { AdminThreadPlistRoutedComponent } from './components/thread/admin-thread-plist-routed/admin-thread-plist-routed.component';
import { AdminThreadFormUnroutedComponent } from './components/thread/admin-thread-form-unrouted/admin-thread-form-unrouted.component';
import { AdminReplyViewRoutedComponent } from './components/reply/admin-reply-view-routed/admin-reply-view-routed.component';
import { AdminReplyNewRoutedComponent } from './components/reply/admin-reply-new-routed/admin-reply-new-routed.component';
import { AdminReplyFormUnroutedComponent } from './components/reply/admin-reply-form-unrouted/admin-reply-form-unrouted.component';
import { AdminThreadViewRoutedComponent } from './components/thread/admin-thread-view-routed/admin-thread-view-routed.component';
import { AdminThreadEditRoutedComponent } from './components/thread/admin-thread-edit-routed/admin-thread-edit-routed.component';
import { TrimPipe } from './pipes/trim.pipe.ts.pipe';
import { ClienteAjaxService } from './service/cliente.ajax.service.service';
import { AdminThreadSelectionUnroutedComponent } from './components/thread/admin-thread-selection-unrouted/admin-thread-selection-unrouted.component';
import { ReplyAjaxService } from './service/reply.ajax.service.service';
import { ThreadAjaxService } from './service/thread.ajax.service.service';
import { AdminClienteDetailUnroutedComponent } from './components/cliente/admin-cliente-detail-unrouted/admin-cliente-detail-unrouted.component';
import { AdminClienteFormUnroutedComponent } from './components/cliente/admin-cliente-form-unrouted/admin-cliente-form-unrouted.component';
import { AdminClienteNewRoutedComponent } from './components/cliente/admin-cliente-new-routed/admin-cliente-new-routed.component';
import { AdminClientePlistUnroutedComponent } from './components/cliente/admin-cliente-plist-unrouted/admin-cliente-plist-unrouted.component';
import { AdminClientePlistRoutedComponent } from './components/cliente/admin-cliente-plist-routed/admin-cliente-plist-routed.component';
//--
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
    //--
    AdminThreadPlistRoutedComponent,
    AdminThreadViewRoutedComponent,
    AdminThreadNewRoutedComponent,
    AdminThreadEditRoutedComponent,
    AdminThreadPlistUnroutedComponent,
    AdminThreadDetailUnroutedComponent,
    AdminThreadFormUnroutedComponent,
    AdminThreadSelectionUnroutedComponent,
    //--
    AdminReplyPlistRoutedComponent,
    AdminReplyViewRoutedComponent,
    AdminReplyNewRoutedComponent,
    AdminReplyEditRoutedComponent,
    AdminReplyPlistUnroutedComponent,
    AdminReplyDetailUnroutedComponent,
    AdminReplyFormUnroutedComponent,
   
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

  ],
  providers: [
    MessageService,
    DialogService,
    ConfirmationService,
    MatSnackBar,
    ClienteAjaxService,
    ReplyAjaxService,
    ThreadAjaxService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
