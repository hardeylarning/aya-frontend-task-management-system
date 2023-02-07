import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userProfile: string | null = null

  constructor(private router: Router, private authService: AuthService, private userService: UserService) { }

  ngOnInit(): void {
      this.userProfile = localStorage.getItem('userName');
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['home'])
  }

  isLoggedIn() {
    return this.userService.userLoggedIn()
  }

}
