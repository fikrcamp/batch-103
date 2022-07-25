const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const userRoutes = require("./Routes/userRoutes");
const restaurantRoutes = require("./Routes/restaurantRoutes");
const menuRoutes = require("./Routes/menuRoutes");

dotenv.config({ path: "./.env" });
require("./server");

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("Images"));

app.use("/user", userRoutes);
app.use("/restaurant", restaurantRoutes);
app.use("/menu", menuRoutes);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
