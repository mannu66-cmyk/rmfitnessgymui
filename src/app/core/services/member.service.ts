import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
@Injectable({ providedIn: 'root' })
export class MemberService {

  private baseUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  save(member: any) {
    return this.http.post(this.baseUrl, member);
  }

  getAll(filter: string = 'all') {
    return this.http.get<any[]>(`${this.baseUrl+'api/members'}?filter=${filter}`);
  }

  getByMobile(mobile: string) {
    return this.http.get<any>(`${this.baseUrl}/${mobile}`);
  }

  saveMember(data: any) {
    return this.http.post(this.baseUrl+'api/members', data,{responseType:'text'});
  }
}
