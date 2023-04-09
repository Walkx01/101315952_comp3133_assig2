import { AddemployeeComponent } from './components/addemployee/addemployee.component';
import { EmployeeComponent } from './components/employee/employee.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardService } from './services/authguard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  {
    path: 'employees',
    component: EmployeeComponent,
    canActivate: [AuthguardService],
  },
  {
    path: 'addemployee',
    component: AddemployeeComponent,
    canActivate: [AuthguardService],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
