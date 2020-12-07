import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AuthService } from './core/features/auth/auth.service';
import { AuthState } from './core/features/auth/store/auth.reducer';
import * as authActions from './core/features/auth/store/auth.actions';
import * as authSelectors from './core/features/auth/store/auth.selectors';
import { takeWhile } from 'rxjs/operators';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {

  isLoggedIn: boolean = false;
  componentIsActive: boolean = true;
  
  constructor(private authService: AuthService, private store: Store<AuthState>) {

    this.authService.autoLogin()
       
  }

  ngOnInit() {
    this.store.pipe(select(authSelectors.getIsLoggedIn),
    takeWhile(() => this.componentIsActive))
    .subscribe((isLoggedIn: boolean) => {
      this.isLoggedIn = isLoggedIn;
    })
  }

  ngOnDestroy() {
    this.componentIsActive = false;
  }


}
