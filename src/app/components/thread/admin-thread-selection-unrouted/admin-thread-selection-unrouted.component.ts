import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IThreadPage, IThread } from 'src/app/model/model.interfaces';

@Component({
  selector: 'app-admin-thread-selection-unrouted',
  templateUrl: './admin-thread-selection-unrouted.component.html',
  styleUrls: ['./admin-thread-selection-unrouted.component.css']
})
export class AdminThreadSelectionUnroutedComponent implements OnInit {


  oPage: any = [];
  orderField: string = 'id';
  orderDirection: string = 'asc';
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oThreadToRemove: IThread | null = null;

  constructor(
    private oHttpClient: HttpClient,
    public oDialogService: DialogService,
    public oDynamicDialogRef: DynamicDialogRef
  ) {}

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oHttpClient.get<IThreadPage>('http://localhost:8085/thread' + '?size=' + this.oPaginatorState.rows + '&page=' + this.oPaginatorState.page + '&sort=' + this.orderField + ',' + this.orderDirection).subscribe({
      next: (data: IThreadPage) => {
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

  onSelectThread(thread: IThread) {
    this.oDynamicDialogRef.close(thread);
  }
}