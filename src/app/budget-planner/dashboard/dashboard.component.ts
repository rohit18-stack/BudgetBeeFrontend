import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { SideNavComponent } from '../side-nav/side-nav.component';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError, forkJoin, Observable, of } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { SidenavComponent } from "../sidenav/sidenav.component";
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

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

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    SideNavComponent,
    SidenavComponent,
    FormsModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: []
})
export class DashboardComponent implements OnInit {
  selectedSection: string | null = null;
  income$: Observable<Income[]> = of([]);
  expense$: Observable<Expense[]> = of([]);
  totalIncome = 0;
  totalExpenses = 0;
  totalSavings = 0;
  newIncome: Partial<Income> = { amount: 0 };

  constructor(
    public router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.loadData();
  }

  onIncome() {
    // This method is no longer needed since we are handling the form directly in the template
  }

  onExpense() {
    this.selectedSection = null;
    this.router.navigate(['/budget-planner/expense']);
  }

  onSavings() {
    this.selectedSection = 'savings';
    this.router.navigate(['/budget-planner/savings']);
  }

  loadData() {
    this.income$ = this.http.get<Income[]>('http://localhost:3000/income').pipe(
      catchError(() => of([]))
    );

    this.expense$ = this.http.get<Expense[]>('http://localhost:3000/expense').pipe(
      catchError(() => of([]))
    );

    forkJoin([this.income$, this.expense$]).subscribe(([incomes, expenses]) => {
      this.totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
      this.totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);
      this.totalSavings = this.totalIncome - this.totalExpenses;
    });
  }

  addIncome() {
    const newIncomeEntry: Income = {
      amount: this.newIncome.amount!,
      id: 0,
      source: '',
      date: ''
    };

    this.http.post<Income>('http://localhost:3000/income', newIncomeEntry).subscribe(newIncome => {
      this.income$.subscribe(incomes => {
        this.income$ = of([...incomes, newIncome]);
        this.calculateTotals();
      });
    });

    // Reset the form
    this.newIncome.amount = 0;
  }

  calculateTotals() {
    this.income$.subscribe(incomes => {
      this.totalIncome = incomes.reduce((acc, curr) => acc + curr.amount, 0);
      this.totalSavings = this.totalIncome - this.totalExpenses;
    });
  }

  get incomeData() {
    return this.income$ || of([]);
  }

  get expenseData() {
    return this.expense$ || of([]);
  }
}
