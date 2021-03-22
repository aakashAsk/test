import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './materialModule/material.module';
import { AuthUserComponent } from './auth-user/auth-user.component';
import { LoginComponent } from './auth-user/login/login.component';
import { RegisterComponent } from './auth-user/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PhonebookComponent } from './phonebook/phonebook.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { AddContactComponent } from './phonebook/add-contact/add-contact.component';
import { ContactListComponent } from './phonebook/contact-list/contact-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthUserComponent,
    LoginComponent,
    RegisterComponent,
    PhonebookComponent,
    NavbarComponent,
    AddContactComponent,
    ContactListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
