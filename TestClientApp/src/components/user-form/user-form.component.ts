import Swal from 'sweetalert2';
import { UserService } from 'src/services/user.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/models/user';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { Gender } from 'src/models/gender';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  userForm: FormGroup;
  userId: string;
  genders = [{ value: Gender.male, text: "ذكر" }, { value: Gender.female, text: "أنثى" }];
  updateMode = false;
  submitted = false;
  submitButtonText = 'إضافة';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    private formBuilder: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: [''],
      password: [''],
      fullname: [''],
      age: [''],
      gender: [''],
      birthDate: ['']
    });
    this.route.queryParams.subscribe(params => {
      this.userId = params['id'];
      if (this.userId) {
        this.updateMode = true;
        this.submitButtonText = 'تعديل';
        this.userService.getUser(this.userId)
          .subscribe(
            (user: User) => {
              this.userForm.controls.username.setValue(user.userName);
              this.userForm.controls.password.setValue(user.password);
              this.userForm.controls.fullname.setValue(user.fullName);
              this.userForm.controls.age.setValue(user.age);
              this.userForm.controls.gender.setValue(user.gender);
              this.setGenderTextManually();
              this.userForm.controls.birthDate.setValue(this.parseDateToNgbDate(user.birthDate));
            },
            error => {
              console.log(error);
            });
      }
    });

  }

  get form() { return this.userForm.controls; }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    if (this.updateMode) {
      this.userService.updateUser(this.user)
        .subscribe(
          data => {
            Swal.fire({
              title: 'تم تعديل المستخدم بنجاح',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
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
    else {
      this.userService.addUser(this.user)
        .subscribe(
          data => {
            Swal.fire({
              title: 'تمت إضافة المستخدم بنجاح',
              icon: 'success',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/users']);
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
  }

  get user(): User {
    let user = new User();
    if (this.userId != null)
      user.id = this.userId;
    if (!this.updateMode) {
      user.userName = this.form.username.value;
      user.password = this.form.password.value;
    }
    user.fullName = this.form.fullname.value;
    user.age = this.form.age.value;
    user.gender = this.form.gender.value;
    user.birthDate = this.parseNgbDateToJsDate(this.form.birthDate.value);
    return user;
  }

  parseDateToNgbDate(date) {
    if (date != null) {
      let jsDate = new Date(date);
      return new NgbDate(jsDate.getFullYear(), jsDate.getMonth() + 1, jsDate.getDate());
    }
  }

  parseNgbDateToJsDate(ngbDate) {
    if (ngbDate != null) {
      return new Date(Date.UTC(ngbDate.year, ngbDate.month - 1, ngbDate.day));
    }
  }

  setGenderTextManually($event?) {
    let gender;
    if ($event)
      gender = $event.value;
    else
      gender = this.form.gender.value;

    if (gender == Gender.male)
      $('#genderSelect .mat-select-value-text span').html("ذكر");
    if (gender == Gender.female)
      $('#genderSelect .mat-select-value-text span').html("أنثى");
  }
}
