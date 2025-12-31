import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from 'src/app/core/services/member.service';
import Swal from 'sweetalert2';

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
  ) { }

  ngOnInit(): void {
    const today = new Date().toISOString().split('T')[0];
    this.memberForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      age: ['', Validators.required],
      plan: ['', Validators.required],
      startDate: [today, Validators.required],
      pin: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      price: ['', Validators.required],
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
          Swal.fire({
            text: 'Member saved successfully',
            icon: 'success',
            showCancelButton: false,
            allowOutsideClick: false,
            timer: 2000,
            timerProgressBar: false,
            toast:true,
            showConfirmButton: false,
            showDenyButton: false,
          });
          this.memberForm.reset();
        },
        error: () => {
          Swal.fire({
            text: 'Error saving member...',
            icon: 'error',
            showCancelButton: false,
            allowOutsideClick: false,
            timer: 2000,
            timerProgressBar: false,
            toast:true,
            showConfirmButton: true,
            showDenyButton: false,
          })
        }
      });
  }
  ngOnDestroy() {
    this.memberService.clear();
  }
}


