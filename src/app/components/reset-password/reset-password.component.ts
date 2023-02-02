import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  email:string = ''

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  reset() {
    this.userService.getUserByEmail(this.email).subscribe({
      next: data => {
        
        if (data.status === "success") {
          localStorage.setItem('email', this.email)
          this.router.navigateByUrl('/forgot')
        }
        else {
          alert("Incorrect user email")
        }
      },
      error: err => {
        console.log(err);
        
      }
    })
  }

}
