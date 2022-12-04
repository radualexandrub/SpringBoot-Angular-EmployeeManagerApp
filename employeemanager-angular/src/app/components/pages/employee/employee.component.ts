import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Employee } from 'src/app/employee';
import { EmployeeService } from 'src/app/services/employee.service';
import { EmployeesComponent } from '../../employees/employees.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employee!: Employee;
  employeeId!: number;

  constructor(
    private activatedRoute: ActivatedRoute,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.employeeId = Number(this.activatedRoute.snapshot.paramMap.get('id'));
    this.getEmployeeById(this.employeeId);
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
}
