import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ICliente } from 'src/app/model/model.interfaces';
import { ClienteAjaxService } from '../../../service/cliente.ajax.service.service';

@Component({
  selector: 'app-admin-cliente-detail-unrouted',
  templateUrl: './admin-cliente-detail-unrouted.component.html',
  styleUrls: ['./admin-cliente-detail-unrouted.component.css']
})
export class AdminClienteDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oCliente: ICliente = {} as ICliente;
  status: HttpErrorResponse | null = null;

  constructor(
    private oUserAjaxService: ClienteAjaxService,
    @Optional() public ref:DynamicDialogRef,
    @Optional() public config:DynamicDialogConfig
  ) {     
    if (config){
      if (config.data){
        this.id = config.data.id;
      }
    }    
  }

  ngOnInit() {
    console.log(this.id);
    this.getOne();
  }

  getOne(): void {
    this.oUserAjaxService.getOne(this.id).subscribe({    
      next: (data: ICliente) => {
        this.oCliente = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })

  }

}
