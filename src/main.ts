import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDzksLffdOrGcMMFJXMZJAiv6MaZxKlLug",
  authDomain: "lista-de-alimentos.firebaseapp.com",
  databaseURL: "https://lista-de-alimentos-default-rtdb.firebaseio.com",
  projectId: "lista-de-alimentos",
  storageBucket: "lista-de-alimentos.appspot.com",
  messagingSenderId: "465265602418",
  appId: "1:465265602418:web:c7bc8dfa9cf0f3ac5037eb",
  measurementId: "G-F8GV7QWMCB"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
