import { PeliculaAjaxService } from '../../../service/pelicula.ajax.service.service';
import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IPelicula, IPeliculaPage } from 'src/app/model/model.interfaces';
import { AdminPeliculaDetailUnroutedComponent } from '../admin-pelicula-detail-unrouted/admin-pelicula-detail-unrouted.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-pelicula-plist-unrouted',
  templateUrl: './admin-pelicula-plist-unrouted.component.html',
  styleUrls: ['./admin-pelicula-plist-unrouted.component.css']
})
export class AdminPeliculaPlistUnroutedComponent implements OnInit {
  oPage: any = [];
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oPeliculaToRemove: IPelicula | null = null;

  constructor(
    private peliculaAjaxService: PeliculaAjaxService,
    private oHttpClient: HttpClient,
    public oDialogService: DialogService,    
    private oConfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.peliculaAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IPeliculaPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.oPage.error = error;
        this.status = error;
      }
    })
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldOrder: string) {
    this.orderField = fieldOrder;
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
    }
    this.getPage();
  }

  ref: DynamicDialogRef | undefined;

  doView(pelicula: IPelicula) {
    this.ref = this.oDialogService.open(AdminPeliculaDetailUnroutedComponent, {
      data: {
        id: pelicula.id
      },
      header: 'Vista de la película',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(pelicula: IPelicula) {
    this.oPeliculaToRemove = pelicula;
    this.oConfirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar la película?',
      accept: () => {
        this.oMatSnackBar.open("La película ha sido eliminada.", '', { duration: 1200 });
        this.oHttpClient.delete("http://localhost:8083/pelicula/" + this.oPeliculaToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.oPage.error = error;
            this.status = error;
            this.oMatSnackBar.open("La película no ha sido eliminada.", "", { duration: 1200 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("La película no ha sido eliminada.", "", { duration: 1200 });
      }
    });
  }

}
