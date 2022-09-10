import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'employeemanager-angular';
  public employees: Employee[] = [];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public onOpenModal(employee: Employee | null, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode == 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode == 'edit') {
      button.setAttribute('data-target', '#editEmployeeModal');
    }
    if (mode == 'delete') {
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();
    button.remove();
  }

  public onAddEmployee(addForm: NgForm): void {
    let methodName = 'onAddEmployee() ';
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.debug(
          methodName + 'Response Received: ' + JSON.stringify(response)
        );
        this.getEmployees();
        document.getElementById('add-employee-form-close')?.click();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
