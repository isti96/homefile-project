import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from '../environments/environment';

interface ChatMessage {
  user: string;
  text: string;
  timestamp: string;
  senderId: string;
}

@Injectable({ providedIn: 'root' })
export class SocketService {
  private socket: Socket;
  public myId: string | undefined;

  constructor() {
    this.socket = io(environment.apiUrl);
    this.socket.on('connect', () => {
      this.myId = this.socket.id;
    });
  }

  sendMessage(msg: ChatMessage) {
    this.socket.emit('message', {
      user: msg.user,
      text: msg.text,
      timestamp: msg.timestamp,
      senderId: this.socket.id,
    });
  }

  onMessage(callback: (msg: ChatMessage) => void) {
    this.socket.on('message', callback);
  }
}
