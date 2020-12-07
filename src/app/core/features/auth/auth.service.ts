import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { API_URL } from '../../config/api.config';
import { AuthState } from './store/auth.reducer';
import * as authActions from './store/auth.actions';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
    private store: Store<AuthState>,
    private router: Router
  ) { }

  login(requestData: {email: string, password: string}) {
    return this.httpClient.post(`${API_URL}/auth/signin`, requestData);
  }

  register(requestData: any) {
    return this.httpClient.post(`${API_URL}/auth/signup`, requestData);
  }

  checkLoginStatus() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');
    if (!token || !user) {
      return false;
    }
    return true;
  }

  autoLogin() {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user') || '';
    if (token || user) {
      const autoLoginData = {
        user: JSON.parse(user),
        token
      }
      this.store.dispatch(new authActions.AutoLogin(autoLoginData))
    }
  }

  logout () {
    localStorage.clear();
    this.store.dispatch(new authActions.Logout());
    this.router.navigate(['/auth/signin']);
  }

  getToken() {
    return localStorage.getItem('token') || '';
  }
}
