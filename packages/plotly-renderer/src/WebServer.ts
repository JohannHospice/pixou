import express, { Express } from "express";
import { Server } from "socket.io";
import http from "http";

export default class WebServer {
  app: Express;
  io: Server;
  server: http.Server;

  constructor(public port: number) {
    this.app = express();
    this.server = http.createServer(this.app);
    this.io = new Server(this.server);

    this.app.use(express.static(process.cwd() + "/public"));

    this.io.on("connection", (socket) => {
      console.log("a user connected");

      socket.on("disconnect", () => {
        console.log("user disconnected");
      });
    });
  }

  listen() {
    this.server.listen(this.port);
    console.log("[WEB] Listening on http://localhost:" + this.port);
  }

  broadcast(type: string, message: any) {
    console.log("[WEB] Broadcasting " + type + ": " + message);
    this.io.emit(type, message);
  }
}
