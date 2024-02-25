
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';

import { DataforanylticsService} from './dataforanyltics.service'


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  //const url2 = 'http://localhost:3000/postData'
  private socket: Socket;
  private dataforanylticesService!: DataforanylticsService;
  //private http: HttpClient = new HttpClient(this.url2);
  private url = 'http://localhost:3000'; // your server local path
  private urlanlatics = 'http://localhost:5000/api/chat/save'

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
