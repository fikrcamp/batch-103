const Express = require("express");
const app = Express();
const dotenv = require("dotenv");
const userRoutes = require("./Routes/userRoutes");

dotenv.config({ path: "./.env" });
require("./server");

app.use(Express.json());
app.use("/user", userRoutes);

app.listen(8000, () => {
  console.log("listening");
});
