import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface IReply {
  id:number;
  tittle:string;
  body:string;
  id_user:number;
  id_thread:number;
}

@Component({
  selector: 'app-admin-alquiler-view-routed',
  templateUrl: './admin-alquiler-view-routed.component.html',
  styleUrls: ['./admin-alquiler-view-routed.component.css']
})
export class AdminAlquilerViewRoutedComponent implements OnInit {

  id: number = 1;
  constructor(
    private oActivatedRoute: ActivatedRoute
  ) { 
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
