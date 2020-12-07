import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserState } from '../../store/reducer';
import * as userSelectors from '../../store/selectors';
import { UserManagementService } from '../../user-management.service';
import * as userActions from '../../store/actions';
import { takeWhile } from 'rxjs/operators';
import { select, Store } from '@ngrx/store';
import { User } from '../../models/User';

@Component({
  selector: 'app-modal-update',
  templateUrl: './modal-update.component.html',
  styleUrls: ['./modal-update.component.scss']
})
export class ModalUpdateComponent implements OnInit, OnDestroy {
  @ViewChild('closeModal') closeModal: ElementRef | undefined;

  componentIsActive: boolean = true;
  form: FormGroup;
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
  };;


  constructor(
    private store: Store<UserState>
  ) {
    this.form = new FormGroup({
      first_name: new FormControl('', {validators: [Validators.required, Validators.minLength(3)]}),
      last_name: new FormControl('', {validators: [Validators.required, Validators.minLength(3)]}),
      email: new FormControl('', {validators: [Validators.required, Validators.email]})
    });
   }

  ngOnInit(): void {
    this.store.pipe(select(userSelectors.getSelectedUser),
    takeWhile(() => this.componentIsActive))
    .subscribe((user) => {
      this.selectedUser = user;
      if (this.selectedUser) {
        this.form.setValue({
          first_name: this.selectedUser.first_name,
          last_name: this.selectedUser.last_name,
          email: this.selectedUser.email 
        });
      }
      console.log(this.selectedUser);
    });
  }

  updateUser(updatedUser: User) {
    console.log(updatedUser);
    this.store.dispatch(new userActions.UpdateUser(updatedUser));
    this.closeModal?.nativeElement.click;
  }

  submitForm() {
    console.log(this.form.value);
    if (this.form.valid) {
      const updatedUser: User = {
        ...this.form.value,
        id: this.selectedUser.id
      }
      this.updateUser(updatedUser);
    
      this.clearForm();
      if (this.closeModal) {
        this.closeModal.nativeElement.click();
      }
    }
  }

  clearForm() {
    this.form.setValue({
      first_name: '',
      last_name: '',
      email: '',
    });
  }


  ngOnDestroy(): void {
    this.componentIsActive = false;
  }

}
