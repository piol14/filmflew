import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AdminClienteSelectionUnroutedComponent } from '../../cliente/admin-cliente-selection-unrouted/admin-cliente-selection-unrouted.component';
import { AdminPeliculaSelectionUnroutedComponent } from '../../pelicula/admin-pelicula-selection-unrouted/admin-pelicula-selection-unrouted.component';
import { AlquilerAjaxService } from 'src/app/service/alquiler.ajax.service.service';
import { IAlquiler, IPelicula, ICliente, formOperation } from 'src/app/model/model.interfaces';

@Component({
  selector: 'app-admin-alquiler-form-unrouted',
  templateUrl: './admin-alquiler-form-unrouted.component.html',
  styleUrls: ['./admin-alquiler-form-unrouted.component.css']
})
export class AdminAlquilerFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; // new or edit

  alquilerForm!: FormGroup;
  oAlquiler: IAlquiler = { cliente: {}, pelicula: {} } as IAlquiler;
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
      cliente: this.formBuilder.group({
        id: [alquiler.cliente?.id]
      }),
      pelicula: this.formBuilder.group({
        id: [alquiler.pelicula?.id]
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
      const formValues = this.alquilerForm.value;
      console.log('JSON payload:', JSON.stringify(formValues));

      if (this.operation === 'NEW') {
        this.alquilerService.createAlquiler(formValues).subscribe({
          next: (data: IAlquiler) => {
            this.oAlquiler = data;
            this.initializeForm(this.oAlquiler);
            this.matSnackBar.open("Alquiler has been created.", '', { duration: 1200 });
            this.router.navigate(['/admin', 'alquiler', 'view', this.oAlquiler.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.matSnackBar.open("Can't create alquiler.", '', { duration: 1200 });
            console.log(this.oAlquiler)
          }
        });
      } else {
        this.alquilerService.updateAlquiler(formValues).subscribe({
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
        this.alquilerForm.controls['cliente'].patchValue({ id: oUser.id });
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
        this.alquilerForm.controls['pelicula'].patchValue({ id: oPelicula.id });
      }
    });
  }
}
