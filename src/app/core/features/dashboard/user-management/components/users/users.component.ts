import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { UserState } from '../../store/reducer';
import * as userSelectors from '../../store/selectors';
import { UserManagementService } from '../../user-management.service';
import * as userActions from '../../store/actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from '../../models/User';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {


  componentIsActive: boolean = true;
  users : Array<User> = [];
  paginationConfig: any
  selectedUser: User = {
    id: '',
    first_name: '',
    last_name: '',
    is_active: false,
    role: {
      id: '',
      title: ''
    },
    email: ''
  };
  mode: string = 'create';


  constructor(
    private userService: UserManagementService,
    private store: Store<UserState>
  ) { 
    
  }

  ngOnInit(): void {

    this.store.dispatch(new userActions.GetUsers());
    this.store.dispatch(new userActions.GetRoles());

    this.store.pipe(select(userSelectors.getUsers),
    takeWhile(() => this.componentIsActive))
    .subscribe((users) => {
      this.users = users;
      console.log(this.users);
    });

    this.store.pipe(select(userSelectors.getUsersPaginationConfig),
    takeWhile(() => this.componentIsActive))
    .subscribe((paginationConfig) => {
      this.paginationConfig = paginationConfig;
      console.log(this.paginationConfig);
    });

    
  }

  selectUser(user: User) {
    this.store.dispatch(new userActions.SelectUser(user));
  }

  createUserModal() {
    
  }

  changeUserStatus(user: User) {
    console.log(user);
    user = {
      ...user,
      is_active: !user.is_active
    };
    this.store.dispatch(new userActions.UpdateUser(user));
  }


  deleteUser(id: string) {
    this.store.dispatch(new userActions.DeleteUser(id));
  }


  ngOnDestroy() {
    this.componentIsActive = false;
  }

}
