// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { MatSnackBar } from '@angular/material/snack-bar';

// @Component({
//   selector: 'app-login',
//   standalone: true,
//   imports: [ReactiveFormsModule,CommonModule],
//   templateUrl: './login.component.html',
//   styleUrl: './login.component.scss'
// })
// export class LoginComponent {
// loginForm:any;
// registerForm:any;
// activeForm: 'login' | 'register' = 'login';

// constructor( private fb: FormBuilder,
//   private router: Router,
//   private snackBar: MatSnackBar){}
// ngOnInit() {
//   this.loginForm = this.fb.group({
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', Validators.required]
//   });

//   this.registerForm = this.fb.group({
//     username: ['', Validators.required],
//     email: ['', [Validators.required, Validators.email]],
//     password: ['', Validators.required]
//   });
// }

// toggleForm(form: 'login' | 'register') {
//   this.activeForm = form;
// }

// login() {
//   if (this.loginForm.valid) {
//     console.log("Login info==>", this.loginForm.value);
//     this.router.navigate(['/budget-planner/dashboard']);
//   } else {
//     this.snackBar.open('Invalid email or password!', 'Close', { duration: 3000 });
//   }
// }
// register() {
//   if (this.registerForm.valid) {
//     console.log("Register info==>>", this.registerForm.value);
//     setTimeout(() => {
//       window.location.reload();
//     }, 2000);
//     this.router.navigate(['/budget-planner/login']);
//   } else {
//     this.snackBar.open('Please fill in all fields correctly!', 'Close', { duration: 3000 });
//   }
// }


// }



import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'], // Corrected from styleUrl to styleUrls
})
export class LoginComponent {
  loginForm: any;
  registerForm: any;
  activeForm: 'login' | 'register' = 'login';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private snackBar: MatSnackBar,
    private http: HttpClient // Inject HttpClient
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });

    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  toggleForm(form: 'login' | 'register') {
    this.activeForm = form;
  }

  login() {
    if (this.loginForm.valid) {
      this.http.post('http://localhost:8080/login', this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login info==>', response);
          this.router.navigate(['/budget-planner/dashboard']);
        },
        error: () => {
          this.snackBar.open('Invalid email or password!', 'Close', { duration: 3000 });
        },
      });
    }
  }

  register() {
    if (this.registerForm.valid) {
      this.http.post('http://localhost:8080/register', this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Register info==>>', response);
          this.snackBar.open('Registration successful!', 'Close', { duration: 3000 });
          setTimeout(() => {
            this.toggleForm('login'); // Switch to login form
          }, 2000);
        },
        error: () => {
          this.snackBar.open('Please fill in all fields correctly!', 'Close', { duration: 3000 });
        },
      });
    }
  }
}

