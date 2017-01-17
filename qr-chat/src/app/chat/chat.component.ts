import { Component, OnInit, Input } from '@angular/core';
import 'sendbird';

import {MessageComponent} from '../message/message.component'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.sass']
})
export class ChatComponent implements OnInit {
  isChatLoading: boolean;
  private sb:SendBird_Instance;
  sbChannel:any = {};
  @Input() fbUserData:any;
  messages:any;

  constructor() { }
  

  ngOnInit() {
    this.isChatLoading = true;
    this.sb = new SendBird({
      appId : 'D38398C8-DDD4-46E7-91B0-81F121F49AB3'
    });
    this.setChat();
  }

  setChat():void{
    this.sb.connect(this.fbUserData.userId, (r)=>{
      this.sb.updateCurrentUserInfo(this.fbUserData.name, this.fbUserData.profileImage)
      this.sb.OpenChannel.getChannel('main_channel', (channel,error)=> {
        this.getPreviousMessages(channel);
        channel.enter( (response, error) => {
          if (error) {
            console.error(error);
            return;
          }
          this.setListener();
        });
      });
    });
  }

  setListener():void{
    let setMsg = (msg: any) => this.addMessage(msg);

    var ChannelHandler = new this.sb.ChannelHandler();
    ChannelHandler.onMessageReceived = function(channel, message){
      console.log('ChannelHandler.onMessageReceived');
      setMsg(message);
    };
    ChannelHandler.onMessageDeleted = function(channel, messageId){
      console.log('ChannelHandler.onMessageDeleted: ', channel, messageId);
    }
    ChannelHandler.onReadReceiptUpdated = function (channel) {
      console.log('ChannelHandler.onReadReceiptUpdated: ', channel);
    }

    this.sb.addChannelHandler('channel', ChannelHandler);
  }

  getPreviousMessages(channel: OpenChannel): void{
    let messageList = channel.createPreviousMessageListQuery();
    messageList.load(20, true, (messages, error)=> {
      this.messages = messages.reverse();
      this.isChatLoading = false;
    })
  }

  addMessage(message: any): void{
      this.messages.push(message);
  }

  sendMessage(message:any):void{
    let sendingMessage = message;
    this.sb.OpenChannel.getChannel('main_channel', ((channel:OpenChannel,error)=> {
        channel.enter( (response, error) => {
          if (error) {
            console.error(error);
            return;
          }
        });
        channel.sendUserMessage(sendingMessage, (message, error)=>{
          if (error) {
            console.error(error);
            return;
          }
          this.addMessage(message);
        })
    }));
  }
}



// WEBPACK FOOTER //
// C:/Users/mbojcic/Documents/Visual Studio 2015/Projects/QRChat/qr-chat/src/app/chat/chat.component.ts