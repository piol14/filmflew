// home-pelicula-list.component.ts

import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { PaginatorState } from 'primeng/paginator';

import { IPelicula, IPeliculaPage } from 'src/app/model/model.interfaces';
import { PeliculaAjaxService } from 'src/app/service/pelicula.ajax.service.service';
import { SessionAjaxService } from 'src/app/service/session.ajax.service.ts.service';

@Component({
  selector: 'app-pelicula-list',
  templateUrl: './home-routed.component.html',
  styleUrls: ['./home-routed.component.css']
})
export class HomeRoutedComponent implements OnInit {
  oPage: any = [];
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  strUserName: string = "";
  constructor(
    private peliculaAjaxService: PeliculaAjaxService,
    private sessionService: SessionAjaxService
  ) { }

  ngOnInit() {
    this.getPage();
    this.strUserName = this.sessionService.getUsername();
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
}
