

import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-expense-dialog',
  templateUrl: './add-expense-dialog.component.html',
  styleUrls: ['./add-expense-dialog.component.scss'],
  imports:[ReactiveFormsModule]
})
export class AddExpenseDialogComponent {
  expenseForm: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<AddExpenseDialogComponent>,
    private fb: FormBuilder
  ) {
    this.expenseForm = this.fb.group({
      description: ['', Validators.required],
      category: ['', Validators.required],
      subcategory: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      modeOfPayment: ['', Validators.required],
      date: ['', Validators.required]
    });
  }

  addExpense() {
    if (this.expenseForm.valid) {
      this.dialogRef.close(this.expenseForm.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

