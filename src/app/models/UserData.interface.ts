export interface UserData {
    id: number;
    name: string;
    phone: string;
    image: string;
    roomId: { [key: number]: string };
  }