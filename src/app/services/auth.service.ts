import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { map } from "rxjs/operators";
import { Observable, Subject, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { baseUrl } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  error: any;

  constructor(private http: HttpClient) {
  }

  sendRequest(method: string, endPoint: string, data: any) {
    return this.actualSendRequest(method, endPoint, data);
  }

  actualSendRequest(method: any, endPoint: any, data: any) {
    let myHeaders: any;
    var token = localStorage.getItem('token') || '{}';
    if (localStorage.getItem('token') != null) {
      var token = localStorage.getItem('token') || '{}';
      myHeaders = new HttpHeaders({
        'authorization': token,
        'accept': 'application/json',
      });
    }

    let endPointUrl: any;

    endPointUrl = `${baseUrl}` + endPoint + ``;
    if (method == 'post') {
      return this.http.post(endPointUrl, data, { headers: myHeaders })
        .pipe(
          map(data => {
            return data
          }),
          catchError(error => {
            return this.handleError(error);
          })
        );
    } else if (method == 'put') {
      return this.http.put(endPointUrl,
        data, { headers: myHeaders }).pipe(
          map(data => {
            return data
          }),
          catchError(error => {
            return this.handleError(error);
          })
        );
    } else if (method == 'delete') {
      return this.http.delete(endPointUrl, { headers: myHeaders }).pipe(
        map(data => {
          return data
        }),
        catchError(error => {
          return this.handleError(error);
        })
      );
    } else {
      return this.http.get(endPointUrl, { headers: myHeaders }).pipe(
        map(data => {
          return data
        }),
        catchError(error => {
          return this.handleError(error);
        })
      );
    }
  }

  private handleError(error: HttpErrorResponse) {
    this.error = error;
    let errorMessage = '';
    if (error.status == 0) {
      errorMessage = 'An error occurred:the request failed for some reason';

    } else if (error.status == 401) {
      errorMessage = 'An error occurred :- Unauthorized error please login first';
    } else if (error.status == 400) {
      errorMessage = 'An error occurred:-Bad Request Error occurs';

    } else if (error.status == 500) {
      errorMessage = " An error occurred:-Something went wrong. Please try again after some time";

    }
    else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
      errorMessage = ` ${error.status},`, error.error;

    }
    // Return an observable with a user-facing error message.
    return throwError(errorMessage);
  }

  IsLoggedIn() {
    //it returns a boolean value, if the token exsist then true else vice versa
    return !!localStorage.getItem('token');
  }

  upload(file: File,customerId:any,projectId:any): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    
    formData.append('file', file);
    formData.append('customerId', customerId);
    formData.append('projectId', projectId);

    let myHeaders: any;
    var token = localStorage.getItem('token') || '{}';
    if (localStorage.getItem('token') != null) {
      var token = localStorage.getItem('token') || '{}';
      myHeaders = new HttpHeaders({
        'authorization': token,
        'accept': 'application/json',
      });
    }

    const req = new HttpRequest('POST', `${baseUrl}/admin/upload-doc`, formData, {
      reportProgress: true,
      responseType: 'json',
      headers: myHeaders
      });

    return this.http.request(req);
  }

  getFiles(): Observable<any> {
    return this.http.get(`${baseUrl}/files`);
  }
  
}
