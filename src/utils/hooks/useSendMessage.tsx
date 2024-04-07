import { useAppSelector } from "../../store/hooks";
import { getLoggedUser } from "../../store/slices/AuthSlice";
import { UserType } from "../../store/slices/UserSlice";
import { ChatRoomType } from "../types/ChatRoom";
import AppApi from "../../server/api/AppApi";
import { SocketEventsClient } from "../constants/socketEvents";

const useSendMessage = () => {
  const currentUser = useAppSelector(getLoggedUser);
  const socket = AppApi.getSocketApi();

  return (text: string, user?: UserType, room?: ChatRoomType) => {
    if (!user || !room || !text) {
      return;
    }
    socket.emit(SocketEventsClient.SEND_MESSAGE_ROOM, {
      userId: user.id,
      text: text,
      roomId: room.id,
    });
  };
};

export default useSendMessage;
