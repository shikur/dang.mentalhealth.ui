export interface UserProfile {
    id: number;
    name: string;
    phone: string;
    image: string;
    roomId: {
      [key: number]: string;
    };
  }