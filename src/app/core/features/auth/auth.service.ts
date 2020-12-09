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
        user:  {
      id: '9ff81042-1ff9-4090-b3a6-233ab43e0f98',
      first_name: 'Hamdi',
      last_name: 'Saka',
      email: 'hamdi.sakka@yopmail.com',
      is_active: true,
      created_at: '2020-12-05T20:15:31.746Z',
      updated_at: '2020-12-05T21:14:42.485Z',
      role: {
        id: '4aaf10b5-d8aa-4d35-98a8-5fb5fcba4da0',
        title: 'ADMIN'
      }
    },
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
