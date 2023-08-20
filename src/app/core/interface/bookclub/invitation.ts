export interface Invitation {
  bookClubName: string;
  senderEmail: string;
  receiverId: string;
  message: string;
  isRequest: boolean;
}
