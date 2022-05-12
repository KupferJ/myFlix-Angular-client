import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { map } from 'rxjs/operators';


//API to provide data for the client side
const apiUrl = 'https://movie-api-777.herokuapp.com/';
//get the token from local storage
const token = localStorage.getItem('token');
//get the username from local storage
const username = localStorage.getItem('username');

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  /**
   * Inject the HttpClient module to the constructor params
   * This will provide HttpClient to the entire class, making it available via this.http
   * @param http
   */
  constructor(private http: HttpClient) {
  }

  /**
   * call the API endpoint to register a new user
   * @function userRegistration
   * @param userDetails 
   * @returns a new user object in JSON format
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'users', userDetails)
    .pipe(catchError(this.handleError));
  }

  /**
   * call the API endpoint to let a user log into their account
   * @function userLogin
   * @param userDetails 
   * @returns a users' data in JSON format
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'login', userDetails)
    .pipe(catchError(this.handleError));
  }

  /**
   * call API endpoint to get all movie elements
   * @function getAllMovies
   * @returns an array with the movie data in a JSON format
   */
  public getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token
      })
    })
    .pipe (catchError(this.handleError));
  }

  /**
   * call API endpoint to get the description of a movie element
   * @function getMovieSynopsis
   * @params id
   * @returns a movies' data in a JSON format
   */
  getMovieSynopsis(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/:movieId', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError));
  }

  /**
   * call API endpoint to get details of a Genre by its name
   * @function getGenre
   * @params Name
   * @returns the genre's data in a JSON format
   */
  getGenre(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/genre/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError))
  }

  /**
   * call API endpoint to get details of a Director by their name
   * @function getDirector
   * @param Name
   * @returns the director's data in a JSON format
   */
  getDirector(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .get(apiUrl + 'movies/director/:Name', {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError))
  }

  /**
   * calls API endpoint to post a movie element onto a user's favorite list
   * @function addFavorite
   * @param MovieID 
   * @returns the updated version of the user's favorite list
   */
  addFavorite(MovieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    const Username = localStorage.getItem('user');
    return this.http
    .post(apiUrl + `users/${Username}/movies/${MovieID}`, null, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError))
  }

  /**
   * calls API endpoint to remove a movie element from a user's favorite list
   * @function deleteFavorite
   * @param id
   * @returns the updated version of the user's favorite list
   */
  deleteFavorite(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .delete(apiUrl + `users/${username}/movies/${id}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError))
  }

  /**
   * calls API endpoint to get the data from a single user
   * @function getUser
   * @param username
   * @returns the user's data in a JSON format
   */
  getUser(): Observable<any> {
    const token = localStorage.getItem('token');
    const username = localStorage.getItem('user');
    return this.http
    .get(apiUrl + `users/${username}`, {
      headers: new HttpHeaders({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError))
  }


  /**
   * calls API endpoint to edit a user's data
   * @function editUser
   * @param userData 
   * @returns an updated list of the user's data in a JSON format
   */
  editUser(userData: any): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .put(apiUrl + `users/${username}`, userData, {
      headers: new HttpHeaders ({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError))
  }

  /**
   * calls API endpoint to delete a user's data
   * @function deleteUser
   * @param username
   * @returns delete status
   */
  deleteUser(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
    .delete(apiUrl + `users/${username}`, {
      headers: new HttpHeaders ({
        Authorization: 'Bearer ' + token,
      }),
    })
    .pipe(catchError(this.handleError))
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
    console.error('Some error occurred:', error.error.message);
    } else {
    console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
    'Something bad happened; please try again later.');
  }
} 