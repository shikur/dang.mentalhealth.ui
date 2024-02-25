import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { v4 as uuidv4 } from "uuid";
import { UserProfile } from './Interface/userprofile.interface';
import { Observable, from, of } from 'rxjs';
import { map } from 'rxjs/operators';
import axios from 'axios';



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
      session_id: "11001",         
      email: data.user,          
      patient_id: data.phone,
      client_type: "client1" ,          
      timestamp:  data.timestamp,
      message_id: uuidv4() ,          
      message_text: data.message ,     
      message_type: "none"

  };

      return this.http.post(url, body);
      
}

// async  combineResponses(url1:string, url2:string) {
 
//   try {
//     // Perform both fetch requests simultaneously
//     const [response1, response2] = await Promise.all([
//       fetch(url1),
//       fetch(url2)
//     ]);
//     const roomIds = response1["data"].map(item => item.roomid);

//     // Parse both responses as JSON
//     const data1 = await response1.data;
//     const data2 = await response2.data;

//     // Combine the JSON objects
//     // const combinedData = {
//     //   data1,
//     //   data2
//     // };

    // const combinedData = {
    //   data1: data1.data ? data1.data : data1, // Fallback to the whole object if 'data' field doesn't exist
    //   data2: data2.data ? data2.data : data2, // Same here
    // };

   
  // let data = response1.data
    // const extractUserAndRoom = (combinedData) => {
    //     return combinedData.map(item => ({
    //       userid: item.userid,
    //       roomid: item.roomid
    //     }));
    //   };
      
    //   // Extracting the data
    //  const userList = extractUserAndRoom(combinedData);
      

    // Use or return the combined data
//     return combinedData;
//   } catch (error) {
//     console.error("Error combining responses: ", error)
//     return error;
//   }
// }

// getUserProfiles(urluserprofile: string):Observable<UserProfile[]> 
// {
//   //const sessionrooms: UserProfile[] = [];
//     let sessionrooms = this.getUsers(urluserprofile);

//      const transformedData = sessionrooms.map(item => ({
//       ...item,
//       roomid: item.roomid.reduce((acc, current, index) => {
//           acc[index + 1] = current;
//           return acc;
//       }, {})
//   }));
  
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

//   return of(sessionrooms);

// }


  // // Mock function to simulate fetching user profiles
  // getUserProfiles(urlbaserooms:string, url2: string, phone:string): Observable<UserProfile[]> {

  //   // const rooms = this.getSessionRooms(urlbaserooms, phone)

  //   // let     data = rooms;

  //   // let userinfo = this.getUserInfo(url2, phone);
  //   // const profile = [{rooms: rooms, user:userinfo}]
     
  //   //const mockUserProfiles=null

  //   // const mockUserProfiles: UserProfile[] = []
  //   // const mockUserProfiles: UserProfile[] = [
  //   //   {
  //   //     id: 1,
  //   //     name: 'The Swag Coder',
  //   //     phone: '9876598765',
  //   //     image: 'assets/user/user-1.png',
  //   //     roomId: {
  //   //       2: 'room-1',
  //   //       3: 'room-2',
  //   //       4: 'room-3'
  //   //     }
  //   //   },
  //   //   {
  //   //     id: 2,
  //   //     name: 'Wade Warren',
  //   //     phone: '9876543210',
  //   //     image: 'assets/user/user-2.png',
  //   //     roomId: {
  //   //       1: 'room-1',
  //   //       3: 'room-4',
  //   //       4: 'room-5'
  //   //     }
  //   //   },
  //   //   {
  //   //     id: 3,
  //   //     name: 'Albert Flores',
  //   //     phone: '9988776655',
  //   //     image: 'assets/user/user-3.png',
  //   //     roomId: {
  //   //       1: 'room-2',
  //   //       2: 'room-4',
  //   //       4: 'room-6'
  //   //     }
  //   //   },
  //   //   {
  //   //     id: 4,
  //   //     name: 'Dianne Russell',
  //   //     phone: '9876556789',
  //   //     image: 'assets/user/user-4.png',
  //   //     roomId: {
  //   //       1: 'room-3',
  //   //       2: 'room-5',
  //   //       3: 'room-6'
  //   //     }
  //   //   }
  //   // ];
  //   urlbaserooms = urlbaserooms + "?search=" + phone;
  //   url2 = url2 + "?search=" + phone;
  //   //let dataroom = this.http.get(url);
  //   const momo =  this.combineResponses(urlbaserooms, url2).then(combinedData => console.log(combinedData));
  //   const mockUserProfiles: UserProfile[] = []
  //   return of(mockUserProfiles);
  // }

  // getSessionRooms( url:string, phone:string,): Observable<any> {
  //   url = "http://localhost:5000/api/session/user"
    
  //   const sessionrooms: UserProfile[] = [];
  //   url = url + "?search=" + phone;
  //   let dataroom = this.http.get(url);

  //   return of(dataroom);
  // }

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
