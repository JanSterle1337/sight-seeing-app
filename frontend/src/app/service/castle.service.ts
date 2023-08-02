import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, of, tap } from 'rxjs';
import { Castle } from '../entity/Castle';


@Injectable({
  providedIn: 'root'
})
export class CastleService {

  baseUrl: string = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) { }

  getAllCastles(): Observable<Castle[]> {
    return this.http.get<Castle[]>(this.baseUrl + "castles")
      .pipe(
        tap(() => console.log("Fetched all castles")),
        catchError(this.handleError<Castle[]>('getAllCastles', [])),
      );
  }

  getCastle(id: number): Observable<Castle> {
    const url = `${this.baseUrl}castles/${id}`;

    return this.http.get<Castle>(url).pipe(
      tap(() => console.log(`fetched castle with id=${id}`)),
      catchError(this.handleError<Castle>(`castle id=${id}`))
      )
    
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.log(`${operation} failed: ${error.messaage}`)
      return of(result as T);
    }
  }

}
