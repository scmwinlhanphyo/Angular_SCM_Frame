import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  name!: string;
  userLoginData!: any;

  constructor(
    public router: Router,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        this.userLoginData = localStorage.getItem('userLoginData') || null;
      }
    });
  }


  public logout() {
    this.authService.logout().subscribe((dist: any) => {
      localStorage.removeItem('token');
      localStorage.removeItem('userLoginData');
      this.authService.isLoggedIn();
      this.router.navigateByUrl('/login');
    });
  }

}
