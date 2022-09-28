import { Component, OnInit } from '@angular/core';
import { AppComponent } from 'src/app/app.component';
import { Employee } from 'src/app/employee';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private appComponent: AppComponent) {}

  ngOnInit(): void {}

  onOpenModal(employee: Employee, mode: string): void {
    this.appComponent.onOpenModal(employee, mode);
  }

  searchEmployees(keyword: string): void {
    this.appComponent.searchEmployees(keyword);
  }
}
