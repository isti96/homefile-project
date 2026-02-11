import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';

interface ChatMessage {
  user: string;
  text: string;
}

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('http://localhost:3000');
  }

  sendMessage(msg: ChatMessage) {
    this.socket.emit('message', {
      user: msg.user,
      text: msg.text,
    });
  }

  onMessage(callback: (msg: ChatMessage) => void) {
    this.socket.on('message', callback);
  }
}
