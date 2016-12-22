import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { FacebookService, FacebookInitParams } from 'ng2-facebook-sdk'
 
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
  userId:string;
  user: FirebaseObjectObservable<User>;
  fbUser: any;
  isFacebookLoading: boolean = false;

  constructor(af: AngularFire, private fb: FacebookService) {
    let userId = af.database.list('/').$ref.ref.child('/users').push().key;
    this.userId = userId;
    this.user = af.database.object('/users/' + userId);
    this.user.set({"userId" : this.userId});
    this.userQrCodeUrl = 'https://api.qrserver.com/v1/create-qr-code/?data=' + userId + '&size=150x150&format=svg';

    let fbParams: FacebookInitParams = {
      appId: '1247045158649026',
      xfbml: true,
      version: 'v2.6'
    };
    this.fb.init(fbParams);


    let a = this.user.subscribe(
      userEdited => userEdited.tokenData ? this.searchFacebookData(userEdited) : console.log('user removed'),
      error => console.log("error has occured", error),
      () => console.log("its done"));  
  }

  setUser(data: any){
    this.isFacebookLoading = false;
    this.fbUser = {
      name: data.name
    }
  }

  searchFacebookData(userData: User): void{
    this.isFacebookLoading = true;

    let params = {
      access_token : userData.tokenData.authToken
    }

    this.fb.api('/me', "get", params).then(
      (result) => {this.setUser(result)},
      (error) => {console.log(error)}
    )
  }

  
}
