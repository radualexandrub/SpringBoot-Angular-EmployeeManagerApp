import { Component, OnInit, Input } from '@angular/core';
import { EmployeesComponent } from '../../employees/employees.component';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-delete-employee-modal',
  templateUrl: './delete-employee-modal.component.html',
  styleUrls: ['./delete-employee-modal.component.css'],
})
export class DeleteEmployeeModalComponent implements OnInit {
  @Input() deleteEmployee: Employee | undefined;

  constructor(private employeesComponent: EmployeesComponent) {}

  ngOnInit(): void {}

  public onDeleteEmployee(employeeId: number): void {
    this.employeesComponent.onDeleteEmployee(employeeId);
  }
}
