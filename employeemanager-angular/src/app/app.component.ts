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
  public editEmployee!: Employee | undefined;
  public deleteEmployee!: Employee | undefined;

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  public getEmployees(): void {
    const methodName = 'getEmployees() ';
    this.employeeService.getEmployees().subscribe(
      (response: Employee[]) => {
        this.employees = response;
        console.debug(
          methodName +
            'Response Received. Showing first two objects: ' +
            JSON.stringify(response.slice(0, 2))
        );
      },
      (error: HttpErrorResponse) => {
        console.error(methodName + error.message);
      }
    );
  }

  public onOpenModal(employee: Employee, mode: string): void {
    const container = document.getElementById('main-container');
    const button = document.createElement('button');
    button.type = 'button';
    button.style.display = 'none';
    button.setAttribute('data-toggle', 'modal');

    if (mode == 'add') {
      button.setAttribute('data-target', '#addEmployeeModal');
    }
    if (mode == 'edit') {
      this.editEmployee = employee;
      button.setAttribute('data-target', '#editEmployeeModal');
    }
    if (mode == 'delete') {
      this.deleteEmployee = employee;
      button.setAttribute('data-target', '#deleteEmployeeModal');
    }

    container?.appendChild(button);
    button.click();
    button.remove();
  }

  public onAddEmployee(addForm: NgForm): void {
    const methodName = 'onAddEmployee() ';
    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee) => {
        console.debug(
          methodName + 'Response Received: ' + JSON.stringify(response)
        );
        this.getEmployees();
        document.getElementById('add-employee-form-close')?.click();
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.error(methodName + error.message);
      }
    );
  }

  public onUpdateEmployee(employee: Employee): void {
    const methodName = 'onUpdateEmployee() ';
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.debug(
          methodName + 'Response Received: ' + JSON.stringify(response)
        );
        this.getEmployees();
        document.getElementById('edit-employee-form-close')?.click();
      },
      (error: HttpErrorResponse) => {
        console.error(methodName + error.message);
      }
    );
  }

  public onDeleteEmployee(employeeId: number): void {
    const methodName = 'onDeleteEmployee() ';
    this.employeeService.deleteEmployee(employeeId).subscribe(
      (response: void) => {
        console.debug(
          methodName + 'Response Received: ' + JSON.stringify(response)
        );
        this.getEmployees();
        document.getElementById('delete-employee-form-close')?.click();
      },
      (error: HttpErrorResponse) => {
        console.error(methodName + error.message);
      }
    );
  }
}
