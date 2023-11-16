import { ClienteAjaxService } from './../../../service/cliente.ajax.service.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICliente, SessionEvent } from 'src/app/model/model.interfaces';
import { SessionAjaxService } from 'src/app/service/session.ajax.service.ts.service';

import { NavigationEnd, Router } from '@angular/router';
import { AdminClienteDetailUnroutedComponent } from '../../cliente/admin-cliente-detail-unrouted/admin-cliente-detail-unrouted.component';

@Component({
  selector: 'app-menu-unrouted',
  templateUrl: './menu-unrouted.component.html',
  styleUrls: ['./menu-unrouted.component.css']
})
export class MenuUnroutedComponent implements OnInit {

  strUserName: string = "";
  oSessionUser: ICliente | null = null;
  strUrl: string = "";

  constructor(
    private oSessionService: SessionAjaxService,
    public oDialogService: DialogService,
    private oClienteAjaxService: ClienteAjaxService,
    private oRouter: Router
  ) {
    
    this.oRouter.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.strUrl = ev.url;
      }
    })
    
    this.strUserName = oSessionService.getUsername();
    this.oClienteAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
      next: (oUser: ICliente) => {
        this.oSessionUser = oUser;
      },
      error: (error: HttpErrorResponse) => {
        console.log(error);
      }
    });
  }

  ngOnInit() {
    this.oSessionService.on().subscribe({
      next: (data: SessionEvent) => {
        if (data.type == 'login') {
          this.strUserName = this.oSessionService.getUsername();
          this.oClienteAjaxService.getByUsername(this.oSessionService.getUsername()).subscribe({
            next: (oUser: ICliente) => {
              this.oSessionUser = oUser;
            },
            error: (error: HttpErrorResponse) => {
              console.log(error);
            }
          });
        }
        if (data.type == 'logout') {
          this.strUserName = "";
        }
      }
    });
  }

  doSessionUserView($event: Event) {
    if (this.oSessionUser) {
      let ref: DynamicDialogRef | undefined;
      ref = this.oDialogService.open(AdminClienteDetailUnroutedComponent, {
        data: {
          id: this.oSessionUser.id
        },
        header: 'View of user',
        width: '50%',
        contentStyle: { overflow: 'auto' },
        baseZIndex: 10000,
        maximizable: false
      });
    }
    return false;
    //$event.preventDefault
  }

}