import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidenav',
  standalone: true,
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  constructor(private router: Router) {}

  navigateTo(section: string) {
    this.router.navigate([section]);
  }
}

