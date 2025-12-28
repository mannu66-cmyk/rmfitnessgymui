import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-attendance',
  templateUrl: './attendance.component.html',
  styleUrls: ['./attendance.component.scss']
})
export class AttendanceComponent implements OnInit {

  mobile = '';
  showPinModal = false;
  pin = '';
  data: any[] = [];
  filteredMobiles: any[] = [];

  constructor(private attendanceService: AttendanceService, private http: HttpClient) { }
  ngOnInit(): void {
    this.http.get(environment.apiBaseUrl + 'api/members')
      .subscribe((res: any): void => {
        console.log(res);
        this.data = res;
      })
  }

  openPinModal() {
    this.showPinModal = true;
  }

  closePinModal() {
    this.showPinModal = false;
    this.pin = '';
  }

  markAttendance() {
    if (this.pin.length !== 4) {
      alert('Enter valid 4 digit PIN');
      return;
    }

    this.attendanceService.markAttendance({ mobile: this.mobile, pin: this.pin })
      .subscribe({
        next: (msg) => {
          alert(msg);
          this.closePinModal();
        },
        error: () => {
          alert('Failed to mark attendance. Please try again');
          this.closePinModal();
        },


      });


  }
  onSearchMobile() {
    this.filteredMobiles = [...this.data].filter(num => num.mobile.startsWith(this.mobile));
  }
  selectMobile(num: string) {
    this.mobile = num;
    this.filteredMobiles = []
  }

}
