import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http: HttpClient) {

   }
  
  public getUsersFromDb(): Observable<any> {
    return this._http.get('/api/userDb');
  }
}
