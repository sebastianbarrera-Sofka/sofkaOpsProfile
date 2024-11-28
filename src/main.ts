import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { environmentFirebase } from './app/auth/firebase/firebase-config';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authInterceptor } from './app/core/interceptors/auth.interceptor';




bootstrapApplication(AppComponent, {
  providers: [
    provideFirebaseApp(() => initializeApp(environmentFirebase.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    ),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    provideAnimationsAsync(), provideAnimationsAsync(), provideAnimationsAsync()
  ]
}).catch(err => console.error(err));
