import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class AttendanceService {

 private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  markAttendance(data:any) {
    return this.http.post(`${this.baseUrl}api/attendance/mark`, data,{responseType:'text'});
  }

  history(mobile: string, filter: string) {
    return this.http.get<any[]>(
      `${this.baseUrl}api/attendance/history?mobile=${mobile}&filter=${filter}`
    );
  }
}
