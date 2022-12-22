import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { SalaryService } from 'src/app/services/salary.service';
import { Salary } from 'src/app/models/salary';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  public employee!: Employee;
  public employeeId!: number;
  public salaries: Salary[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService,
    private salaryService: SalaryService
  ) {}

  ngOnInit(): void {
    this.employeeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getEmployeeById(this.employeeId);
    this.getSalariesByEmployeeId(this.employeeId);
  }

  getEmployeeById(id: number): void {
    const methodName = 'getEmployeeById() ';
    this.employeeService.getEmployeeById(id).subscribe(
      (response: Employee) => {
        this.employee = response;
        console.debug(methodName + JSON.stringify(response));
      },
      (error: HttpErrorResponse) => {
        console.error(methodName + error.message);
      }
    );
  }

  onUpdateEmployeeFromPage(employee: Employee): void {
    const methodName = 'onUpdateEmployeeFromPage() ';
    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee) => {
        console.debug(
          methodName + 'Response Received: ' + JSON.stringify(response)
        );
        this.getEmployeeById(employee.id);
      },
      (error: HttpErrorResponse) => {
        console.error(methodName + error.message);
      }
    );
  }

  getSalariesByEmployeeId(employeeId: number): void {
    const methodName = 'getSalariesByEmployeeId() ';
    this.salaryService.getSalariesByEmployeeId(employeeId).subscribe(
      (response: Salary[]) => {
        this.salaries = response;
        console.debug(
          methodName + 'Response Received: ' + JSON.stringify(response)
        );
      },
      (error: HttpErrorResponse) => {
        console.error(methodName + error.message);
      }
    );
  }

  onAddEmployeeSalary(salaryForm: NgForm) {
    const methodName = 'onAddEmployeeSalary() ';
    // Manually append the employee object with employeeId property
    Object.assign(salaryForm.value, {
      employee: { id: this.employeeId },
    });

    this.salaryService.addSalary(salaryForm.value).subscribe(
      (response: Salary) => {
        console.debug(
          methodName + 'Response Received: ' + JSON.stringify(response)
        );
        this.getSalariesByEmployeeId(this.employeeId);
        salaryForm.reset();
      },
      (error: HttpErrorResponse) => {
        console.error(methodName + error.message);
      }
    );
  }

  onUpdateEmployeeSalaries(salaries: any): void {
    /* 
      Receive Salary properties starting with a number in front
      Example: 
      {
        "0_id": "2",
        "0_startDate": "2020-10-12",
        "0_endDate": "2022-10-13",
        "0_amount": "8008",
        "1_id": "3",
        "1_startDate": "2022-12-29",
        "1_endDate": "2023-01-05",
        "1_amount": "6000",
      }
      Group each set of Salary properties:
      [
          {
              "id": "2",
              "startDate": "2020-10-12",
              "endDate": "2022-10-13",
              "amount": "8008"
          },
          {
              "id": "3",
              "startDate": "2022-12-29",
              "endDate": "2023-01-05",
              "amount": "6000"
          }
      ]
    */
    const methodName = 'onUpdateSalary() ';
    let groupedSalaries: [];

    groupedSalaries = Object.entries(salaries).reduce(
      (accumulator: any, [key, value]: any) => {
        const [index, property] = key.split('_');
        // Check if object with given index exists
        // in accumulator, if not, create obj for that index
        if (!accumulator[index]) accumulator[index] = {};
        accumulator[index][property] = value;
        // Manually append the employee object with employeeId property
        Object.assign(accumulator[index], {
          employee: { id: this.employeeId },
        });
        return accumulator;
      },
      []
    );

    // Send each Salary Update Requests to REST API
    for (let salary of groupedSalaries) {
      this.salaryService.updateSalary(salary).subscribe(
        (response: Salary) => {
          console.debug(
            methodName + 'Response Received: ' + JSON.stringify(response)
          );
        },
        (error: HttpErrorResponse) => {
          console.error(methodName + error.message);
        }
      );
    }
  }

  onDeleteEmployeeSalary(salaryId: number) {
    const methodName = 'onDeleteSalaryById() ';
    this.salaryService.deleteSalary(salaryId).subscribe(
      (response: void) => {
        console.debug(
          methodName + 'Response Received: ' + JSON.stringify(response)
        );
        this.getSalariesByEmployeeId(this.employeeId);
      },
      (error: HttpErrorResponse) => {
        console.error(methodName + error.message);
      }
    );
  }
}
