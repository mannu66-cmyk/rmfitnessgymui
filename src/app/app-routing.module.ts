import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainDashboardComponent } from './pages/dashboard/main-dashboard/main-dashboard.component';
import { MembersComponent } from './pages/members/members.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { AttendanceHistoryComponent } from './pages/attendance-history/attendance-history.component';
import { MemberFormComponent } from './pages/member-form/member-form.component';
import { AuthService } from './core/services/auth.service';
import { AuthGuard } from './core/guards/auth.guard';
import { MemberPackageComponent } from './pages/member-package/member-package.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: '', component: MainDashboardComponent },
      { path: 'member', component: MembersComponent },
      { path: 'member-form', component: MemberFormComponent },
      { path: 'attendance', component: AttendanceComponent },
      { path: 'attendance-history', component: AttendanceHistoryComponent },
      { path: 'package-history', component: MemberPackageComponent },

      { path: '**', redirectTo: '/dashboard', pathMatch: 'full' }
    ], canActivateChild: [AuthGuard]
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
