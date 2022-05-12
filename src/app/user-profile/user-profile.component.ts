import { Component, OnInit, Input } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  Username = localStorage.getItem('user');

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
  ) { }

  ngOnInit(): void {
    this.getUserProfile();
  }

  getUserProfile(): void{
    const username = localStorage.getItem('user');
    if (username) {
      this.fetchApiData.getUser().subscribe((res: any) => {
        this.user = res;
        console.log(this.user);
        return this.user;
      });
    }
  }

  editUserProfile(): void {
    this.fetchApiData.editUser(this.userData).subscribe((resp) => {
      localStorage.setItem('user', JSON.stringify(resp));
      this.snackBar.open('Your profile has been updated!', 'OK', {
        duration: 4000,
      });
      setTimeout(() => {
        window.location.reload();
      });
    });
  }

  deleteUserProfile(): void {
    if (confirm('This cannot be undone! Are you sure you want to delete your account?')) {
      this.fetchApiData.deleteUser().subscribe(() => {
        this.snackBar.open(`${this.user.Username}'s account has been deleted!`, 'OK', {
          duration: 4000,
        });
        localStorage.clear();
      });
      this.router.navigate(['welcome']);
    }
  }

}
