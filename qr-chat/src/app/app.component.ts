import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { FacebookService, FacebookInitParams } from 'ng2-facebook-sdk';
import { Http, Response } from '@angular/http';

import { ChatComponent } from './chat/chat.component'

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
  userQrCodeUrl: string = '';
  userId:string;
  user: FirebaseObjectObservable<User>;
  fbUser: any;
  isFacebookLoading: boolean = false;
  isChatLoading: boolean = true;
  

  constructor(af: AngularFire, private fb: FacebookService, private http: Http) {
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
      userEdited => userEdited.tokenData ? this.searchFacebookData(userEdited) : {},
      error => console.log("error has occured", error),
      () => console.log("its done"));  
  }

  setUser(data: any){
    this.fbUser = {
      userId: this.userId,
      name: data.name,
      profileImage: data.picture.data.url
    }
  }

  searchFacebookData(userData: User): void{
    this.isFacebookLoading = true;
    let params = {
      access_token : userData.tokenData.authToken,
      fields : 'id,name,picture'
    }
    this.fb.api('/me', "get", params).then(
      (result) => {
        this.setUser(result);
        this.isFacebookLoading = false;
        this.isChatLoading = false;
      },
      (error) => {
        console.log(error);
      }
    )
  }
}