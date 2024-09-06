import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  private apiUrlLanguage = 'assets/languages.json';

  constructor(private http: HttpClient) { }

  getLanguages(): Observable<{ [key: string]: string }> {
    return this.http.get<{ [key: string]: string }>(this.apiUrlLanguage);
  }
}
