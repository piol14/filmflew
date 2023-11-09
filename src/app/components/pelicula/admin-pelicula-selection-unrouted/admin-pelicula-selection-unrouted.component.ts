import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IPeliculaPage, IPelicula } from 'src/app/model/model.interfaces';
import { PeliculaAjaxService } from 'src/app/service/pelicula.ajax.service.service';

@Component({
  selector: 'app-admin-pelicula-selection-unrouted',
  templateUrl: './admin-pelicula-selection-unrouted.component.html',
  styleUrls: ['./admin-pelicula-selection-unrouted.component.css']
})
export class AdminPeliculaSelectionUnroutedComponent implements OnInit {


  oPage: any = [];
  orderField: string = 'id';
  orderDirection: string = 'asc';
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oPeliculaToRemove: IPelicula | null = null;
  
  constructor(
    private oHttpClient: HttpClient,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef,
   private peliculaayaxservice: PeliculaAjaxService
  ) {}

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.peliculaayaxservice.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IPeliculaPage) => {
        this.oPage = data;
        this.oPaginatorState.pageCount = data.totalPages;
        console.log(this.oPaginatorState);
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }

  onPageChange(event: PaginatorState) {
    this.oPaginatorState.rows = event.rows;
    this.oPaginatorState.page = event.page;
    this.getPage();
  }

  doOrder(fieldOrder: string) {
    this.orderField = fieldOrder;
    this.orderDirection = this.orderDirection === 'asc' ? 'desc' : 'asc';
    this.getPage();
  }

  onSelectPelicula(pelicula: IPelicula) {
    this.oDynamicDialogRef.close(pelicula);
  }
}