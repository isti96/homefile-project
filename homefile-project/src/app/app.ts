import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './socket.service';
import { ChatMessages } from './chat/chat-messages/chat-messages';
import { ChatInput } from './chat/chat-input/chat-input';

interface ChatMessage {
  user: string;
  text: string;
  timestamp: string;
  senderId: string;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatMessages, ChatInput],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  messages = signal<ChatMessage[]>([]);
  constructor(private socket: SocketService) {}

  ngOnInit() {
    this.socket.onMessage((msg: ChatMessage) => {
      this.messages.set([...this.messages(), msg]);
    });
  }

  send(message: ChatMessage) {
    this.socket.sendMessage(message);
  }
}
