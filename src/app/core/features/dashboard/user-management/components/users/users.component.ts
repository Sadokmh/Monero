import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { takeWhile } from 'rxjs/operators';
import { UserState } from '../../store/reducer';
import * as userSelectors from '../../store/selectors';
import { UserManagementService } from '../../user-management.service';
import * as userActions from '../../store/actions';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
  @ViewChild('closeModal') closeModal: ElementRef | undefined;


  componentIsActive: boolean = true;
  users = [];
  selectedUser: any;
  roles = [];
  mode: string = 'create';

  form: FormGroup;

  constructor(
    private userService: UserManagementService,
    private store: Store<UserState>
  ) { 
    this.form = new FormGroup({
      first_name: new FormControl('', {validators: [Validators.required, Validators.minLength(3)]}),
      last_name: new FormControl('', {validators: [Validators.required, Validators.minLength(3)]}),
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]}),
      role: new FormControl('', {validators: [Validators.required]})
    });
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

    this.store.pipe(select(userSelectors.getRoles),
    takeWhile(() => this.componentIsActive))
    .subscribe((roles) => {
      this.roles = roles;
      console.log(this.roles);
    });
  }

  selectUser(user: any) {
    this.selectedUser = user;
    console.log(this.selectedUser);
    this.mode = 'edit';
    this.form.removeControl('password');
    this.form.removeControl('role');
    this.form.setValue({
      first_name: this.selectedUser.first_name,
      last_name: this.selectedUser.last_name,
      email: this.selectedUser.email,
    });
    console.log(this.form.value);
  }

  createUserModal() {
    this.mode = 'create';
    this.form.addControl('password', new FormControl('', {validators: [Validators.required, Validators.minLength(8)]}));
    this.form.addControl('role', new FormControl('', {validators: [Validators.required]}));
  }

  clearForm() {
    this.form.setValue({
      first_name: '',
      last_name: '',
      email: '',
    });
  }

  submitForm() {
    console.log(this.form.value);
    if (this.form.valid) {
      
      if (this.mode === 'edit') {
        const updatedUser = {
          ...this.form.value,
          id: this.selectedUser.id
        };
        this.updateUser(updatedUser);
      }
      else {
        this.addUser(this.form.value);
      }
      this.clearForm();
      this.closeModal.nativeElement.click();
    }
  }

  deleteUser(id: string) {
    this.store.dispatch(new userActions.DeleteUser(id));
  }

  updateUser(updatedUser: any) {
    console.log(updatedUser);
    this.store.dispatch(new userActions.UpdateUser(updatedUser));
  }

  changeUserStatus(user: any) {
    console.log(user);
    user = {
      ...user,
      is_active: !user.is_active
    };
    this.store.dispatch(new userActions.UpdateUser(user));
  }

  addUser(user: any) {
    this.store.dispatch(new userActions.AddUser(user));
  }



  ngOnDestroy() {
    this.componentIsActive = false;
  }

}
