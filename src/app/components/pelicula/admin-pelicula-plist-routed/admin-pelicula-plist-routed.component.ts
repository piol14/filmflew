import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PeliculaAjaxService } from 'src/app/service/pelicula.ajax.service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-admin-pelicula-plist-routed',
  templateUrl: './admin-pelicula-plist-routed.component.html',
  styleUrls: ['./admin-pelicula-plist-routed.component.css']
})
export class AdminPeliculaPlistRoutedComponent implements OnInit {

  bLoading: boolean = false;

  constructor(
    private oPeliculaAjaxService: PeliculaAjaxService, // Ajusta esto al nombre real de tu servicio
    private oMatSnackBar: MatSnackBar
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
}
