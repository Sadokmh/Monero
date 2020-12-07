import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthState } from '../../../auth/store/auth.reducer';
import { getUser } from '../../../auth/store/auth.selectors';
import * as authSelectors from '../../../auth/store/auth.selectors';
import * as authActions from '../../../auth/store/auth.actions';
import { takeWhile } from 'rxjs/operators';
import { User } from '../../../auth/models/User.model';
import { AuthService } from '../../../auth/auth.service';


@Component({
  selector: 'app-navbar-dashboard',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  componentIsActive: boolean = true;
  connectedUser: any;

  constructor(
    private store: Store<AuthState>,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.store.pipe(select(authSelectors.getUser),
    takeWhile(() => this.componentIsActive))
    .subscribe(user => {
      console.log(user);
      
      this.connectedUser = user;
    })
  }

  logout(): void {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.componentIsActive = false;
  }

}
