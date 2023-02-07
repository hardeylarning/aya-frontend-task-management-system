import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  readonly loading$ = new BehaviorSubject<boolean>(false);

  email:string = ''
  password:string = ''

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  tinyAlert(message: string) {
    Swal.fire(message);
  }
  successNotification(message: string) {
    Swal.fire('Hi', message, 'success');
  }

  

  login() {
    this.loading$.next(true)
    this.authService.login(this.email, this.password).subscribe({
      next: data => {
        if (data.status === 'success') {
          this.loading$.next(false)

          this.router.navigate(['/home'])
        }
        else {
          this.loading$.next(false)
          this.tinyAlert(data.message)
        }
      },
      error: err => {
        this.loading$.next(false)
        this.tinyAlert("Network Error! Kindly check your network issue")
      }

  })
}
}
