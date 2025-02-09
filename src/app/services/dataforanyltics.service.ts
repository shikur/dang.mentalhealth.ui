import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from "uuid";
import { UserProfile } from '../Interface/userprofile.interface';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import axios from 'axios';

// const fs = require('fs');
// const path = require('path');



@Injectable({
  providedIn: 'root'
})
export class DataforanylticsService {

  constructor(private http: HttpClient) {
       }

  postData(url: string, data: any) {

    let body = {
      chatid:0,
      org_id: data.user,
      agent_id: "doctor",
      roomid:data.room,
      phone: data.phone,
      session_id: this.generateCustomString(),
      email: data.email,
      patient_id: data.phone,
      client_type: "client1" ,
      timestamp:  data.timestamp,
      message_id: uuidv4() ,
      message_text: data.message ,
      message_type: "none",


  };

      return this.http.post(url, body);

}

generateCustomString() {
  const now = new Date();

  // Extract hours and minutes
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const hh_mm = `${hours}_${minutes}`;

  // Extract month, day, and year
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are zero-based in JavaScript
  const day = String(now.getDate()).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2); // Get last two digits of the year
  const mm_dd_yy = `${month}_${day}_${year}`;

  // Generate a random number
  const randomNumber = Math.floor(Math.random() * 1000000); // Generates a random number between 0 and 999999

  // Combine the components
  const customString = `${hh_mm}-${mm_dd_yy}-${randomNumber}`;

  return customString;
}

getUserProfiles(urlUserProfile: string): Observable<UserProfile[]> {
  // Convert the axios promise to an Observable
  return from(axios.get(urlUserProfile))
    .pipe(
      map(response => {
        // Assuming the response data is the array of UserProfile objects
        if (response.status === 200 && Array.isArray(response.data)) {
          return response.data as UserProfile[];
        } else {
          throw new Error('Failed to load user profiles');
        }
      })
    );
}

  getUserInfo(url: string): Observable<UserProfile[]> {
    //url = `${url}/${clientId}`;
    // Use pipe and map to transform the Observable returned by this.http.get
    return this.http.get<any[]>(url).pipe(
      map(data => {
        let nextId = 1; // Starting ID for UserProfile objects
        return data.map(profile => {
          const roomIdObject = profile.roomid.reduce((acc: { [x: string]: any; }, roomId: any, index: number) => {
            acc[index + 1] = roomId; // Use index+1 as key for roomId object
            return acc;
          }, {} as { [key: number]: string });

          const imagfile = 'assets/user/' + profile.phone + '.png'
          // const filePath = path.join(__dirname, 'assets/user', profile.phone + '.png');

          //       fs.access(filePath, fs.constants.F_OK, (err: any) => {
          //         if (err) {
          //           console.error('File does not exist');
          //         } else {
          //           console.log('File exists');
          //         }
          //       });

          const userProfile: UserProfile = {
            id: nextId++,
            name: profile.name,
            phone: profile.phone,
            image: imagfile,
            roomId: roomIdObject
          };

          return userProfile;
        });
      })
    );
  }


  // getUsers(url:string)
  // {
  //   //const sessionrooms: UserProfile[] = [];
  //   //url = url + "/" + clientid;
  //   const response = this.http.get(url);
  //   console.log(response)



  // // console.log(JSON.stringify(transformedData, null, 2));

  //   return of(response);
  // }


}
