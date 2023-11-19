import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AlquilerAjaxService } from 'src/app/service/alquiler.ajax.service.service';
 // Asumiendo que tienes un servicio AlquilerAjaxService

@Component({
  selector: 'app-admin-alquiler-plist-routed',
  templateUrl: './admin-alquiler-plist-routed.component.html',
  styleUrls: ['./admin-alquiler-plist-routed.component.css']
})
export class AdminAlquilerPlistRoutedComponent implements OnInit {
  bLoading: boolean = false;

  constructor(
    private oAlquilerAjaxService: AlquilerAjaxService, // Ajusta esto al nombre real de tu servicio
    private oMatSnackBar: MatSnackBar
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
}
