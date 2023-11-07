import { Component, OnInit, Input, Optional } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPelicula } from 'src/app/model/model.interfaces';
import { ThreadAjaxService } from 'src/app/service/thread.ajax.service.service';
 
@Component({
  selector: 'app-admin-thread-detail-unrouted',
  templateUrl: './admin-thread-detail-unrouted.component.html',
  styleUrls: ['./admin-thread-detail-unrouted.component.css']
})
export class AdminThreadDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oThread: IPelicula = { user: {} } as IPelicula;
  status: HttpErrorResponse | null = null;

  constructor(
    private threadService: ThreadAjaxService,
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
        this.oThread = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }
}
