import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocketService } from '../../socket.service';

interface ChatMessage {
  user: string;
  text: string;
}

@Component({
  selector: 'app-chat-messages',
  template: `
    @for (msg of messages; track msg) {
      <div>{{ msg.user }}: {{ msg.text }}</div>
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
