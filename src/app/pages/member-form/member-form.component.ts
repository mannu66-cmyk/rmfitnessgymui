import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from 'src/app/core/services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.scss']
})
export class MemberFormComponent implements OnInit {
  memberForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private memberService: MemberService
  ) {}

  ngOnInit(): void {
    const today= new Date().toISOString().split('T')[0];
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      age: ['', Validators.required],
      plan: ['', Validators.required],
      startDate: [today, Validators.required],
      pin: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]]
    });

      this.memberService.member$.subscribe(member => {
    if (member) {
      this.memberForm.patchValue(member);
    }
  });
  }

  saveMember() {
    if (this.memberForm.invalid) {
      this.memberForm.markAllAsTouched();
      return;
    }

    this.memberService.saveMember(this.memberForm.value)
      .subscribe({
        next: () => {
          alert('Member saved successfully');
          this.memberForm.reset();
        },
        error: () => alert('Error saving member')
      });
  }
  ngOnDestroy() {
  this.memberService.clear();
}
}


