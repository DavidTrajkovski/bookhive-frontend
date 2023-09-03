export interface BookClub {
  id: string;
  owner: string;
  name: string;
  description: string;
  requestCount: number;
  isMember: boolean;
  isOwner: boolean;
}
