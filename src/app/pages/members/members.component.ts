import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MemberService } from 'src/app/core/services/member.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss']
})
export class MembersComponent implements OnInit {

  members: any[] = [];
  gymFreaks: any[] = [];
  filter = 'all';

  constructor(private memberService: MemberService, private router:Router) { }

  ngOnInit() {
    this.memberService.getAll(this.filter)
      .subscribe((res: any[]) => { this.members = res; this.gymFreaks = res; });

  }

  loadMembers() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (this.filter === 'active') {
      this.members = [...this.gymFreaks].filter(m => {
        const newDate = new Date(m.expiryDate)
        return newDate >= today
      })
    }
    else if (this.filter === 'expired') {
      this.members = [...this.gymFreaks].filter(m => {
        const newDate = new Date(m.expiryDate)
        return newDate < today
      })
    }
    else
      this.members = [...this.gymFreaks];
  }

  editMember(member: any) {
  this.memberService.setMember(member);
  this.router.navigate(['/dashboard/member-form']);
}
}
