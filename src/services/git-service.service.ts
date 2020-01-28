import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders ,HttpErrorResponse} from '@angular/common/http';
import { Observable, throwError,Subject } from 'rxjs';
import { retry, catchError, tap } from 'rxjs/operators';
import {serviceURLS} from "../assets/app-constants"

@Injectable({
  providedIn: 'root'
})
export class GitServiceService {

  constructor(private http : HttpClient) { }

  // Get User List
  getUsers(){
    return this.http.get(serviceURLS.getUserInfo)
    .pipe(
      retry(1),
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }
  getUserRepoDetails(userName){
    return this.http.get(serviceURLS.getUserInfo +"/"+userName + "/repos")
    .pipe(
      retry(1),
      tap(data => console.log(JSON.stringify(data))),
      catchError(this.handleError)
    )
  }
  private handleError(err:HttpErrorResponse){
    let errMsg:string = ' ';
    if(err.error instanceof Error){
      console.log('An Error Occurred : ' + err.error.message)
      errMsg = err.error.message;
    }
    else{
      console.log(`Backend returned Code ${err.status}`);
      errMsg = err.error.status;
    }
    return Observable.throw(errMsg);
  }
}
