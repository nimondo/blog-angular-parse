import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Parse } from 'parse';
import { Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userSubject = new Subject<boolean>();
  userStatus: boolean;
  user;
  constructor(private router:Router) { 
    this.user = Parse.User.current();
    if(this.user){
      this.userStatus = true;
    } else {
      this.userStatus = false;
    }
  }
  emitUser() {
    this.userSubject.next(this.userStatus);
  }
  createNewUser(username:string, email: string, password: string):Promise<string> {
    const user = new Parse.User();
    user.set("username", username);
    user.set("password", password);
    user.set("email", email);
    return user.signUp().then(
          (response) => {
            console.log(response);
            this.user=Parse.User.current();
            if(this.user){
              this.userStatus = true;
            } else {
              this.userStatus = false;
            }
            this.emitUser();
            return true;
          },
          (error) => {
            return error.message;
          }
        );
  }
  signInUser(username: string, password: string):Promise<any> {
    return Parse.User.logIn(username, password).then(
      (response) => {
        console.log(response);
        this.user=Parse.User.current();
            if(this.user){
              this.userStatus = true;
            } else {
              this.userStatus = false;
            }
            this.emitUser();
        return true;
      },
      (error) => {
        return error.message;
      }
    );
  }
  signOutUser() {
    console.log('log');
    Parse.User.logOut();
    this.user=null;
    if(this.user){
        this.userStatus = true;
    } else {
      this.userStatus = false;
    }
      this.emitUser();
      this.router.navigate(['/auth', 'signin']);
}
}
