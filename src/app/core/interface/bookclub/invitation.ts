export interface Invitation {
  id: string;
  bookClubName: string;
  senderEmail: string;
  receiverId: string;
  message: string;
  isRequest: boolean;
}
