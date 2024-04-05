import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesService } from '../../services/employees.service';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, EmployeeComponent, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  data: any = {
    showInfo: false,
  };
  /*   employee: employeeInterface[] = []; */

  constructor(private employeeService: EmployeesService) {}

  applyForm = new FormGroup({
    dni: new FormControl(''),
  });

  submitSearch() {
    if (
      this.applyForm.value.dni !== null &&
      this.applyForm.value.dni !== undefined
    ) {
      const dniNumberLength: number = this.applyForm.value.dni.trim().length;
      const dniNumber: number = parseInt(this.applyForm.value.dni.trim(), 10);

      if (isNaN(dniNumber)) {
        alert('Ingresa solo números');
      } else if (dniNumberLength < 5) {
        alert('Número inválido');
      } else {
        const employeeObservable = this.employeeService.getEmployee(dniNumber);
        if (employeeObservable) {
          employeeObservable.subscribe({
            next: (result) => {
              this.data = result;
              if (this.data == undefined || this.data === false) {
                alert('el empleado no existe');
                return;
              }
              this.data.showInfo = true;
            },
            error: (err) => {
              console.log(err);
            },
          });
        } else {
          alert('Error al obtener el empleado');
        }
      }
    }
  }

  reset() {
    this.applyForm.value.dni = '';
  }
}
