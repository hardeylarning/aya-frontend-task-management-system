import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  responseData = null

  email:string = ''
  password:string = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  

  login() {
    this.authService.login(this.email, this.password).subscribe((res: any) => {
      if (res != null) {
        this.responseData = res
        console.log('login: ', res);
        
        // localStorage.setItem("userId", res.data.id)
        // localStorage.setItem('token', res.token) 
        this.router.navigate(['/home'])
      }
    })
  }

}
