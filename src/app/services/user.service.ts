import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = environment.api.sessionUser;
  private chatSaveUrl = environment.api.chatSave;
  private clientProfilesUrl = environment.api.clientProfiles;
  private getUserListurl = environment.api.getUserList;

  constructor() {}

  // Function to get API URL
  getApiUrl(): string {
    return this.apiUrl;
  }

  // Function to get Chat Save URL
  getChatSaveUrl(): string {
    return this.chatSaveUrl;
  }

  // Function to get Client Profiles URL
  getClientProfilesUrl(): string {
    return this.clientProfilesUrl;
  }

  // Function to get User List URL
  getUserListUrl(): string {
    return this.getUserListurl;
  }
}
