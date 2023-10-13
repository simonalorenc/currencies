import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FlagsService {
  private API: string = 'https://restcountries.com/v3.1/all'

  constructor(private http: HttpClient) { }

  getFlagsInfo() {
    
  }
}
