import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Salary } from '../models/salary';

@Injectable({
  providedIn: 'root',
})
export class SalaryService {
  private apiServerUrl = environment.apiBaseUrl + '/api/salaries';

  constructor(private http: HttpClient) {}

  public getSalaries(): Observable<any> {
    const methodName = 'getSalaries() ';
    console.debug(methodName + 'Request Sent');
    return this.http.get<Salary[]>(`${this.apiServerUrl}`);
  }

  public getSalariesByEmployeeId(employeeId: number): Observable<Salary[]> {
    const methodName = 'getSalariesByEmployeeId()';
    console.debug(`${methodName} Request sent: EmployeeId: ${employeeId}`);
    return this.http.get<Salary[]>(
      `${this.apiServerUrl}/employee/${employeeId}`
    );
  }

  public addSalary(salary: Salary): Observable<Salary> {
    const methodName = 'addSalary() ';
    console.debug(methodName + 'Request Sent: ' + JSON.stringify(salary));
    return this.http.post<Salary>(`${this.apiServerUrl}/new`, salary);
  }

  public updateSalary(salary: Salary): Observable<Salary> {
    const methodName = 'updateSalary() ';
    console.debug(methodName + 'Request Sent: ' + JSON.stringify(salary));
    return this.http.put<Salary>(`${this.apiServerUrl}/update`, salary);
  }

  public deleteSalary(salaryId: number): Observable<void> {
    const methodName = 'deleteSalary() ';
    console.debug(methodName + 'Request Sent: ' + salaryId);
    return this.http.delete<void>(`${this.apiServerUrl}/${salaryId}`);
  }
}
