import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io"; // Importa Server de 'socket.io'
import Routes from "./Routes/routes.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(Routes);

// Crear un servidor HTTP con Express
const server = http.createServer(app);

// Crear un servidor WebSocket con socket.io
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("Cliente conectado al WebSocket");

  socket.on("message", (message) => {
    console.log(`Mensaje recibido: ${message}`);
    // Aquí puedes procesar el mensaje recibido y realizar acciones correspondientes
    // Por ejemplo, puedes enviar un mensaje de respuesta al cliente
    socket.emit("message", "Mensaje recibido por el servidor");
  });

  socket.on("disconnect", () => {
    console.log("Cliente desconectado del WebSocket");
  });
});

export default server; // Exporta el servidor HTTP en lugar de app
