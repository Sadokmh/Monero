import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/config/api.config';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {

  constructor(private httpClient: HttpClient) { }

  getUsers() {
    return this.httpClient.get(`${API_URL}/users`);
  }

  getUserById(id: string) {
    return this.httpClient.get(`${API_URL}/users/${id}`);
  }

  addUser(requestData: any) {
    return this.httpClient.post(`${API_URL}/users`, requestData);
  }

  updateUser(requestData: any) {
    return this.httpClient.patch(`${API_URL}/users/${requestData.id}`, requestData);
  };

  deleteUser(id: string) {
    return this.httpClient.delete(`${API_URL}/users/${id}`);
  }

  getRoles() {
    return this.httpClient.get(`${API_URL}/roles`);
  }
}
