import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})

export class NavBarComponent implements OnInit {

  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
  }

  toMovies(): void {
    this.router.navigate(['movies']);
  }

  toProfile(): void {
    this.router.navigate(['profile']);
  }
  toFavorites(): void {
    this.router.navigate(['favorites']);
  }

  /**
   * function to log out of a user's profile
   * @function logoutFunction
   * navigates to the welcome page
   */
  logoutFunction(): void {
    localStorage.clear();
    this.snackBar.open('You successfully logged out!', 'OK', {
      duration: 2000,
    });
    this.router.navigate(['welcome']);
  }

}
