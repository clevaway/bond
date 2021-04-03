// plugin for websocket connection
import io from "socket.io-client";
const socket = io(":3000", { transports: ["websocket"] });
export default socket;