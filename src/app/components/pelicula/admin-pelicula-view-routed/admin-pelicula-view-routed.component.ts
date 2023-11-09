import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface IThread {
  id: number;
  name: string;
  id_user: number;
}

@Component({
  selector: 'app-admin-pelicula-view-routed',
  templateUrl: './admin-pelicula-view-routed.component.html',
  styleUrls: ['./admin-pelicula-view-routed.component.css']
})
export class AdminPeliculaViewRoutedComponent implements OnInit {

  id: number = 1;

  constructor(private oActivatedRoute: ActivatedRoute) {
    this.id = parseInt(this.oActivatedRoute.snapshot.paramMap.get("id") || "1");
  }

  ngOnInit() {
  }

}
