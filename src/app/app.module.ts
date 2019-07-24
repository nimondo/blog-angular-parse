import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule,Routes,ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot,Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Parse} from 'parse';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { HeaderComponent } from './header/header.component';
import { BlogListComponent } from './blog-list/blog-list.component';
import { SingleBlogComponent } from './blog-list/single-blog/single-blog.component';
import { BlogFormComponent } from './blog-list/blog-form/blog-form.component';
import { AuthGuardService } from './services/auth-guard.service';
import { BlogUpdateComponent } from './blog-list/blog-update/blog-update.component';

Parse.initialize("myAppId");
Parse.serverURL = 'http://localhost:1337/parse';
  const appRoutes: Routes = [
    { path: 'auth/signup', component: SignupComponent },
    { path: 'auth/signin', component: SigninComponent },
    { path: 'blog',  canActivate: [AuthGuardService], component: BlogListComponent },
    { path: 'blog/new',  canActivate: [AuthGuardService], component: BlogFormComponent },
    { path: 'blog/view/:id',  canActivate: [AuthGuardService], component: SingleBlogComponent },
    { path: 'blog/update/:id',  canActivate: [AuthGuardService], component: BlogUpdateComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    SigninComponent,
    HeaderComponent,
    BlogListComponent,
    SingleBlogComponent,
    BlogFormComponent,
    BlogUpdateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
