import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '../../config/api.config';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient
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
}
