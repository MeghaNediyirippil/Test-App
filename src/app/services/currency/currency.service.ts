import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface CurrencyData {
  [key: string]: {
    label: string;
    currencyflag: string;
    symbol: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private apiUrlcurrency = 'assets/currency.json'; // Path to your JSON file

  constructor(private http: HttpClient) {}

  getCurrencies(): Observable<CurrencyData> {
    return this.http.get<CurrencyData>(this.apiUrlcurrency);
  }
}
