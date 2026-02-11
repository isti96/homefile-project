import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SocketService } from './socket.service';

interface ChatMessage {
  user: string;
  text: string;
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  constructor(private socket: SocketService) {}
  messages: ChatMessage[] = [];

  ngOnInit() {
    this.socket.onMessage((msg: ChatMessage) => {
      this.messages.push(msg);
    });
  }

  send() {
    this.socket.onMessage((msg) => {
      this.messages.push(msg);
    });
  }
}
