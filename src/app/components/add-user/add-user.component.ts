import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { User } from 'src/app/model/user';
import { SweetAlertService } from 'src/app/services/sweet-alert.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {

  email = ''
  firstName = ''
  lastName = ''
  password = ''

  isLoading: Boolean = false
  readonly loading$ = new BehaviorSubject<boolean>(false);

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  tinyAlert(message: string) {
    Swal.fire(message);
  }
  successNotification(message: string) {
    Swal.fire('Hi', message, 'success');
  }

  onSubmit() {
   let user = new User('', this.firstName, this.lastName, this.email, this.password)
   this.isLoading = true
   this.loading$.next(true)
    this.userService.addUser(user).subscribe({next: (data) =>{
      if(data.status === 'success') {
        this.isLoading = false
        this.loading$.next(false)
        this.successNotification("Congrats! you have been successfully registered, you can now login.")
        this.router.navigateByUrl('/home')
      }
      else {
        this.tinyAlert(data.message)
        this.isLoading = false
        this.loading$.next(false)
        console.log("Error: ",data.message);
      }
      
    }, 
    error: (err) => {
      console.log(err)
      this.loading$.next(false)
      this.tinyAlert("Network Error!")
    }
    })
  }

}
