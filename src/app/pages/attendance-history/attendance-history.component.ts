import { Component, OnInit } from '@angular/core';
import { AttendanceService } from 'src/app/core/services/attendance.service';

@Component({
  selector: 'app-attendance-history',
  templateUrl: './attendance-history.component.html',
  styleUrls: ['./attendance-history.component.scss']
})
export class AttendanceHistoryComponent {

  mobile = '';
  filter = 'month';
  records: any[] = [];

  constructor(private attendanceService: AttendanceService) { }

  load() {
    this.attendanceService.history(this.mobile, this.filter)
      .subscribe((res: any[]) => this.records = res);
  }
}
