const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const seedRouter = require("./routes/sRoute.js");
const bikesRouter = require("./routes/bikesRoute.js");
const userRouter = require("./routes/userRoute.js");
const rentRouter = require("./routes/rentRoute.js");
const categoryRouter = require("./routes/typeRoute.js");

require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 8080;
const MONGO_URL = process.env.MONGO_URL;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/seed/", seedRouter);
app.use("/api/bikes/", bikesRouter);
app.use("/api/users/", userRouter);
app.use("/api/rent/", rentRouter);
app.use("/api/category/", categoryRouter);

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connection successful");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.get("/", (req, res) => {
  res.send("Ok!");
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
''