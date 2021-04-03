// plugin for websocket connection
import io from "socket.io-client";
const socket = io("https://bond-app-api.herokuapp.com:3000", { transports: ["websocket"] });
export default socket;