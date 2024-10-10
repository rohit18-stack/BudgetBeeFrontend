import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { HttpClientModule } from '@angular/common/http'; 
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, appConfig )
  .catch((err) => console.error(err));


// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { HttpClientModule } from '@angular/common/http';
// import { appConfig } from './app/app.config';

// bootstrapApplication(AppComponent, {
//   providers: [HttpClientModule, ...appConfig.providers], // Include HttpClientModule here
// })
// .catch((err) => console.error(err));


// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app.component';
// import { HttpClientModule } from '@angular/common/http'; // Import HttpClientModule
// import { provideHttpClient } from '@angular/common/http'; // Import provideHttpClient

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideHttpClient() // Add HttpClient to the providers
//   ]
// })
// .catch((err) => console.error(err));
