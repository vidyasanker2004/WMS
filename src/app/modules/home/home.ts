import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/authservice';
import { RouterModule, Router, NavigationEnd } from '@angular/router';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class HomeComponent implements OnInit {
  // Navigation states
  ishomeExpanded = false;
  isMastersExpanded = false;
  
  // User info
  username: string | null = null;
  
  // Show home content flag
  showHomeContent = true;
  
  // Navigation items
  homeLinks = [
    { path: '/home', title: 'Home' },
  ];
  
  masterLinks = [
    { path: '/home/company', title: 'Company' },
    { path: '/home/countries', title: 'Countries' },
    { path: '/home/states', title: 'States' }
  ];

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.auth.currentUser$.subscribe(user => {
      this.username = user?.username || null;
    });

    // Initial check for current route
    const initialUrl = this.router.url;
    this.showHomeContent = initialUrl === '/home' || initialUrl === '/';

    // Subscribe to route changes
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      // Hide home content if we're not exactly on the home route
      const url = event.urlAfterRedirects || event.url;
      this.showHomeContent = url === '/home' || url === '/';
    });
  }

  togglehome(): void {
    this.ishomeExpanded = !this.ishomeExpanded;
    // Close Masters menu when opening Home menu
    if (this.ishomeExpanded) {
      this.isMastersExpanded = false;
    }
  }

  toggleMasters(): void {
    this.isMastersExpanded = !this.isMastersExpanded;
    // Close Home menu when opening Masters menu
    if (this.isMastersExpanded) {
      this.ishomeExpanded = false;
    }
  }

  logout(): void {
    this.auth.logout();
  }
}