import { ChatRoomType } from "../../utils/types/ChatRoom";
import { UserType } from "../../store/slices/UserSlice";
import { MessageType } from "../../utils/types/MessageType";

export const extractRoomInfo = (
  room: ChatRoomType,
  currentUser?: UserType
): {
  roomName: string;
  roomPicture?: string;
} => {
  if (room.oneOnOne && currentUser && room.userToRooms.length === 2) {
    const recipient = room.userToRooms.find(
      (userToRoom) => userToRoom.user.id !== currentUser.id
    );

    if (!recipient) {
      return {
        roomName: room.name,
      };
    }

    return {
      roomName: `${recipient?.user.firstName} ${recipient?.user.lastName}`,
      roomPicture: recipient?.user.profilePicture,
    };
  }

  return {
    roomName: room.name,
  };
};

export const extractUserNameFromMessage = (message: MessageType) => {
  const messageAuthor = message.author;

  return `${messageAuthor.firstName} ${messageAuthor.lastName}`;
};
