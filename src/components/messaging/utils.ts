import { ChatRoomType } from "../../utils/types/ChatRoom";
import { UserType } from "../../store/slices/UserSlice";
import { MessageType } from "../../utils/types/MessageType";

export const extractRoomName = (room: ChatRoomType, currentUser?: UserType) => {
  if (room.oneOnOne && currentUser && room.userToRooms.length === 2) {
    const recipient = room.userToRooms.find(
      (userToRoom) => userToRoom.user.id !== currentUser.id
    );
    return `${recipient?.user.firstName} ${recipient?.user.lastName}`;
  }
  return room.name;
};

export const extractUserNameFromMessage = (message: MessageType) => {
  const messageAuthor = message.author;

  return `${messageAuthor.firstName} ${messageAuthor.lastName}`;
};
