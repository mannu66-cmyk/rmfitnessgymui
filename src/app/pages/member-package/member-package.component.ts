import { Component, OnInit } from '@angular/core';
import { PackageService } from 'src/app/core/services/package.service';

@Component({
  selector: 'app-member-package',
  templateUrl: './member-package.component.html',
  styleUrls: ['./member-package.component.scss']
})
export class MemberPackageComponent implements OnInit {

  ngOnInit(): void {
    for (let i = 2000; i <= 3000; i++) {
      this.years.push(i);
    }
  }
  mobile = '';
  filter = 'month';
  currentMonth = 1;
  records: any[] = [];
  agg = 0;
  hide = true;
  years: number[] = [];
  currentYear = new Date().getFullYear();
  constructor(private packageService: PackageService) { }

  load() {
    this.packageService.history(this.mobile)
      .subscribe((res: any[]) => this.records = res);
  }

  loadPackageAggregate(param: number) {
    console.log(param);
    this.packageService.aggregate(param)
      .subscribe((res) => this.agg = res);
  }

}
