import { Component, Input, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';

import { AdminAlquilerDetailUnroutedComponent } from '../admin-alquiler-detail-unrouted/admin-alquiler-detail-unrouted.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAlquiler, IAlquilerPage, ICliente, IPelicula } from '../../../model/model.interfaces';
import { ClienteAjaxService } from 'src/app/service/cliente.ajax.service.service';
import { PeliculaAjaxService } from 'src/app/service/pelicula.ajax.service.service';
import { AlquilerAjaxService } from '../../../service/alquiler.ajax.service.service';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  providers:[ConfirmationService],
  selector: 'app-admin-alquiler-plist-unrouted',
  templateUrl: './admin-alquiler-plist-unrouted.component.html',
  styleUrls: ['./admin-alquiler-plist-unrouted.component.css']
})
export class AdminAlquilerPlistUnroutedComponent implements OnInit {
   @Input ()forceReload: Subject<boolean> = new Subject<boolean>();
  oPage: any = [];
  orderField: string = 'id';
  orderDirection: string = 'asc';
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oAlquilerToRemove: IAlquiler | null = null;
  @Input() cliente_id: number = 0; // filter by cliente
  @Input() pelicula_id: number = 0; // filter by pelicula

  oCliente: ICliente | null = null; // data of user if id_user is set for filter
  oPelicula: IPelicula | null = null; // data of thread if id_thread is set for filter

  constructor(
    private alquilerService: AlquilerAjaxService,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar,
    private oClienteAjaxService: ClienteAjaxService,
    private oPeliculaAjaxService: PeliculaAjaxService,
    private oAlquilerAjaxService: AlquilerAjaxService
  ) {}

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.alquilerService
      .getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection)
      .subscribe({
        next: (data: IAlquilerPage) => {
          this.oPage = data;
          this.oPaginatorState.pageCount = data.totalPages;
          console.log(this.oPaginatorState);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
        }
      });
  }

  onPageChang(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldorder: string) {
    this.orderField = fieldorder;
    if (this.orderDirection == 'asc') {
      this.orderDirection = 'desc';
    } else {
      this.orderDirection = 'asc';
    }
    this.getPage();
  }

  ref: DynamicDialogRef | undefined;

  doView(u: IAlquiler) {
    this.ref = this.oDialogService.open(AdminAlquilerDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'View of reply',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  getCliente(): void {
    this.oClienteAjaxService.getOne(this.cliente_id).subscribe({
      next: (data: ICliente) => {
        this.oCliente = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

  getThread(): void {
    this.oPeliculaAjaxService.getOne(this.pelicula_id).subscribe({
      next: (data: IPelicula) => {
        this.oPelicula = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

  doRemove(u: IAlquiler) {
    this.oAlquilerToRemove = u;
    this.oCconfirmationService.confirm({
      accept: () => {
        if (this.oAlquilerToRemove) {
          this.oMatSnackBar.open('El alquiler ha sido eliminado.', '', { duration: 1200 });
          this.alquilerService.removeOne(this.oAlquilerToRemove.id).subscribe({
            next: () => {
              this.getPage();
            },
            error: (error: HttpErrorResponse) => {
              this.status = error;
              this.oMatSnackBar.open("El alquiler no puede ser eliminado.", '', { duration: 1200 });
            }
          });
        }
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("EL alquiler no ha sido eliminado.", '', { duration: 1200 });
      }
    });
  }
}
