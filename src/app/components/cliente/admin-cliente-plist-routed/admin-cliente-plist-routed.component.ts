import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { Subject } from 'rxjs';
import { ClienteAjaxService } from 'src/app/service/cliente.ajax.service.service';

@Component({
  providers:[ConfirmationService],
  selector: 'app-admin-cliente-plist-routed',
  templateUrl: './admin-cliente-plist-routed.component.html',
  styleUrls: ['./admin-cliente-plist-routed.component.css']
})
export class AdminClientePlistRoutedComponent implements OnInit {
   forceReload: Subject<boolean> = new Subject<boolean>();
  
  bLoading: boolean = false;

  constructor(
    private oActivatedRoute: ActivatedRoute,
    private oClienteAjaxService: ClienteAjaxService,
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Código de inicialización si es necesario
  }

  doGenerateRandom(amount: number) {
    this.bLoading = true;
    this.oClienteAjaxService.generateRandom(amount).subscribe({
      next: (oResponse: number) => {
        this.oMatSnackBar.open("Ahora hay " + oResponse + " clientes", '', { duration: 2000 });
        this.bLoading = false;
      },
      error: (oError: HttpErrorResponse) => {
        this.oMatSnackBar.open("Error generando clientes aleatorios: " + oError.message, '', { duration: 2000 });
        this.bLoading = false;
      },
    });
  }
  doEmpty($event: Event) {
    this.oConfirmationService.confirm({
      target: $event.target as EventTarget, 
      message: 'Estas seguro que quieres eliminar todos los clientes? ',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.oClienteAjaxService.empty().subscribe({
          next: (oResponse: number) => {
            this.oMatSnackBar.open("Ahora hay " + oResponse + " cliente", '', { duration: 2000 });
            this.bLoading = false;
            this.forceReload.next(true);
          },
          error: (oError: HttpErrorResponse) => {
            this.oMatSnackBar.open("Error eliminando clientes: " + oError.message, '', { duration: 2000 });
            this.bLoading = false;
          },
        })
      },
      reject: () => {
        this.oMatSnackBar.open("Vaciado eliminado!", '', { duration: 2000 });
      }
    });
  }
  

}
