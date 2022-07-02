const mongooes = require("mongoose");

mongooes
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.k2ipd.mongodb.net/batch103`
  )
  .then(() => {
    console.log("connected to batch103");
  });
