import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ChatStorageService {
  private storageArray: any[] = [];

  getStorage(): any[] {
    return JSON.parse(localStorage.getItem('chatStorage') || '[]');
  }

  setStorage(data: any[]): void {
    localStorage.setItem('chatStorage', JSON.stringify(data));
  }

  updateChat(roomId: string, user: string, message: string): void {
    this.storageArray = this.getStorage();
    const storeIndex = this.storageArray.findIndex(storage => storage.roomId === roomId);

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({ user, message });
    } else {
      this.storageArray.push({ roomId, chats: [{ user, message }] });
    }

    this.setStorage(this.storageArray);
  }
}
