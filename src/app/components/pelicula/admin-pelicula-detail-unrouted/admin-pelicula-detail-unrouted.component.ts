import { Component, OnInit, Input, Optional } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPelicula } from 'src/app/model/model.interfaces';
import { PeliculaAjaxService } from 'src/app/service/pelicula.ajax.service.service';
 
@Component({
  selector: 'app-admin-pelicula-detail-unrouted',
  templateUrl: './admin-pelicula-detail-unrouted.component.html',
  styleUrls: ['./admin-pelicula-detail-unrouted.component.css']
})
export class AdminPeliculaDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oPelicula: IPelicula = {  } as IPelicula;
  status: HttpErrorResponse | null = null;

  constructor(
    private threadService: PeliculaAjaxService,
    @Optional() public ref: DynamicDialogRef,
    @Optional() public config: DynamicDialogConfig
  ) {
    if (config && config.data) {
      this.id = config.data.id;
    }
  }

  ngOnInit() {
    this.getOne();
  }

  getOne(): void {
    this.threadService.getOne(this.id).subscribe({
      next: (data: IPelicula) => {
        this.oPelicula = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }
}
