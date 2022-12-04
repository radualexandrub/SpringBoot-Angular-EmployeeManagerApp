import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { EmployeesComponent } from '../../employees/employees.component';

@Component({
  selector: 'app-add-employee-modal',
  templateUrl: './add-employee-modal.component.html',
  styleUrls: ['./add-employee-modal.component.css'],
})
export class AddEmployeeModalComponent implements OnInit {
  constructor(private employeesComponent: EmployeesComponent) {}

  ngOnInit(): void {}

  public onAddEmployee(addForm: NgForm): void {
    this.employeesComponent.onAddEmployee(addForm);
  }
}
