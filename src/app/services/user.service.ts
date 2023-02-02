import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private BASE_URL = 'http://localhost:5000/api/v1/users'

  private message!: string 


  constructor(private http: HttpClient) { }

  setMessage(message: string) {
    this.message = message
  }

  getMessage() {
    return this.message
  }

  getUser(id: string) {
    return this.http.get<User>(this.BASE_URL+'/'+id)
  }

  getUsers() {
    return this.http.get<User[]>(this.BASE_URL)
  }

  addUser(user: User) {
    return this.http.post<any>(this.BASE_URL +'/register', user)
  }

  updateUser(id:string, user: User) {
    return this.http.put<any>(this.BASE_URL+'/'+id, user)
  }

  deleteUser(id:string) {
    return this.http.delete<void>(this.BASE_URL+'/'+id)
  }

  login(email: string, password: string) {
    const requestHeader = {
      headers: new HttpHeaders(
       { "No-Auth": "True"}
      )
    }
    return this.http.post(`${this.BASE_URL}/login`, { email, password }, requestHeader)
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null
  }

  getToken() {
    return localStorage.getItem('token') || ''
  }

  userLoggedIn() {
    return localStorage.getItem('userId') || undefined
  }

}
