import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { UserState } from '../../store/reducer';
import * as userSelectors from '../../store/selectors';
import { UserManagementService } from '../../user-management.service';
import * as userActions from '../../store/actions';
import { takeWhile } from 'rxjs/operators';
import { Role } from '../../models/Role';
import { User } from '../../models/User';

@Component({
  selector: 'app-modal-create',
  templateUrl: './modal-create.component.html',
  styleUrls: ['./modal-create.component.scss']
})
export class ModalCreateComponent implements OnInit, OnDestroy {
  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  componentIsActive: boolean = true;
  roles : Array<Role> = [];
  form: FormGroup;

  constructor(
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
    this.store.pipe(select(userSelectors.getRoles),
    takeWhile(() => this.componentIsActive))
    .subscribe((roles) => {
      this.roles = roles;
      console.log(this.roles);
    });
  }

  submitForm() {
    console.log(this.form.value);
    if (this.form.valid) {
    
      this.addUser(this.form.value);
    
      this.clearForm();
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
    }
  }

  
  addUser(user: User) {
    this.store.dispatch(new userActions.AddUser(user));
  }

  clearForm() {
    this.form.setValue({
      first_name: '',
      last_name: '',
      email: '',
      role: '',
      password: ''
    });
  }

  ngOnDestroy(): void {
    this.componentIsActive = false;
  }

}
