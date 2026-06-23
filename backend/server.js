require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const connectDB = require("./config/db");
const Dish = require("./models/Dish");
const dishRoutes = require("./routes/dishRoutes");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST", "PATCH"],
  },
});

app.set("io", io);

app.use(cors());
app.use(express.json());

app.use("/api/dishes", dishRoutes);

app.get("/", (req, res) => {
  res.send("Dish Dashboard API is running...");
});

io.on("connection", (socket) => {
  console.log("Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

const startServer = async () => {
  await connectDB();

  // MongoDB Change Streams -> detects changes made DIRECTLY in the DB
  // (not just through our API), and broadcasts them in real-time.
  const dishCollection = Dish.collection;
  const changeStream = dishCollection.watch();

  changeStream.on("change", async (change) => {
    console.log("Change detected in DB:", change.operationType);

    if (change.operationType === "update" || change.operationType === "replace") {
      const updatedDish = await Dish.findById(change.documentKey._id);
      if (updatedDish) {
        io.emit("dishUpdated", updatedDish);
      }
    }

    if (change.operationType === "insert") {
      io.emit("dishInserted", change.fullDocument);
    }

    if (change.operationType === "delete") {
      io.emit("dishDeleted", change.documentKey._id);
    }
  });

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();