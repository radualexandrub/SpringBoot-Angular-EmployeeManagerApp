import { Component, OnInit, Input } from '@angular/core';
import { Employee } from 'src/app/employee';
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-employee-card',
  templateUrl: './employee-card.component.html',
  styleUrls: ['./employee-card.component.css'],
})
export class EmployeeCardComponent implements OnInit {
  @Input() employee!: Employee;

  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {}

  onOpenModal(employee: Employee, mode: string): void {
    this.appComponent.onOpenModal(employee, mode);
  }
}
