import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private Base_Url = 'http://localhost:5000'
  constructor(private _http: HttpClient) { }



  GetUser(): Observable<any> {
    return this._http.get(`${this.Base_Url}/user/Userlist`)
  }



  userLogin(email: string, password: string): Observable<any> {
    return this._http.post(`${this.Base_Url}/user/login`, { email, password });
  }



  Register(data: any): Observable<any> {
    return this._http.post(`${this.Base_Url}/user/Newuser`, data)
  }

  Permission(userId: string, data: any): Observable<any> {
    return this._http.put(`${this.Base_Url}/user/permissionAprove?userId=${userId}`, data);
  }


  UserViewById(UserId: any): Observable<any> {
    return this._http.get(`${this.Base_Url}/user/UserViewById?UserId=${UserId}`)
  }


  UserDeleteById(UserId: any): Observable<any> {
    return this._http.delete(`${this.Base_Url}/user/deleteUserById?UserId=${UserId}`)
  }
}
