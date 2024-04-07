import { UserType } from "../../store/slices/UserSlice";
import { ChatRoomType } from "./ChatRoom";

export interface MessageType {
  id: number;
  author: UserType;
  text: string;
  room: ChatRoomType;
  createdAt: string;
}
