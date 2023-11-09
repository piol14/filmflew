import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IAlquiler } from 'src/app/model/model.interfaces';
import { AlquilerAjaxService } from 'src/app/service/alquiler.ajax.service.service';


@Component({
  selector: 'app-admin-alquiler-detail-unrouted',
  templateUrl: './admin-alquiler-detail-unrouted.component.html',
  styleUrls: ['./admin-alquiler-detail-unrouted.component.css'],
  providers: [AlquilerAjaxService]
})
export class AdminAlquilerDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;
  oAlquiler: IAlquiler = {} as IAlquiler;
  status: HttpErrorResponse | null = null;

  constructor(
    private alquilerAjaxService: AlquilerAjaxService,
    @Optional() public config: DynamicDialogConfig
  ) {     
    if (config && config.data) {
      this.id = config.data.id;
    }
  }

  ngOnInit() {
    console.log(this.id);
    this.getOne();
  }                                      

  getOne(): void {
    this.alquilerAjaxService.getOne(this.id).subscribe({
      next: (data: IAlquiler) => {
        this.oAlquiler = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }
}
