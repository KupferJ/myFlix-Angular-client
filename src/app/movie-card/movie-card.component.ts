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

  /**
   * function to get all movie elements
   * @function getMovies
   * @returns movie data
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
        this.movies = resp;
        console.log(this.movies);
        return this.movies;
      });
    }


  /**
   * function to open the director dialog
   * @function openDirectorDialog
   * @param name 
   * @param bio 
   * @param birth 
   */
  openDirectorDialog(name: string, bio: string, birth: number): void {
    this.dialog.open(DirectorViewComponent, {
      panelClass: 'custom-dialog-container',
      data: {name, bio, birth},
      width: '500px',
    });
  }

  /**
   * function to open the genre dialog
   * @function openGenreDialog
   * @param name 
   * @param description 
   */
  openGenreDialog(name: string, description: string): void {
    this.dialog.open(GenreViewComponent, {
      panelClass: 'custom-dialog-container',
      data: { name, description },
      width: '500px'
    });
  }

  /**
   * function to open the Synopsis dialog
   * @function openSynopsisDialog
   * @param title 
   * @param description 
   */
  openSynopsisDialog(title: string, description: string): void {
    this.dialog.open(SynopsisCardComponent, {
      panelClass: 'custom-dialog-container',
      data: { title, description },
      width: '500px',
    })
  }

  /**
   * function to get a user's favorite movies
   * @function getFavoriteMovies
   */
  getFavoriteMovies(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.favoriteMovies = resp.FavoriteMovies;
      console.log(this.favoriteMovies);
    });
  }

  /**
   * function to add a movie to a user's favorite movies
   * @function addFavoriteMovie
   * @param MovieID 
   * @param title 
   * @returns an array with the user's favorite movies in a JSON format
   */
  addFavoriteMovie(MovieID: string, title: string): void {
    this.fetchApiData.addFavorite(MovieID).subscribe((resp: any) => {
      this.snackBar.open(`${title} has been added to your favorites!`, 'OK', {
        duration: 3000,
      });
      this.ngOnInit();
    });
    return this.getFavoriteMovies();
  }

  /**
   * function to remove a movie grom a user's favorite movies
   * @function removeFavoriteMovie
   * @param MovieID 
   * @param title 
   * @returns the updated array withe the user's fabvorite movies in a JSON format
   */
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

  /**
   * function to check whether a movie is favorited by the use
   * @function isFavorite
   * @param MovieID 
   * @returns boolean
   */
  isFavorite(MovieID: string): boolean{
    return this.favoriteMovies.includes(MovieID);
  }

  /**
   * function to toggle the favorite status of a movie
   * @function toggleFavorite
   * and depending on the movie's status
   * either
   * @function removeFavoriteMovie
   * or
   * @function addFavoriteMovie
   * @param movie 
   */
  toggleFavorite(movie: any): void {
    console.log(movie);
    this.isFavorite(movie._id)
      ? this.removeFavoriteMovie(movie._id, movie.Title)
      : this.addFavoriteMovie(movie._id, movie.Title);
  }
}
