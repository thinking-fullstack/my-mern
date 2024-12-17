import { Server } from "socket.io";
import jwt from 'jsonwebtoken'

export async function setupSocket(httpServer) {
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      allowedHeaders: ["Authorization"],
      credentials: true,
    },
  });

  io.use(async (socket, next) => {
    const token = socket.handshake.auth.authorization;
    if (!token) {
      return next();
    }
    const newToken = token.split(" ")[1];
    const decoded = await jwt.decode(newToken, process.env.JWT_SECRET);
    socket.data.isAuth = true;
    socket.data.user = decoded?.user;
    next();
  });
  io.on("connection", async socket => {
    const user = socket.data.user;

    socket.emit("init", {
      success: true
    });

    socket.on("disconnect", () => {
      io.emit("userLeft", "socket.username");
    });
  });

  // @ts-ignore
  global.SocketServer = io;
}
