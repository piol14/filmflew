import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-cliente-edit-routed',
  templateUrl: './admin-cliente-edit-routed.component.html',
  styleUrls: ['./admin-cliente-edit-routed.component.css']
})
export class AdminClienteEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
