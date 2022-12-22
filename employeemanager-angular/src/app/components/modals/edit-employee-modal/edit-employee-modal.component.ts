import { Component, OnInit, Input } from '@angular/core';
import { EmployeesComponent } from '../../employees/employees.component';
import { Employee } from 'src/app/models/employee';

@Component({
  selector: 'app-edit-employee-modal',
  templateUrl: './edit-employee-modal.component.html',
  styleUrls: ['./edit-employee-modal.component.css'],
})
export class EditEmployeeModalComponent implements OnInit {
  @Input() editEmployee!: Employee | undefined;

  constructor(private employeesComponent: EmployeesComponent) {}

  ngOnInit(): void {}

  public onUpdateEmployee(employee: Employee): void {
    this.employeesComponent.onUpdateEmployee(employee);
  }
}
