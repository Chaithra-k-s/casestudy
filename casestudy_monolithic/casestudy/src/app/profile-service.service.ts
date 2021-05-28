import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { admin } from './observables/admin';

@Injectable({
  providedIn: 'root'
})
export class ProfileServiceService {
  
  constructor(private http:HttpClientModule, private client:HttpClient) { }
  error:any

    url="http://localhost:8000/";
    postadmin(value:any):Observable<admin[]>{
      const headers={'content-type':'application/json'};
      const body=JSON.stringify(value)
      return this.client.post<admin[]>(this.url+"/admin/signup/",body,{'headers':headers})
      .pipe(
        catchError(this.handleError)
      );
    }
    postdealer(value:any):Observable<admin[]>{
      const headers={'content-type':'application/json'};
      const body=JSON.stringify(value)
      return this.client.post<admin[]>(this.url+"/dealer",body,{'headers':headers})
      .pipe(
        catchError(this.handleError)
      );
    }
    getadmin(){
      return this.client.get(this.url)
    }
    handleError(error:HttpErrorResponse) {
       let errorMessage = '';
       if (error.error instanceof ErrorEvent) {
      //   // client-side error
       errorMessage = `Error: ${error.error.message}`;
       } else {
      //   // server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
       }
       window.alert("E-MAIL ID OR USERNAME ALREADY EXITS");
      console.log(errorMessage)
      return throwError(error.message || "Server Error");
    }

}
