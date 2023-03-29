import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserForm } from './../interfaces/user.interfaces';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  baseUrl: string;

  constructor(private _http: HttpClient) {
    this.baseUrl = 'https://libeeappserver-production.up.railway.app/form'; //AQUI DIRECCION A ENDPOINT PARA FORMULARIO
  }

  signUp(
    name: string,
    email: string,
    imSuper: string,
    iWorkAs: string
  ): Observable<any> {
    let user: UserForm = {
      name: name,
      email: email,
      soft: imSuper,
      hard: iWorkAs,
    };
    return this._http.post<any>(this.baseUrl, user);
  }
}
