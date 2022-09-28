import { Component, OnInit, Input } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Employee } from 'src/app/employee';

@Component({
  selector: 'app-edit-employee-modal',
  templateUrl: './edit-employee-modal.component.html',
  styleUrls: ['./edit-employee-modal.component.css'],
})
export class EditEmployeeModalComponent implements OnInit {
  @Input() editEmployee!: Employee | undefined;

  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {}

  public onUpdateEmployee(employee: Employee): void {
    this.appComponent.onUpdateEmployee(employee);
  }
}
