import { PhonebookComponent } from './phonebook/phonebook.component';
import { RegisterComponent } from './auth-user/register/register.component';
import { LoginComponent } from './auth-user/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'phonebook', component: PhonebookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
