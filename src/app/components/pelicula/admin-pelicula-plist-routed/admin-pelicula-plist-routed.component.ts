import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PeliculaAjaxService } from 'src/app/service/pelicula.ajax.service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConfirmationService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';

import { Subject } from 'rxjs/internal/Subject';
@Component({
  selector: 'app-admin-pelicula-plist-routed',
  templateUrl: './admin-pelicula-plist-routed.component.html',
  styleUrls: ['./admin-pelicula-plist-routed.component.css']
})
export class AdminPeliculaPlistRoutedComponent implements OnInit {
  forceReload: Subject<boolean> = new Subject<boolean>();
  bLoading: boolean = false;

  constructor(
    private oPeliculaAjaxService: PeliculaAjaxService, // Ajusta esto al nombre real de tu servicio
    private oMatSnackBar: MatSnackBar,
    private oConfirmationService: ConfirmationService,

  ) { }

  ngOnInit() {
    // Código de inicialización si es necesario
  }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oPeliculaAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Ahora hay  " + oResponse + " peliculas mas", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error generando peliculas: " + oError.message, '', { duration: 2000 });
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
        this.oPeliculaAjaxService.empty().subscribe({
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
