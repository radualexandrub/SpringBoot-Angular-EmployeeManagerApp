import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { Employee } from 'src/app/employee';

@Component({
  selector: 'app-add-employee-modal',
  templateUrl: './add-employee-modal.component.html',
  styleUrls: ['./add-employee-modal.component.css'],
})
export class AddEmployeeModalComponent implements OnInit {
  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {}

  public onAddEmployee(addForm: NgForm): void {
    this.appComponent.onAddEmployee(addForm);
  }
}
