import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  imports:[ReactiveFormsModule]
})
export class AddExpenseDialogComponent {
  expenseForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddExpenseDialogComponent>,
    private fb: FormBuilder
  ) {
    this.expenseForm = this.fb.group({
      category: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(0)]],
      date: ['', Validators.required],
    });
  }

  addExpense() {
    if (this.expenseForm.valid) {
      const newExpense = this.expenseForm.value;
      this.dialogRef.close(newExpense); // Close with new expense data
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}



