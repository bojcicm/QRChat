import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularFireModule } from 'angularfire2';
import { AppComponent } from './app.component';
import { FacebookService } from 'ng2-facebook-sdk';

import { MessageComponent } from './message/message.component';
import { ChatComponent } from './chat/chat.component';

// Must export the config
export const firebaseConfig = {
    apiKey: 'AIzaSyAxwfi_K3RSaFFxM9ZH8G_PdFODB6aJR5A',
    authDomain: 'qr-chat.firebaseapp.com',
    databaseURL: 'https://qr-chat.firebaseio.com',
    storageBucket: 'qr-chat.appspot.com',
    messagingSenderId: '63654247789'
  };

@NgModule({
  declarations: [
    AppComponent,
    MessageComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  providers: [
    FacebookService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
