import { Component, Input } from '@angular/core';

@Component({
  selector: 'single-message',
  templateUrl: './message.component.html'
})
export class MessageComponent {
    @Input() message:any;
}