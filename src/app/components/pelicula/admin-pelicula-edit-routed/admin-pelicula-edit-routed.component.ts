import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-pelicula-edit-routed',
  templateUrl: './admin-pelicula-edit-routed.component.html',
  styleUrls: ['./admin-pelicula-edit-routed.component.css']
})
export class AdminPeliculaEditRoutedComponent implements OnInit {

  id: number = 1;

  constructor(
    private oActivatedRoute: ActivatedRoute
  ) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
