import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainDashboardComponent } from './pages/dashboard/main-dashboard/main-dashboard.component';
import { MembersComponent } from './pages/members/members.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { AttendanceHistoryComponent } from './pages/attendance-history/attendance-history.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { MemberFormComponent } from './pages/member-form/member-form.component';
import { JwtInterceptor } from './core/services/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MainDashboardComponent,
    MembersComponent,
    AttendanceComponent,
    AttendanceHistoryComponent,
    MemberFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true }
  ] ,
  bootstrap: [AppComponent]
})
export class AppModule { }
