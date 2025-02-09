import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserProfile } from  '../Interface/userprofile.interface';
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  postData(url: string, data: any) {

    let body = {
      chatid:0,
      org_id: data.user,
      agent_id: data.agent_id,
      roomid:data.room,
      phone: data.phone,
      session_id: data.session_id,
      email: data.user,
      patient_id: data.phone,
      client_type: data.client_type ,
      timestamp:  data.timestamp,
      message_id: uuidv4() ,
      message_text: data.message ,
      message_type: data.message_type

  };

      return this.http.post(url, body);

}
  private getuserlist = environment.api.getUserList;

  constructor(private http: HttpClient) {}

  getUserProfiles(phone: string): Observable<UserProfile[]> {
    const url = `${this.getuserlist}?phone=${phone}`;
    return this.http.get<UserProfile[]>(url);
  }
}
function uuidv4() {
  throw new Error('Function not implemented.');
}

