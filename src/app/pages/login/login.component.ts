import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { error } from 'console';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(private router:Router, private authService:AuthService){}

  login(username:string, password:string ) {
  this.authService.login(username, password)
    .subscribe({next:(res) => {
      this.authService.saveToken(res.token);
      localStorage.setItem('loggedIn', 'true');
      this.router.navigateByUrl('/dashboard/member');
    },
    error:()=>{
      alert('Something went wrong....');
    }}
  );
}

}
