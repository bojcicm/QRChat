import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { QRCodeModule } from 'angular2-qrcode';


import { AppComponent } from './app.component';

// Must export the config
export const firebaseConfig = {
    apiKey: "AIzaSyAxwfi_K3RSaFFxM9ZH8G_PdFODB6aJR5A",
    authDomain: "qr-chat.firebaseapp.com",
    databaseURL: "https://qr-chat.firebaseio.com",
    storageBucket: "qr-chat.appspot.com",
    messagingSenderId: "63654247789"
  };

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
