import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import * as fromAuth from 'src/app/core/features/auth/store/auth.reducer';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {

  form: FormGroup;

  constructor(
    private store: Store<fromAuth.AuthState>

  ) {
    this.form = new FormGroup({
      email: new FormControl(null, {validators: [Validators.email]}),
      password: new FormControl(null, {validators: [Validators.minLength(8)]})
    });
   }





  onSubmit() {
    
  }




  ngOnInit(): void {
  }

}
