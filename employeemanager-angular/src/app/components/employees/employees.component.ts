import { Component, Injectable, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { Employee } from '../../models/employee';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css'],
})
@Injectable({ providedIn: 'any' })
export class EmployeesComponent implements OnInit {
  public employees: Employee[] = [];
  public employeesCopy: Employee[] = [];
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
        this.employeesCopy = response;
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

  public searchEmployees(keyword: string): void {
    const resultEmployees: Employee[] = [];
    const searchedText = keyword.toLowerCase();
    for (const employee of this.employeesCopy) {
      if (
        employee.name.toLowerCase().indexOf(searchedText) !== -1 ||
        employee.email.toLowerCase().indexOf(searchedText) !== -1 ||
        employee.phone.toLowerCase().indexOf(searchedText) !== -1 ||
        employee.jobTitle.toLowerCase().indexOf(searchedText) !== -1
      ) {
        resultEmployees.push(employee);
      }
    }
    this.employees = resultEmployees;

    // if input field for search is empty
    if (!searchedText) {
      this.employees = this.employeesCopy;
    }
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
