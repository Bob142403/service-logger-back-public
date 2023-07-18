import cors from "cors";
import user from "./src/user/user.route.ts";
import service from "./src/service/service.route.ts";
import express from "express";
import { config } from "dotenv";
import auth from "./src/auth/auth.route.ts";
import log from "./src/log/log.route.ts";
import { Server } from "socket.io";

config();

const PORT = process.env.PORT ?? 3000;
const app = express();
const io = new Server(8000, {
  cors: {
    origin: ["http://localhost:3000", "http://localhost:3001"],
  },
});

io.on("connection", (socket) => {
  socket.on("update-logs", () => {
    io.emit("update-logs");
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use(auth);
app.use("/user", user);
app.use("/service", service);
app.use("/log", log);

app.listen(PORT, () => {
  console.log(`Server has been started on port ${PORT}....`);
});
