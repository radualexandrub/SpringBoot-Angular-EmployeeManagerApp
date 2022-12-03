import { Component, Injectable, OnInit } from '@angular/core';
import { Employee } from 'src/app/employee';
import { EmployeesComponent } from '../employees/employees.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  constructor(private employeesComponent: EmployeesComponent) {}

  ngOnInit(): void {
    if (localStorage.getItem('theme') === null) {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
    } else if (localStorage.getItem('theme') === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }

  onToggleDarkTheme(): void {
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'light') {
      localStorage.setItem('theme', 'dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      localStorage.setItem('theme', 'light');
      document.documentElement.setAttribute('data-theme', 'light');
    }
  }

  onOpenModal(employee: Employee, mode: string): void {
    this.employeesComponent.onOpenModal(employee, mode);
  }

  searchEmployees(keyword: string): void {
    this.employeesComponent.searchEmployees(keyword);
  }
}
