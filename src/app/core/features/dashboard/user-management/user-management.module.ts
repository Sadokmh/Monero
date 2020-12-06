import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { UsersComponent } from './components/users/users.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [UsersComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    UserManagementRoutingModule
  ]
})
export class UserManagementModule { }
