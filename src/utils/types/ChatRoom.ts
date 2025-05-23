import { UserType } from "../../store/slices/UserSlice";

export interface UserToRoom {
  id: number;
  roomId: number;
  user: UserType;
}

export interface ChatRoomType {
  id: number;
  name: string;
  host: UserType;
  userToRooms: UserToRoom[];
  oneOnOne: boolean;
}
