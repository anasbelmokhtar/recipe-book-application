import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import {User} from "../_models/User";
import {environment} from "../../environments/environment";
import {RecipeService} from "../recipes/recipe.service";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private recipeService: RecipeService) {
    this.currentUserSubject = new BehaviorSubject(localStorage.getItem('currentUser'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/users/authenticate`, { username, password })
      .pipe(map(user => {
        // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
        user.authdata = window.btoa(username + ':' + password);
        localStorage.setItem('currentUser', user.username);
        this.currentUserSubject.next(user);
        return user;
      }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.recipeService.setRecipes([]);
  }

  register(username: string, password: string, email: string) {

    console.log("register method called");
    this.http.post<any>(`${environment.apiUrl}/recipe-book/registration`, { username, password, email }).subscribe(data => {
      alert("Thank you for signing up! Please check your E-mail for a verification link.")
      return;
    })


  }
}
