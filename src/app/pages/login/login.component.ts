import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { error } from 'console';
import { AuthService } from 'src/app/core/services/auth.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) { }

  login(username: string, password: string) {
    this.authService.login(username, password)
      .subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          localStorage.setItem('loggedIn', 'true');
          this.router.navigateByUrl('/dashboard');
        },
        error: () => {
          Swal.fire({
            text: 'Something went wrong...',
            icon: 'error',
            showCancelButton: false,
            allowOutsideClick: false,
            timer: 2000,
            timerProgressBar: false,
            toast:true,
            backdrop: true,
            showConfirmButton: false,
            showDenyButton: false,
          });
        }
      }
      );
  }


}





