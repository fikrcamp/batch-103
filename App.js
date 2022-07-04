const Express = require("express");
const app = Express();
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes");
const restaurantRoutes = require("./Routes/restaurantRoutes");

dotenv.config({ path: "./.env" });
require("./server");

app.use(Express.json());
app.use("/user", userRoutes);
app.use("/restaurant", restaurantRoutes);

app.listen(8000, () => {
  console.log("listening");
});
