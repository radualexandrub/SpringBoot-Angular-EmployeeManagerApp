import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Employee } from './employee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  private apiServerUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  public getEmployees(): Observable<any> {
    const methodName = 'getEmployees() ';
    console.debug(methodName + 'Request Sent');
    return this.http.get<Employee[]>(`${this.apiServerUrl}/employee/all`);
  }

  public getEmployeeById(employeeId: number): Observable<Employee> {
    const methodName = 'getEmployeeById() ';
    console.debug(methodName + 'Request Sent: ' + employeeId);
    return this.http.get<Employee>(
      `${this.apiServerUrl}/employee/find/${employeeId}`
    );
  }

  public addEmployee(employee: Employee): Observable<Employee> {
    const methodName = 'addEmployee() ';
    console.debug(methodName + 'Request Sent: ' + JSON.stringify(employee));
    return this.http.post<Employee>(
      `${this.apiServerUrl}/employee/add`,
      employee
    );
  }

  public updateEmployee(employee: Employee): Observable<Employee> {
    const methodName = 'updateEmployee() ';
    console.debug(methodName + 'Request Sent: ' + JSON.stringify(employee));
    return this.http.put<Employee>(
      `${this.apiServerUrl}/employee/update`,
      employee
    );
  }

  public deleteEmployee(employeeId: number): Observable<void> {
    const methodName = 'deleteEmployee() ';
    console.debug(methodName + 'Request Sent: ' + employeeId);
    return this.http.delete<void>(
      `${this.apiServerUrl}/employee/delete/${employeeId}`
    );
  }
}
