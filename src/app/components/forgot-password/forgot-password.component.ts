import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  password = ''
  cPassword = ''
  email:string = ''

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  reset() {
    this.email = localStorage.getItem('email') || ''
    
    if (this.password !== this.cPassword) {
      alert("password and confirm password is different")
      return
    }

    this.userService.userResetPassword(this.email, this.password).subscribe({
      next: data => {
        console.log("Data ", data.status);
        
        if (data.status === "success") {
          localStorage.removeItem('email')
          alert("Password has been reset successfully, you can now login")
          this.router.navigateByUrl('/home')
        }
        else {
          alert("Password was not reset, kindly try again")
        }
      },
      error: err => {
        console.log(err);
        
      }
    })
  }

}
