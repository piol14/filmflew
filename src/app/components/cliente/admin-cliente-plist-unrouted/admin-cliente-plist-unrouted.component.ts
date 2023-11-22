import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Input } from '@angular/core';
import { ConfirmationService, ConfirmEventType } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { PaginatorState } from 'primeng/paginator';
import { IAlquiler, ICliente, IClientePage } from 'src/app/model/model.interfaces';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ClienteAjaxService } from 'src/app/service/cliente.ajax.service.service';
import { AdminClienteDetailUnroutedComponent } from '../admin-cliente-detail-unrouted/admin-cliente-detail-unrouted.component';
import { Subject } from 'rxjs/internal/Subject';

@Component({
  
  providers:[ConfirmationService],
  selector: 'app-admin-cliente-plist-unrouted',
  templateUrl: './admin-cliente-plist-unrouted.component.html',
  styleUrls: ['./admin-cliente-plist-unrouted.component.css']
})

export class AdminClientePlistUnroutedComponent implements OnInit {
  @Input() forceReload: Subject<boolean> = new Subject<boolean>();
  oPage: any = [];
  orderField: string = "id";
  orderDirection: string = "asc";
  oPaginatorState: PaginatorState = { first: 0, rows: 10, page: 0, pageCount: 0 };
  status: HttpErrorResponse | null = null;
  oClienteToRemove: ICliente | null = null;

  constructor(
    private oClienteAjaxService: ClienteAjaxService,
    private oHttpClient: HttpClient,
    public oDialogService: DialogService,
    private oCconfirmationService: ConfirmationService,
    private oMatSnackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getPage();
  }

  getPage(): void {
    this.oClienteAjaxService.getPage(this.oPaginatorState.rows, this.oPaginatorState.page, this.orderField, this.orderDirection).subscribe({
      next: (data: IClientePage) => {
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

  doView(u: ICliente) {
    this.ref = this.oDialogService.open(AdminClienteDetailUnroutedComponent, {
      data: {
        id: u.id
      },
      header: 'View of user',
      width: '50%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: false
    });
  }

  doRemove(u: ICliente) {
    this.oClienteToRemove = u;
    this.oCconfirmationService.confirm({
      accept: () => {
        this.oMatSnackBar.open("El cliente ha sido borrado .", '', { duration: 1200 });
        this.oClienteAjaxService.removeOne(this.oClienteToRemove?.id).subscribe({
          next: () => {
            this.getPage();
          },
          error: (error: HttpErrorResponse) => {
            this.oPage.error = error;
            this.status = error;
            this.oMatSnackBar.open("El cliente no se puede borrar", "", { duration: 1200 });
          }
        });
      },
      reject: (type: ConfirmEventType) => {
        this.oMatSnackBar.open("El cliente no ha sido borrado.", "", { duration: 1200 });
      }
    });
  }

}
