import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
   let user = new User('', this.firstName, this.lastName, this.email, this.password)
    this.userService.addUser(user).subscribe({next: (data) =>{
        this.userService.setMessage("Congrats! you have been successfully registered.")
        this.router.navigateByUrl('/home')
    }, 
    error: (err) => {
      console.log(err)
      this.userService.setMessage("Network Error!")
    }
    })
  }

}
