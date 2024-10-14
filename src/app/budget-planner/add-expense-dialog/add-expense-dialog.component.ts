// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-add-expense-dialog',
//   standalone: true,
//   imports: [],
//   templateUrl: './add-expense-dialog.component.html',
//   styleUrl: './add-expense-dialog.component.scss'
// })
// export class AddExpenseDialogComponent {

// }


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
      this.dialogRef.close(this.expenseForm.value);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }
}

