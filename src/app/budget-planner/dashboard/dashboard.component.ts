import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule, provideHttpClient } from '@angular/common/http';
import { catchError, forkJoin, Observable, of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { SidenavComponent } from "../sidenav/sidenav.component";

interface Income {
  id: number;
  source: string;
  amount: number;
  date: string;
}

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
}

interface Savings {
  id: number;
  amount: number;
  date: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatIconModule, SideNavComponent, CommonModule, MatTableModule, HttpClientModule, SidenavComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [],
})

export class DashboardComponent implements OnInit {
  selectedSection: string | null = null;
  constructor(public router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.loadData();
  }
  onIncome() {
    this.selectedSection = null; 
    this.router.navigate(['/budget-planner/income']);
  }
  
  onExpense() {
    this.selectedSection = null;
    this.router.navigate(['/budget-planner/expense']);
  }
  
  onTodo() {
    this.selectedSection = null;
    this.router.navigate(['/budget-planner/todo']);
  }

  onSavings() {
    this.selectedSection = 'savings';
    this.router.navigate(['/budget-planner/savings']);
  }

  income$: Observable<Income[]> = of([]); // Initialize with empty array
  expense$: Observable<Expense[]> = of([]);
  // savings$!: Observable<Savings[]>;
  totalIncome = 0;
  totalExpenses = 0;
  totalSavings = 0;


  loadData() {
    this.income$ = this.http.get<Income[]>('http://localhost:3000/income').pipe(
      catchError(() => of([])) // Return an empty array on error
    );

    this.expense$ = this.http.get<Expense[]>('http://localhost:3000/expense').pipe(
      catchError(() => of([])) // Return an empty array on error
    );

    forkJoin([this.income$, this.expense$]).subscribe(([incomes, expenses]) => {
      this.totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
      this.totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
      this.totalSavings = this.totalIncome - this.totalExpenses; // Calculate savings
    });
  }

  get incomeData() {
    return this.income$ || of([]);  // Fallback to an empty observable if income$ is null
  }

  get expenseData() {
    return this.expense$ || of([]);
  }

  // get savingsData() {
  //   return this.savings$ || of([]);
  // }

}

