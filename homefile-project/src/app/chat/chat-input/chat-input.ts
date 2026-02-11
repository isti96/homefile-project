import { Component, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface ChatMessage {
  user: string;
  text: string;
  timestamp: string;
  senderId: string;
}

@Component({
  selector: 'app-chat-input',
  template: `
    <div class="input-area">
      <input [(ngModel)]="name" placeholder="Your name" />
      <input [(ngModel)]="message" placeholder="Type message..." />
      <button (click)="send()">Send</button>
    </div>
  `,
  styleUrl: './chat-input.css',
  imports: [FormsModule],
})
export class ChatInput {
  name = '';
  message = '';

  @Output() messageSent = new EventEmitter<ChatMessage>();

  send() {
    if (!this.name.trim() || !this.message.trim()) return;

    this.messageSent.emit({
      user: this.name,
      text: this.message,
      timestamp: new Date().toISOString(),
      senderId: '',
    });

    this.message = '';
  }
}
