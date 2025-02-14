import { NgSwitchCase } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable,inject } from '@angular/core'
import { map,Observable, throwError,tap, catchError } from 'rxjs'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL= 'http://localhost:3000';

  router = inject(Router);
  http = inject(HttpClient)

refreshToken():Observable<string> {
   const refreshToken = localStorage.getItem('refreshToken');
   //token + refreshToken

   if(!refreshToken){
    this.logOut();
    return throwError(() => new Error('No refresh token found'));
   }

 return this.http
 .post<{refreshToken: string}>(`${this.baseURL}/token`, {refreshToken})
 .pipe(
  map(response => response.refreshToken ),
  tap((newAccessToken) => {
  localStorage.setItem('token',newAccessToken);
}),catchError(error =>{
  this.logOut();
  return throwError(() =>  error)
 }))
 }

logOut() {
  localStorage.clear()
  this.router.navigate(['/login'])
}

  constructor() { }
}
