import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { IPelicula, formOperation } from 'src/app/model/model.interfaces';
import { PeliculaAjaxService } from 'src/app/service/pelicula.ajax.service.service';

@Component({
  selector: 'app-admin-pelicula-form-unrouted',
  templateUrl: './admin-pelicula-form-unrouted.component.html',
  styleUrls: ['./admin-pelicula-form-unrouted.component.css']
})
export class AdminPeliculaFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  PeliculaForm!: FormGroup;
  oPelicula: IPelicula = {} as IPelicula;
  status: HttpErrorResponse | null = null;

  oDynamicDialogRef: DynamicDialogRef | undefined;

  constructor(
    private peliculaAjaxService: PeliculaAjaxService,
    private formBuilder: FormBuilder,
    private oHttpClient: HttpClient,
    private router: Router,
    private oMatSnackBar: MatSnackBar,
    public oDialogService: DialogService
  ) {
    this.initializeForm(this.oPelicula);
  }

  initializeForm(oPelicula: IPelicula) {
    this.PeliculaForm = this.formBuilder.group({
      id: [oPelicula.id],
      titulo: [oPelicula.titulo, [Validators.required, Validators.minLength(1), Validators.maxLength(2048)]],
      director: [oPelicula.director, [Validators.required]],
      duracion: [oPelicula.duracion, [Validators.required, Validators.min(0)]],
      genero: [oPelicula.genero, [Validators.required, Validators.minLength(1), Validators.maxLength(2048)]],
    precio: [oPelicula.precio, [Validators.required, Validators.minLength(1), Validators.maxLength(2048)]],
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.peliculaAjaxService.getOne(this.id).subscribe({
        next: (data: IPelicula) => {
          this.oPelicula = data;
          this.initializeForm(this.oPelicula);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error reading Pelicula from server.", '', { duration: 1200 });
        }
      })
    } else {
      this.initializeForm(this.oPelicula);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.PeliculaForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.PeliculaForm.valid) {
      if (this.operation === 'NEW') {
        this.peliculaAjaxService.createPelicula(this.PeliculaForm.value).subscribe({
          next: (data: IPelicula) => {
            this.oPelicula = {} as IPelicula;
            this.initializeForm(this.oPelicula); //el id se genera en el servidor
            this.oMatSnackBar.open('Pelicula has been created.', '', { duration: 1200 });
            this.router.navigate(['/admin', 'pelicula', 'view', data]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Failed to create Pelicula.', '', { duration: 1200 });
          }
        });
      } else {
        this.peliculaAjaxService.updatePelicula(this.PeliculaForm.value).subscribe({
          next: (data: IPelicula) => {
            this.oPelicula = data;
            this.initializeForm(this.oPelicula);
            this.oMatSnackBar.open('Pelicula has been updated.', '', { duration: 1200 });
            this.router.navigate(['/admin', 'pelicula', 'view', this.oPelicula.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open('Failed to update Pelicula.', '', { duration: 1200 });
          }
        });
      }
    }
  }
}
