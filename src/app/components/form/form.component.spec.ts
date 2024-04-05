import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { EmployeesService } from '../../services/employees.service';
import { of } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

describe('FormComponent', () => {
  let component: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let employeesServiceSpy: jasmine.SpyObj<EmployeesService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('EmployeesService', ['getEmployee']);

    await TestBed.configureTestingModule({
      declarations: [], // Agrega el componente al módulo de pruebas
      imports: [CommonModule, ReactiveFormsModule], // Agrega los módulos necesarios para el componente
      providers: [{ provide: EmployeesService, useValue: spy }],
    }).compileComponents();

    fixture = TestBed.createComponent(FormComponent);
    component = fixture.componentInstance;
    employeesServiceSpy = TestBed.inject(
      EmployeesService
    ) as jasmine.SpyObj<EmployeesService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getEmployee service method', () => {
    const dniNumber = 123456789; // Suponiendo un número de DNI válido

    // Establecer el valor del control del formulario
    component.applyForm.controls['dni'].setValue(dniNumber.toString());

    // Llamar al método submitSearch que debería llamar a getEmployee
    component.submitSearch();

    // Verificar que el método del servicio se llamó con el número de DNI correcto
    expect(employeesServiceSpy.getEmployee).toHaveBeenCalledWith(dniNumber);
  });

  it('should set data.showInfo to true if employee exists', () => {
    const dniNumber = 123456789; // Suponiendo un número de DNI válido
    const employeeData = { name: 'John Doe', id: 123, birday: '1990-01-01' };

    component.applyForm.controls['dni'].setValue(dniNumber.toString());

    employeesServiceSpy.getEmployee.and.returnValue(of(employeeData));

    component.submitSearch();

    expect(component.data.showInfo).toBe(true);
    expect(component.data).toEqual(employeeData);
  });

  it('should display alert if employee does not exist', () => {
    const dniNumber = 123456789; // Suponiendo un número de DNI válido

    component.applyForm.controls['dni'].setValue(dniNumber.toString());

    employeesServiceSpy.getEmployee.and.returnValue(of(false)); // Indica que el empleado no existe

    spyOn(window, 'alert'); // Espía la función de alerta

    component.submitSearch();

    expect(window.alert).toHaveBeenCalledWith('el empleado no existe'); // Verifica que se llamó a la alerta con el mensaje correcto
  });

  it('should reset the form', () => {
    const dniInput = component.applyForm.controls['dni'];
    dniInput.setValue('123456789'); // Establece un valor en el campo de DNI

    component.reset(); // Llama a la función reset

    expect(component.applyForm.value.dni).toEqual(''); // Comprueba que el valor del campo de DNI se haya restablecido a vacío
  });
});
