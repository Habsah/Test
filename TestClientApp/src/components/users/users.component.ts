import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user';
import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users: User[];
  error = '';

  constructor(private userService: UserService, private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe(
        (users: User[]) => {
          this.users = users;
        },
        error => {
          this.error = error;
        });
  }

  deleteUser(id: string) {
    Swal.fire({
      title: 'هل أنت متأكد من حذف المستخدم؟',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'نعم',
      cancelButtonText: 'لا'
    }).then((result) => {
      if (result.value) {
        this.userService.deleteUser(id)
          .subscribe(
            data => {
              Swal.fire({
                title: 'تم الحذف',
                icon: 'success',
                timer: 1500,
                showConfirmButton: false
              }).then(() => {
                this.getUsers();
                if (this.users.length == 0) {
                  this.authenticationService.logout();
                  this.router.navigate(['/login']);
                }
              });
            },
            error => {
              Swal.fire({
                title: error,
                icon: 'error',
                showConfirmButton: false,
                timer: 1500
              });
            });
      }
    })
  }

  openUserForm(userId?: string) {
    if (userId == null)
      this.router.navigate(['/user-form']);
    else // Update Mode
      this.router.navigate(['/user-form'], { queryParams: { id: userId } });
  }
}
