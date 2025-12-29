import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  history(mobile: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}api/package/history?mobile=${mobile}`
    );
  }

  aggregate(param: any) {
    return this.http.get<any>(
      `${this.baseUrl}api/package-agg?param=${param}`
    );
  }
}
