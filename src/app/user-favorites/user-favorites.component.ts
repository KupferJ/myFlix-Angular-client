import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-favorites',
  templateUrl: './user-favorites.component.html',
  styleUrls: ['./user-favorites.component.scss'],
})
export class UserFavoritesComponent implements OnInit {
  user: any = {};
  movies: any[] = [];
  genres: any[] = [];
  username: any = localStorage.getItem('user');
  favoriteMovies: any[] = [];
  displayElement: boolean = false

  @Input() userData = { 
    Username: this.user.Username, 
    Email: this.user.Email, 
    Password: '', 
    Birthdate: this.user.Birthdate
  };

  constructor(
    public dialog: MatDialog,
    public fetchApiData: FetchApiDataService,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}
 
  ngOnInit(): void {
    this.getUser();
    this.getFavorites();
    console.log(this.userData);
  }

  getUser(): void {
    const user = localStorage.getItem('user');
    if (user) {
      this.fetchApiData.getUser().subscribe((response: any) => {
        this.user = response;
        console.log(this.user);
        return this.user;
      });
    }
  }
  removeFavoriteMovie(id: string): void {
    this.fetchApiData.deleteFavorite(id).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open( `removed from your favorites!`, 'OK',
        {
          duration: 2000,
        });
        this.ngOnInit();
        window.location.reload();
      });
    }

    getFavorites(): void {
      let movies: any[] = [];
      this.fetchApiData.getAllMovies().subscribe((res: any) => {
        movies = res;
        movies.forEach((movie: any) => {
          if (this.user.FavoriteMovies.includes(movie._id)) {
            this.favoriteMovies.push(movie);
            this.displayElement = true;
          }
          });
      });
    }

}