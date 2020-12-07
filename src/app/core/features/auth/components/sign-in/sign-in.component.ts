import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import * as fromAuth from 'src/app/core/features/auth/store/auth.reducer';
import { AuthService } from '../../auth.service';
import * as AuthActions from '../../store/auth.actions';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  loginForm: FormGroup;
  emailControlMessage: string = 'Email is required';
  passwordControlMessage: string = 'Password is required';

  isLoading: boolean = false;


  constructor(
    private store: Store<fromAuth.AuthState>,
    private FB: FormBuilder,
    private authService: AuthService
  ) {
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.email, Validators.required]}),
      password: new FormControl('', {validators: [Validators.required, Validators.minLength(8)]})
    });
  }


  ngOnInit(): void {
  }

  


  onSubmit() {
    this.isLoading=true;
    this.store.dispatch(new AuthActions.Login(this.loginForm.value));
  }



}
