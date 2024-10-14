import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import {MatTableModule} from "@angular/material/table"
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
// import { SidenavComponent } from './budget-planner/sidenav/sidenav.component';




@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,MatIconModule, MatTableModule, HttpClientModule,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'budget-planner';
}
