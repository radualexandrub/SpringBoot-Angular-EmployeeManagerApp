import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Employee } from 'src/app/employee';

@Component({
  selector: 'app-delete-employee-modal',
  templateUrl: './delete-employee-modal.component.html',
  styleUrls: ['./delete-employee-modal.component.css'],
})
export class DeleteEmployeeModalComponent implements OnInit {
  @Input() deleteEmployee: Employee | undefined;

  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {}

  public onDeleteEmployee(employeeId: number): void {
    this.appComponent.onDeleteEmployee(employeeId);
  }
}
