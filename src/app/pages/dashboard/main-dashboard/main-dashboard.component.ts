import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { log } from 'console';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.scss']
})
export class MainDashboardComponent implements OnInit {

  data: any[] = [];
  totalMembers: number = 0;
  activeMembers: number = 0;
  expiredMembers: number = 0;
  constructor(private http: HttpClient) { }

  ngOnInit() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    this.http.get(environment.apiBaseUrl + 'api/members')
      .subscribe((res: any): void => {
        console.log(res);
        this.data = res;
        this.totalMembers = this.data.length;
        this.activeMembers = this.data.filter(m => {
          const newDate = new Date(m.expiryDate)
          return newDate >= today
        }).length;
        this.expiredMembers = this.data.filter(m => {
          const newDate = new Date(m.expiryDate)
          return newDate < today
        }).length;
        console.log(this.activeMembers + "" + this.totalMembers);
      })
  };


}
