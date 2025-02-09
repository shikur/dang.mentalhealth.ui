
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

import { DataforanylticsService} from '../services/dataforanyltics.service'
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private socket: Socket;
  private dataforanylticesService!: DataforanylticsService;

  private url = environment.api.socketurl// your server local path


  constructor() {
    this.socket = io(this.url, {transports: ['websocket', 'polling', 'flashsocket']});
  }


  joinRoom(data: any): void {
    this.socket.emit('join', data);
  }

  sendMessage(data: any): void {

    this.socket.emit('message', data);

    // console.log(data)

    // this.savedaToanalytics(data);


  }

  savedaToanalytics(data: any): void {

    this.dataforanylticesService.postData(this.url, data).subscribe({
      next: (response) => console.log('Success:', response),
      error: (error) => console.error('Error:', error)
    });

  }


  getMessage(): Observable<any> {
    return new Observable<{user: string, message: string}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });

      return () => {
        this.socket.disconnect();
      }
    });
  }

  getStorage() {
    const storage: any = localStorage.getItem('chats');
    return storage ? JSON.parse(storage) : [];
  }

  setStorage(data: any) {
    localStorage.setItem('chats', JSON.stringify(data));
  }

}
