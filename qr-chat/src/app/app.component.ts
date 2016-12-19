import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
 
// http://zyramedia.github.io/ng2-facebook-sdk/

export class User {
  userId: string;
  tokenData: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app works!';
  userQrCodeUrl: string = '';
  user: FirebaseObjectObservable<User>;
  isFacebookLoading: boolean = false;

  constructor(af: AngularFire) {
    let userId = af.database.list('/').$ref.ref.child('/users').push().key;
    this.user = af.database.object('/users/' + userId);
    this.userQrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?data=' + userId + '&size=150x150&format=svg';
    this.user.set({userId: userId});


    let a = this.user.subscribe(
      userEdited => userEdited.tokenData ? this.searchFacebookData(userEdited) : console.log('user removed'),
      error => console.log("error has occured", error),
      () => console.log("its done"));  
  }

  searchFacebookData(userData: User): void{
    console.log(userData.tokenData);
    this.isFacebookLoading = true;

    //load Facebook data
    //isFacebookLoading = false;

  }
}
