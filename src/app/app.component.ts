import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FormComponent } from './components/form/form.component';
import { EmployeeComponent } from './components/employee/employee.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormComponent,EmployeeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'angular';
}
