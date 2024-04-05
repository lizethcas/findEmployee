import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { data } from '../dat-mock';
import { employeeInterface } from '../interface/emploee.interface';

@Injectable({
  providedIn: 'root',
})

export class EmployeesService {
  getEmployee(dni: number): Observable<employeeInterface | false> {
    const employee = data.empleados.find((emp) => emp.dni === dni);

    return of(employee || false); // Devuelve el empleado encontrado o undefined si no se encuentra
  }
}
