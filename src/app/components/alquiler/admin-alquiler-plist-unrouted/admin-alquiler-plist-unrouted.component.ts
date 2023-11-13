import { AlquilerAjaxService } from '../../../service/alquiler.ajax.service.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';

import { AdminAlquilerDetailUnroutedComponent } from '../admin-alquiler-detail-unrouted/admin-alquiler-detail-unrouted.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAlquiler, IAlquilerPage } from '../../../model/model.interfaces';


@Component({
  selector: 'app-admin-alquiler-plist-unrouted',
  templateUrl: './admin-alquiler-plist-unrouted.component.html',
  styleUrls: ['./admin-alquiler-plist-unrouted.component.css']
})

export class AdminAlquilerPlistUnroutedComponent implements OnInit {

  oPage: any = [];
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oAlquilerToRemove: IAlquiler | null = null;

  constructor(
    private alquilerService: AlquilerAjaxService,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.alquilerService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection)
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
    if (this.orderDirection == "asc") {
      this.orderDirection = "desc";
    } else {
      this.orderDirection = "asc";
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
 
  doRemove(u: IAlquiler) {
    this.oAlquilerToRemove = u;
    this.oCconfirmationService.confirm({
      accept: () => {
        if (this.oAlquilerToRemove) {
          this.oMatSnackBar.open("The reply has been removed.", '', { duration: 1200 });
          this.alquilerService.removeOne(this.oAlquilerToRemove.id).subscribe({
            next: () => {
              this.getPage();
            },
            error: (error: HttpErrorResponse) => {
              this.status = error;
              this.oMatSnackBar.open("The reply hasn't been removed.", "", { duration: 1200 });
            }
          });
        }
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("The reply hasn't been removed.", "", { duration: 1200 });
      }
    });
  }
}
