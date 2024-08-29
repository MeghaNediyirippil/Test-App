import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimezoneService {
  private apiUrlTime = 'assets/timezone.json';

  constructor(private http: HttpClient) {}

  getTimezones(): Observable<any> {
    return this.http.get<any>(this.apiUrlTime);
  }
}
