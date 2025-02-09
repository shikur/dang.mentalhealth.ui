import { Component, VERSION, inject ,OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { CommonModule, NgClass,  } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ChatService } from './services/chat.service';
import { FormsModule } from '@angular/forms';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import {DataforanylticsService} from  './services/dataforanyltics.service'
import { UserProfile } from './Interface/userprofile.interface';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgbModalModule, NgClass],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {

  @ViewChild('popup', {static: false}) popup: any;
  private userProfile!: UserProfile;
  public roomId: string='';
  public messageText?: string;

  public messageArray: { user: string, message: string }[] = [];
  private storageArray: any[] = [];


  public showScreen: boolean = false ;
  public phone: string="";
  public currentUser: any ;
  public selectedUser: any ;

  private chatSave =environment.api.chatSave;
  private getuserlist = environment.api.getUserList;

  userList:UserProfile[] = [];

  constructor(
    private modalService: NgbModal,
    private chatService: ChatService,
    private dataforanylticsService : DataforanylticsService

  ) {  }
  ngOnInit(): void {

    this.chatService.getMessage()
    .subscribe((data: { user: string, room: string, message: string }) => {
      this.messageArray.push(data);
      if (this.roomId) {
        setTimeout(() => {
          this.storageArray = this.chatService.getStorage();
          const storeIndex = this.storageArray
            .findIndex((storage: { roomId: any; }) => storage.roomId === this.roomId);
          this.messageArray = this.storageArray[storeIndex].chats;
        }, 500);
      }
    });
  }



loadUserProfiles(getuserlist: string) {
  const url=  getuserlist  + '?phone=' + this.phone;//this.phone
  this.dataforanylticsService.getUserInfo(url).subscribe(userProfile => {
      this.userList =userProfile;
    });  }

  ngAfterViewInit(): void {   this.openPopup(this.popup); }

  openPopup(content: any): void {     this.modalService.open(content, {backdrop: 'static', centered: true});  }

  login(dismiss: any): void {

    this.loadUserProfiles(this.getuserlist);

     // /home/dang/snap/firefox/common/.mozilla/firefox/
     console.log('Phone:', this.phone);
    this.currentUser = this.userList.find(user => user.phone === this.phone.toString());
    this.userList = this.userList.filter((user) => user.phone !== this.phone.toString());
    // this.showScreen = true;// to be removed
    // dismiss();
    if (this.currentUser) {
      this.showScreen = true;
      dismiss();
    }
  }

  selectUserHandler(phone: string): void {
    this.selectedUser = this.userList.find(user => user.phone === phone);
    this.roomId = this.selectedUser.roomId[this.currentUser.id];
    this.messageArray = [];

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray.findIndex((storage) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.messageArray = this.storageArray[storeIndex].chats;
    }

    this.join(this.currentUser.name, this.roomId);
  }

  join(username: string, roomId: string): void {
    this.chatService.joinRoom({user: username, room: roomId});
  }

  sendMessage(): void {
    this.chatService.sendMessage({
      user: this.currentUser.name,
      room: this.roomId,
      message: this.messageText,
      timestamp: new Date(),
      phone : this.phone

    });

    this.storageArray = this.chatService.getStorage();
    const storeIndex = this.storageArray
      .findIndex((storage) => storage.roomId === this.roomId);

    if (storeIndex > -1) {
      this.storageArray[storeIndex].chats.push({
        user: this.currentUser.name,
        message: this.messageText
      });
    } else {
      const updateStorage = {
        roomId: this.roomId,
        chats: [{
          user: this.currentUser.name,
          message: this.messageText
        }]
      };

      this.storageArray.push(updateStorage);
    }

    this.chatService.setStorage(this.storageArray);
   let data = {
    user: this.currentUser.name,
    room: this.roomId,
    message: this.messageText,
    timestamp: new Date(),
    phone : this.phone };
    try {
    this.dataforanylticsService.postData(this.chatSave, data).subscribe({
      next: (response) => console.log('Success:', response),
      error: (error) => console.error('Error:', error)
    });}
    catch {
      this.messageText = '';
    }
    this.messageText = '';
  }

}

