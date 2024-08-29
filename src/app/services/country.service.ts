import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

// country.model.ts or similar file
export interface Country {
  name: {
    common: string;
    official?: string;
  };
  flags: {
    png: string;
  };
  languages?: { [code: string]: string }; // Add languages property
}


@Injectable({
  providedIn: 'root'
})
export class CountryService {
  private apiUrl = 'https://restcountries.com/v3.1/all'; // Example API URL

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>(this.apiUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching countries:', error);
        return of([]); // Return an empty array or handle error appropriately
      })
    );
  }
}
