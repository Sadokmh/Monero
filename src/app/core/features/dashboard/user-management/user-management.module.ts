import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { ModalCreateComponent } from './components/modal-create/modal-create.component';
import { ModalUpdateComponent } from './components/modal-update/modal-update.component';



@NgModule({
  declarations: [UsersComponent, ModalCreateComponent, ModalUpdateComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule, 
    FormsModule,
    RouterModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
