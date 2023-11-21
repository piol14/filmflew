import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AlquilerAjaxService } from 'src/app/service/alquiler.ajax.service.service';
import { Subject } from 'rxjs/internal/Subject';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

 // Asumiendo que tienes un servicio AlquilerAjaxService

@Component({
  selector: 'app-admin-alquiler-plist-routed',
  templateUrl: './admin-alquiler-plist-routed.component.html',
  styleUrls: ['./admin-alquiler-plist-routed.component.css']
})
export class AdminAlquilerPlistRoutedComponent implements OnInit {
  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;


  constructor(
    private oAlquilerAjaxService: AlquilerAjaxService, // Ajusta esto al nombre real de tu servicio
    private oMatSnackBar: MatSnackBar,
    private oConfirmationService: ConfirmationService,
  ) { }

  ngOnInit() {
    // Código de inicialización si es necesario
  }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oAlquilerAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Ahora hay " + oResponse + " alquileres", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error generando alquileres: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    });
  }
  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget, 
      message: 'Are you sure that you want to remove all the replies?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.oAlquilerAjaxService.empty().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open("Now there are " + oResponse + " replies", '', { duration: 2000 });
            this.bLoading = false;
            this.forceReload.next(true);
          },
          error: (oError: HttpErrorResponse) => {
            this.oMatSnackBar.open("Error emptying replies: " + oError.message, '', { duration: 2000 });
            this.bLoading = false;
          },
        })
      },
      reject: () => {
        this.oMatSnackBar.open("Empty Cancelled!", '', { duration: 2000 });
      }
    });
  }
}
