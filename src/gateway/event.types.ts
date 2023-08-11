interface Message {
  senderId: string;

  text: string;

  receiverId: string;

  socketId: string;
}
export interface ServerToClientEvents {
  newMessage: (payload: any) => void;
  getId: (payload: any) => void;
}
