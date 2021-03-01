import { Component, OnInit } from '@angular/core';

import { environment } from '@env';
import { Observable } from 'rxjs';
import { ThemeService } from 'app/core/service/theme.service';
import { Router } from '@angular/router';
import { AuthService } from '@app/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  public version = environment.version;

  navItems = [{ link: '/dashboard/home', title: 'Home' }];

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  toggleTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }
  logout() {
    this.authService.logout();
  }
}
