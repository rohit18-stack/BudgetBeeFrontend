

import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { Router } from '@angular/router';

@Component({
  selector: 'nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  imports: [MatIconModule, MatMenuModule] 
})
export class NavComponent {
  constructor(private router: Router) {}

  onDash() {
    this.router.navigate(['/budget-planner/dashboard']);
  }

  onProfile() {
    this.router.navigate(['/budget-planner/profile']);
  }

  onLogout() {
    this.router.navigate(['/budget-planner/login']);
  }
}
