import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { UserComponent } from './components/user/user.component';
import { AddUserComponent } from './components/add-user/add-user.component';
import { UpdateUserComponent } from './components/update-user/update-user.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { LoginComponent } from './components/login/login.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { EmailValidatorDirective } from './directive/email-validator.directive';




const routes: Routes = [
 
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'tasks',
    component: TasksComponent
  },
  {
    path: 'add-task',
    component: AddTaskComponent
  },
  {
    path: 'edit-task',
    component: EditTaskComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  },
  {
    path: 'edit-user/:id',
    component: EditUserComponent
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponent
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    AddUserComponent,
    UpdateUserComponent,
    EditUserComponent,
    AddTaskComponent,
    TasksComponent,
    EditTaskComponent,
    LoginComponent,
    ResetPasswordComponent,
    NavbarComponent,
    EmailValidatorDirective
  ],

  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
