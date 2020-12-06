import { Component } from '@angular/core';
import { AuthService } from './core/features/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  isLoggedIn: boolean;
  
  constructor(private authService: AuthService) {
    this.isLoggedIn = this.authService.checkLoginStatus();
    console.log(this.isLoggedIn);
    
  }


}
