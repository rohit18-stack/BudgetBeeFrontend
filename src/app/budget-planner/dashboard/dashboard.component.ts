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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddExpenseDialogComponent } from '../add-expense-dialog/add-expense-dialog.component';

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
  // newIncome: Partial<Income> = { amount: 0 };

  newIncome: Income = { amount: 0, id: 0, source: '', date: '' };

  expenses: any[] = []; // Array to hold expenses

  constructor(
    public router: Router,
    private http: HttpClient,
    private snackbar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.loadData();
  }

  onIncome() {
    // This method is no longer needed since we are handling the form directly in the template
  }

  // onExpense() {
  //   this.selectedSection = null;
  //   this.router.navigate(['/budget-planner/expense']);
  // }

  // Adding functionality to the "Add Expense" button...
  onExpense() {
    const dialogRef = this.dialog.open(AddExpenseDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.addExpense(result); // Add expense if result is not null
      }
    });
  }

  // Viewing of the 
  addExpense(expense: any) {
    this.expenses.push(expense); // Add new expense to the array
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
    // Check if the amount is negative
    if (this.newIncome.amount <= 0) {
      this.snackbar.open('Enter positive value', 'Close', { duration: 3000 });
      return; // Exit the function if the value is negative or zero
    }
  
    const newIncomeEntry: Income = {
      amount: this.newIncome.amount!,
      id: 0,
      // source: this.newIncome.source,
      // date: this.newIncome.date
      source: this.newIncome.source || '',  // Provide a default empty string
      date: this.newIncome.date || ''       // Similarly for date if needed
    };
  
    this.http.post<Income>('http://localhost:3000/income', newIncomeEntry).subscribe({
      next: (newIncome) => {
        this.income$.subscribe(incomes => {
          this.income$ = of([...incomes, newIncome]);
          this.calculateTotals();
        });
      },
      error: (error) => {
        console.error('Error adding income:', error);
        this.snackbar.open('Failed to add income. Please try again.', 'Close', { duration: 3000 });
      }
    });
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
