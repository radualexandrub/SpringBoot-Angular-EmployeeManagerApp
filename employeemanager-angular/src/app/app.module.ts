import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { EmployeeCardComponent } from './components/employee-card/employee-card.component';
import { AddEmployeeModalComponent } from './components/modals/add-employee-modal/add-employee-modal.component';
import { EditEmployeeModalComponent } from './components/modals/edit-employee-modal/edit-employee-modal.component';
import { DeleteEmployeeModalComponent } from './components/modals/delete-employee-modal/delete-employee-modal.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, EmployeeCardComponent, AddEmployeeModalComponent, EditEmployeeModalComponent, DeleteEmployeeModalComponent],
  imports: [BrowserModule, HttpClientModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
