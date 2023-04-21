import app from "./app";
import {Server as WebSocketServer} from "socket.io"
import { connectDB } from "./db";
import sockets from "./sockets";
import { PORT } from "./config";

connectDB();

const server = app.listen(PORT, ()=>{ //un server.listen nos retorna una nueva instancia
    console.log(`Server on port ${PORT}`)
})

const io = new WebSocketServer(server)

sockets(io)
