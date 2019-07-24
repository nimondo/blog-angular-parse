import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs/Subscription';
import {Parse} from 'parse';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuth: boolean;
  userSubscription: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userSubscription = this.authService.userSubject.subscribe(
      (userStatus:any) => {
        this.isAuth = userStatus;
      }
    );
    this.authService.emitUser();
    console.log(this.isAuth);
  }
  onSignOut() {
    this.authService.signOutUser();
  }

}