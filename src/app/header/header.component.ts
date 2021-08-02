import { Component, OnInit } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { AuthenticationService } from './../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public SearchTerm: String = '';
  isLoggedIn$: Observable<boolean> = new BehaviorSubject<boolean>(false);
  currUser: any;
  toggle: boolean = false;

  constructor(private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.authService.isLoggedIn;
    this.currUser = localStorage.getItem('userName');
  }
  onLogout() {
    this.toggle = false;
    this.authService.logout();
  }
  toggler() {
    this.toggle = !this.toggle;
  }
}
