import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { constants } from '../constants';

@Injectable({
  providedIn: 'root',
})
export class PropertyService {
  constructor(private httpClient: HttpClient) {}

  getProperties(): Observable<boolean> {
    return this.httpClient
      .get<any>(constants.SERVER_URL + 'api/property/', {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('currentUser') || [],
        }),
      })
      .pipe(
        retry(3),
        catchError(this.handleError) // then handle the error
      );
  }

  getSavedProperties(): Observable<boolean> {
    return this.httpClient
      .get<any>(constants.SERVER_URL + 'api/property/myfavourite/', {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('currentUser') || [],
        }),
      })
      .pipe(
        retry(3),
        catchError(this.handleError) // then handle the error
      );
  }

  getAppointments(): Observable<boolean> {
    return this.httpClient
      .get<any>(constants.SERVER_URL + 'api/property/myappointments/', {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('currentUser') || [],
        }),
      })
      .pipe(
        retry(3),
        catchError(this.handleError) // then handle the error
      );
  }

  searchProperty(query: string): Observable<boolean> {
    return this.httpClient
      .get<any>(constants.SERVER_URL + 'api/property/search/' + query, {
        headers: new HttpHeaders({
          Authorization: localStorage.getItem('currentUser') || [],
        }),
      })
      .pipe(
        retry(3),
        catchError(this.handleError) // then handle the error
      );
  }

  saveProperty(saveParams: any): Observable<boolean> {
    return this.httpClient
      .put<any>(
        constants.SERVER_URL +
          'api/user/save/' +
          saveParams.flag +
          '/' +
          saveParams.id,
        {},
        {
          headers: new HttpHeaders({
            Authorization: localStorage.getItem('currentUser') || [],
          }),
        }
      )
      .pipe(
        retry(3),
        catchError(this.handleError) // then handle the error
      );
  }

  bookAppointment(appointment: any): Observable<boolean> {
    return this.httpClient
      .post<any>(
        constants.SERVER_URL + 'api/property/bookappointment/',
        appointment,
        {
          headers: new HttpHeaders({
            Authorization: localStorage.getItem('currentUser') || [],
          }),
        }
      )
      .pipe(
        retry(3),
        catchError(this.handleError) // then handle the error
      );
  }
  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }
}
