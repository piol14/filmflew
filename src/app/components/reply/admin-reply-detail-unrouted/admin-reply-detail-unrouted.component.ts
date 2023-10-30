import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Optional } from '@angular/core';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IReply } from 'src/app/model/model.interfaces';
import { ReplyAjaxService } from 'src/app/service/reply.ajax.service.service';


@Component({
  selector: 'app-admin-reply-detail-unrouted',
  templateUrl: './admin-reply-detail-unrouted.component.html',
  styleUrls: ['./admin-reply-detail-unrouted.component.css'],
  providers: [ReplyAjaxService]
})
export class AdminReplyDetailUnroutedComponent implements OnInit {

  id: number = 1;
  oReply: IReply = {} as IReply;
  status: HttpErrorResponse | null = null;

  constructor(
    private replyAjaxService: ReplyAjaxService,
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
    this.replyAjaxService.getOne(this.id).subscribe({
      next: (data: IReply) => {
        this.oReply = data;
      },
      error: (error: HttpErrorResponse) => {
        this.status = error;
      }
    });
  }
}
