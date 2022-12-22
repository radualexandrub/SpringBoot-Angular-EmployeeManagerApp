import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/models/employee';
import { EmployeesComponent } from '../employees/employees.component';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css'],
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee!: Employee;

  constructor(private employeesComponent: EmployeesComponent) {}

  ngOnInit(): void {}

  onOpenModal(employee: Employee, mode: string): void {
    this.employeesComponent.onOpenModal(employee, mode);
  }
}
