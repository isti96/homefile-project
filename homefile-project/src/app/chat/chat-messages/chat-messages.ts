import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../socket.service';

interface ChatMessage {
  user: string;
  text: string;
  timestamp: string;
  senderId: string;
}

@Component({
  selector: 'app-chat-messages',
  template: `
    @for (msg of messages; track msg) {
      <div class="date">{{ msg.timestamp | date: 'dd.MM.yyyy HH:mm' }}</div>
      <div class="username-message-box">
        <span class="username" [class.my-message]="msg.senderId === socketService.myId">{{ msg.user }}</span>
        : <span class="message" >{{ msg.text }}</span>
      </div>
    }
  `,
  styleUrl: './chat-messages.css',
  standalone: true,
  imports: [CommonModule],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class ChatMessages {
  constructor(public socketService: SocketService) {}

  @Input() messages: ChatMessage[] = [];
}
