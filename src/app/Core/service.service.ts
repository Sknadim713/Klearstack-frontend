import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private Base_Url = environment.apiUrl
  // https://www.klearstackpractice.com/
  // baseUrl2 = "https://mlaapi.orisunlifescience.com/public/api";
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
  UpdateByid(userId: string, data: any): Observable<any> {
    return this._http.put(`${this.Base_Url}/user/UpdateUser/${userId}`, data);
  }


  UserViewById(UserId: any): Observable<any> {
    return this._http.get(`${this.Base_Url}/user/ViewAboutById?UserId=${UserId}`)
  }


  UserDeleteById(UserId: any): Observable<any> {
    return this._http.delete(`${this.Base_Url}/user/deleteUserById?UserId=${UserId}`)
  }




   getidlist(): Observable<any> {
    return this._http.get(`${this.Base_Url}/idverification/getidlist`)
  }

   getformcId(idcode: any): Observable<any> {
    return this._http.get(`${this.Base_Url}/idverification/getbyidcode/${idcode}`)
  }
}
