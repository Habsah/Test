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
    let backgroundColorsClasses = ['white-background', 'red-background', 'blue-background', 'yellow-background'];
    let selectedBackgroundColorClass = '';
    let selectedColor = $event.value;
    if (selectedColor == 'white')
      selectedBackgroundColorClass = 'white-background';
    if (selectedColor == 'red')
      selectedBackgroundColorClass = 'red-background';
    else if (selectedColor == 'blue')
      selectedBackgroundColorClass = 'blue-background';
    else if (selectedColor == 'yellow')
      selectedBackgroundColorClass = 'yellow-background';

    for (let color of backgroundColorsClasses) {
      $("#appContainer").removeClass(color);
    }
    $("#appContainer").addClass(selectedBackgroundColorClass);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
