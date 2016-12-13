import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
//import {QRCodeComponent} from 'angular2-qrcode';

export class User{
  userId: string;
  token1: string;
  token2: string;
}

@Component({
  selector: 'app-root',
  //providers: [QRCodeComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app works!';
  user: FirebaseObjectObservable<User>;

  constructor(af: AngularFire) {
    var userId = af.database.list('/').$ref.ref.child('/users').push().key;

    this.user = af.database.object('/users/' + userId);

    this.user.set({userId: userId});
  }
}
