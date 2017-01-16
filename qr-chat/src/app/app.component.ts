import { Component } from '@angular/core';
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';
import { FacebookService, FacebookInitParams } from 'ng2-facebook-sdk';
import { Http, Response} from '@angular/http';
import 'sendbird';

import {MessageComponent} from './message/message.component'
 
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
  isChatLoading: boolean = true;
  sb: SendBird_Instance;
  sbChannel: any = {};
  userProfileImageURL: string;

  messages: any;

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

    this.sb = new SendBird({
      appId : 'D38398C8-DDD4-46E7-91B0-81F121F49AB3'
    });

    let a = this.user.subscribe(
      userEdited => userEdited.tokenData ? this.searchFacebookData(userEdited) : {},
      error => console.log("error has occured", error),
      () => console.log("its done"));  
  }

  setUser(data: any){
    this.isFacebookLoading = false;
    this.fbUser = {
      name: data.name,
      profileImage: data.picture.data.url
    }
  }

  searchFacebookData(userData: User): void{
    
    console.log("searching", userData);
    this.isFacebookLoading = true;

    let params = {
      access_token : userData.tokenData.authToken,
      fields : 'id,name,picture'
    }

    this.fb.api('/me', "get", params).then(
      (result) => this.setChat(result),
      (error) => {console.log(error)}
    )
  }

  setChat(fbData:any): void{
    this.setUser(fbData);
    this.sb.connect(this.userId, (r) => {
      this.updateUserData();
      this.sb.OpenChannel.getChannel('main_channel', (channel,error)=> {
        this.getPreviousMessages(channel);
        this.registerListener(channel);
        this.isChatLoading = false;
      });
    });
  }

  getPreviousMessages(channel: OpenChannel):void{
    console.log(channel);
    let messageList = channel.createPreviousMessageListQuery();
    messageList.load(20, true, (messages, error)=> {
      this.messages = messages;
      console.log(messages);
    })
  };

  registerListener(channel):void{
    var ChannelHandler = new this.sb.ChannelHandler();

    ChannelHandler.onMessageReceived = function(channel, message){
        console.log(channel, message);
        //add message
        this.addMessage(message);
    };

    this.sb.addChannelHandler('message_received', ChannelHandler);
  }

  addMessage(message: any): void{
    this.messages.push(message);
  }

  sendMessage():void{
    //dohvati poruku sa frontenda
    //posalji ju
    //success addMessage()
  }

  updateUserData():void{
      this.sb.updateCurrentUserInfo(this.fbUser.name, this.fbUser.profileImage);
  }

  
}


// WEBPACK FOOTER //
// C:/Users/mbojcic/Documents/Visual Studio 2015/Projects/QRChat/qr-chat/src/app/app.component.ts


// WEBPACK FOOTER //
// C:/Users/mbojcic/Documents/Visual Studio 2015/Projects/QRChat/qr-chat/src/app/app.component.ts