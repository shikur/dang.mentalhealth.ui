import { Injectable } from '@angular/core';
import { v4 as uuidv4 } from 'uuid';

@Injectable({
  providedIn: 'root'
})
export class SessionchatService {

  constructor() {
    this.createSessionId();
  }

  createSessionId() {
    const sessionId = uuidv4(); // Generate a unique session ID
    sessionStorage.setItem('sessionId', sessionId); // Store the session ID
  }

  getSessionId() {
    return sessionStorage.getItem('sessionId'); // Retrieve the session ID
  }
}
