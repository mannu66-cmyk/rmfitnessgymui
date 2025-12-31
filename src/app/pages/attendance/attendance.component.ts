import { HttpClient } from '@angular/common/http';
import { Text } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/core/services/attendance.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';
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
      Swal.fire({
        text: 'Enter valid 4 digit PIN',
        icon: 'warning',
        showCancelButton: false,
        allowOutsideClick: false,
        timer: 2000,
        timerProgressBar: false,
        toast: true,

        showConfirmButton: false,
        showDenyButton: false,
      });
      return;
    }

    this.attendanceService.markAttendance({ mobile: this.mobile, pin: this.pin })
      .subscribe({
        next: (msg) => {
          if (msg.includes('marked')) this.showAlerts(msg, 'success');
          else this.showAlerts(msg, 'warning')
          this.closePinModal();
        },
        error: () => {
          Swal.fire({
            text: 'Failed to mark attendance. Please try again',
            icon: 'error',
            showCancelButton: false,
            allowOutsideClick: false,
            timer: 2000,
            timerProgressBar: false,
            toast: true,

            backdrop: true,
            showConfirmButton: false,
            showDenyButton: false,
          });
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

  showAlerts(text: string, icon: any) {
    Swal.fire({
      text: text,
      icon: icon,
      showCancelButton: false,
      allowOutsideClick: false,
      toast:true,
      timer: 2000,
      timerProgressBar: false,
      showConfirmButton: false,
      showDenyButton: false,
    });
  }
}
