import { AuthenticationService } from 'src/services/authentication.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentUser: User;
  constructor(private router: Router, private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  ngOnInit(): void {

  }

  changeBackgroundColor($event) {
    let selectedColor = $event.value;
    document.body.style.setProperty('--bg-color',selectedColor);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
