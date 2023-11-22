import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ICliente, formOperation } from 'src/app/model/model.interfaces';
import { ClienteAjaxService } from 'src/app/service/cliente.ajax.service.service';

@Component({
  selector: 'app-admin-cliente-form-unrouted',
  templateUrl: './admin-cliente-form-unrouted.component.html',
  styleUrls: ['./admin-cliente-form-unrouted.component.css']
})
export class AdminClienteFormUnroutedComponent implements OnInit {
  @Input() id: number = 1;
  @Input() operation: formOperation = 'NEW'; //new or edit

  clienteForm!: FormGroup;
  oCliente: ICliente = {} as ICliente;
  status: HttpErrorResponse | null = null;

  constructor(
    private oClienteAjaxservice: ClienteAjaxService,
    private oFormBuilder: FormBuilder,
    private oHttpClient: HttpClient,
    private oRouter: Router,
    private oMatSnackBar: MatSnackBar
  ) {
    this.initializeForm(this.oCliente);
  }

  initializeForm(oCliente: ICliente) {
    this.clienteForm = this.oFormBuilder.group({
      id: [oCliente.id],
     nombre: [oCliente.nombre, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      direccion: [oCliente.direccion, [Validators.required, Validators.minLength(3), Validators.maxLength(255)]],
      telefono: [oCliente.telefono, [Validators.maxLength(12), Validators.pattern('^[0-9]*$')]],
      username: [oCliente.username, [Validators.maxLength(50), Validators.minLength(3) ,Validators.required]],
     
      rol: [oCliente.rol, Validators.required]
    });
  }

  ngOnInit() {
    if (this.operation == 'EDIT') {
      this.oHttpClient.get<ICliente>("http://localhost:8083/cliente/" + this.id).subscribe({
        next: (data: ICliente) => {
          this.oCliente = data;
          this.initializeForm(this.oCliente);
        },
        error: (error: HttpErrorResponse) => {
          this.status = error;
          this.oMatSnackBar.open("Error al leer el cliente.", '', { duration: 1200 });
        }
      })
    } else {
      this.initializeForm(this.oCliente);
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.clienteForm.controls[controlName].hasError(errorName);
  }

  onSubmit() {
    if (this.clienteForm.valid) {
      if (this.operation == 'NEW') {
        this.oClienteAjaxservice.createCliente(this.clienteForm.value).subscribe({
          next: (data: ICliente) => {
            this.oCliente = data;
            this.initializeForm(this.oCliente);
            // avisar al usuario que se ha creado correctamente
            this.oMatSnackBar.open("El cliente ha sido creado.", '', { duration: 1200 });
            this.oRouter.navigate(['/admin', 'cliente', 'view', this.oCliente]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("No se puede crear el cliente.", '', { duration: 1200 });
          }
        })

      } else {
        this.oClienteAjaxservice.updateCliente(this.clienteForm.value).subscribe({
          next: (data: ICliente) => {
            this.oCliente = data;
            this.initializeForm(this.oCliente);
            // avisar al usuario que se ha actualizado correctamente
            this.oMatSnackBar.open("El cliente ha sido actualizado.", '', { duration: 1200 });
            this.oRouter.navigate(['/admin', 'cliente', 'view', this.oCliente.id]);
          },
          error: (error: HttpErrorResponse) => {
            this.status = error;
            this.oMatSnackBar.open("No se puede actualizar el cliente.", '', { duration: 1200 });
          }
        })
      }      
    }
  }

}
