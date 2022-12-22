import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { EmployeesComponent } from './components/employees/employees.component';
import { HeaderComponent } from './components/header/header.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { AddEmployeeModalComponent } from './components/modals/add-employee-modal/add-employee-modal.component';
import { EditEmployeeModalComponent } from './components/modals/edit-employee-modal/edit-employee-modal.component';
import { DeleteEmployeeModalComponent } from './components/modals/delete-employee-modal/delete-employee-modal.component';
import { FooterComponent } from './components/footer/footer.component';
import { AboutComponent } from './components/pages/about/about.component';
import { EmployeeComponent } from './components/pages/employee/employee.component';

const appRoutes: Routes = [
  { path: '', component: EmployeesComponent },
  { path: 'employee/:id', component: EmployeeComponent },
  { path: 'about', component: AboutComponent },
];
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    EmployeesComponent,
    EmployeeCardComponent,
    AddEmployeeModalComponent,
    EditEmployeeModalComponent,
    DeleteEmployeeModalComponent,
    FooterComponent,
    AboutComponent,
    EmployeeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
