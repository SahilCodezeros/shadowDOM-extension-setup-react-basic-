import io from "socket.io-client";

export const socket = io(process.env.REACT_APP_NEW_SOCKET_IO_ENDPOINT_DOMAIN, {
  transports: ["polling"],
  secure: true,
});
