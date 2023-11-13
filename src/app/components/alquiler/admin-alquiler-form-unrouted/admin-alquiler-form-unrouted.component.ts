import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IAlquiler, IPelicula, ICliente, formOperation } from 'src/app/model/model.interfaces';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminClienteSelectionUnroutedComponent } from '../../cliente/admin-cliente-selection-unrouted/admin-cliente-selection-unrouted.component';
import { AdminPeliculaSelectionUnroutedComponent } from '../../pelicula/admin-pelicula-selection-unrouted/admin-pelicula-selection-unrouted.component';
import { AlquilerAjaxService } from 'src/app/service/alquiler.ajax.service.service';

@Component({
  selector: 'app-admin-alquiler-form-unrouted',
  templateUrl: './admin-alquiler-form-unrouted.component.html',
  styleUrls: ['./admin-alquiler-form-unrouted.component.css']
})
export class AdminAlquilerFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; // new or edit

  alquilerForm!: FormGroup;
  oAlquiler: IAlquiler = {cliente: {}, pelicula: {}} as IAlquiler;
  status: HttpErrorResponse | null = null;

  oDynamicDialogRef: DynamicDialogRef | undefined;

  constructor(
    private alquilerService: AlquilerAjaxService,
    private formBuilder: FormBuilder,
    private router: Router,
    private matSnackBar: MatSnackBar,
    public dialogService: DialogService
  ) {
    this.initializeForm(this.oAlquiler);
  }

  initializeForm(alquiler: IAlquiler) {
    this.alquilerForm = this.formBuilder.group({
      id: [alquiler.id],
      fecha_alquiler: [alquiler.fecha_alquiler, [Validators.required]],
      fecha_devolucion: [alquiler.fecha_devolucion, [Validators.required]],
      cliente_id: this.formBuilder.group({
        id: [alquiler.cliente?.id]  // Check if cliente_id is defined before accessing id
      }),
      pelicula_id: this.formBuilder.group({
        id: [alquiler.pelicula?.id]  // Check if pelicula_id is defined before accessing id
      }),
    });
  }

  ngOnInit() {
    if (this.operation === 'EDIT') {
      this.alquilerService.getOne(this.id).subscribe({
        next: (data: IAlquiler) => {
          this.oAlquiler = data;
          this.initializeForm(this.oAlquiler);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.matSnackBar.open("Error reading alquiler from server.", '', { duration: 1200 });
        }
      });
    } else {
      this.initializeForm(this.oAlquiler);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    const control = this.alquilerForm.controls[controlName];
    return control ? control.hasError(errorName) : false;
  }
  

  onSubmit() {
    if (this.alquilerForm.valid) {
      if (this.operation === 'NEW') {
        this.alquilerService.createAlquiler(this.alquilerForm.value).subscribe({
          next: (data: IAlquiler) => {
            this.oAlquiler = data;
            this.initializeForm(this.oAlquiler);
            this.matSnackBar.open("Alquiler has been created.", '', { duration: 1200 });
            this.router.navigate(['/admin', 'alquiler', 'view', this.oAlquiler.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open("Can't create alquiler.", '', { duration: 1200 });
          }
        });
      } else {
        this.alquilerService.updateAlquiler(this.alquilerForm.value).subscribe({
          next: (data: IAlquiler) => {
            this.oAlquiler = data;
            this.initializeForm(this.oAlquiler);
            this.matSnackBar.open("Alquiler has been updated.", '', { duration: 1200 });
            this.router.navigate(['/admin', 'alquiler', 'view', this.oAlquiler.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open("Can't update alquiler.", '', { duration: 1200 });
          }
        });
      }
    }
  }

  onShowUsersSelection() {
    this.oDynamicDialogRef = this.dialogService.open(AdminClienteSelectionUnroutedComponent, {
      header: 'Select a User',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.oDynamicDialogRef.onClose.subscribe((oUser: ICliente) => {
      if (oUser) {
        this.oAlquiler.cliente = oUser;
        this.alquilerForm.controls['cliente_id'].patchValue({ id: oUser.id });
      }
    });
  }

  onShowPeliculaSelection() {
    this.oDynamicDialogRef = this.dialogService.open(AdminPeliculaSelectionUnroutedComponent, {
      header: 'Select a Pelicula',
      width: '80%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.oDynamicDialogRef.onClose.subscribe((oPelicula: IPelicula) => {
      if (oPelicula) {
        this.oAlquiler.pelicula = oPelicula;
        this.alquilerForm.controls['pelicula_id'].patchValue({ id: oPelicula.id });
      }
    });
  }
}
