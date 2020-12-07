import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../../../auth/store/auth.reducer';
import { getUser } from '../../../auth/store/auth.selectors';
import * as authSelectors from '../../../auth/store/auth.selectors';
import * as authActions from '../../../auth/store/auth.actions';
import { takeWhile } from 'rxjs/operators';
import { User } from '../../../auth/models/User.model';


@Component({
  selector: 'app-navbar-dashboard',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  componentIsActive: boolean = true;
  connectedUser: any;

  constructor(
    private store: Store<AuthState>
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(authSelectors.getUser),
    takeWhile(() => this.componentIsActive))
    .subscribe(user => {
      this.connectedUser = user;
    })
  }

  logout(): void {
    this.store.dispatch(new authActions.Logout());
  }

  ngOnDestroy(): void {
    this.componentIsActive = false;
  }

}
