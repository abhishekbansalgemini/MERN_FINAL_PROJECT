const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const UserRoutes = require("./Routes/UserRoutes.js");
const PlaceRoutes = require("./Routes/PlaceRoutes.js");
const BookingRoutes = require("./Routes/BookingRoutes.js");
const UploadRoutes = require("./Routes/UploadRoutes.js");

require("dotenv").config();

app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);

mongoose.connect(process.env.MONGO_URL);

app.use("/", UserRoutes);
app.use("/", UploadRoutes);
app.use("/", PlaceRoutes);
app.use("/", BookingRoutes);

app.listen(4000);
