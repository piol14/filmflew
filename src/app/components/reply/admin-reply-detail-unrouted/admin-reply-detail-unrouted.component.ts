import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IReply } from 'src/app/model/model.interfaces';

@Component({
  selector: 'app-admin-reply-detail-unrouted',
  templateUrl: './admin-reply-detail-unrouted.component.html',
  styleUrls: ['./admin-reply-detail-unrouted.component.css']
})
export class AdminReplyDetailUnroutedComponent implements OnInit {

  @Input() id: number = 1;

  oReply: IReply = {} as IReply;
  status: HttpErrorResponse | null = null;

  constructor(
    private oHttpClient: HttpClient,
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
    this.oHttpClient.get<IReply>("http://localhost:8085/reply/" + this.id).subscribe({
      next: (data: IReply) => {
        this.oReply = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }

    })

  }

}
