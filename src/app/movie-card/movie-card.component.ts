import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service'
import { GenreViewComponent } from '../genre-view/genre-view.component';
import { DirectorViewComponent } from '../director-view/director-view.component';
import { SynopsisCardComponent } from '../synopsis-card/synopsis-card.component';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCardSmImage } from '@angular/material/card';


@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  user: any = localStorage.getItem('user');
  movies: any[] = [];
  genres: any[] = [];
  favoriteMovies: any[] = [];

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar
    ) { }


ngOnInit(): void {
  this.getMovies();
  this.getFavoriteMovies();
}

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }


  openDirectorDialog(name: string, bio: string, birth: number): void {
    this.dialog.open(DirectorViewComponent, {
      panelClass: 'custom-dialog-container',
      data: {name, bio, birth},
      width: '500px',
    });
  }

  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      panelClass: 'custom-dialog-container',
      data: { name, description },
      width: '500px'
    });
  }

  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      panelClass: 'custom-dialog-container',
      data: { title, description },
      width: '500px',
    })
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      console.log(this.favoriteMovies);
    });
  }

  addFavoriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.addFavorite(MovieID).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favorites!`, 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  removeFavoriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.deleteFavorite(MovieID).subscribe((resp: any) => {
      console.log(resp);
      this.snackBar.open(
        `${title} has been removed from your favorites!`,
        'OK',
        {
          duration: 3000,
        }
      );
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  isFavorite(MovieID: string): boolean{
    return this.favoriteMovies.includes(MovieID);
  }

  toggleFavorite(movie: any): void {
    console.log(movie);
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title);
  }
}
