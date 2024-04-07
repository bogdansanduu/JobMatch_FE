import { io, Socket } from "socket.io-client";

import { store } from "../../store/store";

class SocketApi {
  private socket: Socket;
  private socketUrl: string;

  constructor() {
    this.socketUrl = process.env.REACT_APP_SOCKET || "http://localhost:3001";

    this.socket = io(this.socketUrl, {
      autoConnect: false,
    });
  }

  connect() {
    const loggedUser = store.getState().auth.loggedUser;

    this.socket = io(this.socketUrl, {
      autoConnect: false,
      query: {
        ...(loggedUser && { userId: loggedUser.id }),
      },
    });

    this.socket.connect();
  }

  disconnect() {
    this.socket.disconnect();
  }

  on(event: string, callback: (...args: any[]) => void) {
    this.socket.on(event, callback);
  }

  off(event: string, callback?: (...args: any[]) => void) {
    this.socket.off(event, callback);
  }

  emit(event: string, data: any) {
    this.socket.emit(event, data);
  }
}

export default SocketApi;
