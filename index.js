const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const PORT = 5050;

const app = express();
app.use(express.json());

app.use(
    session({
        secret: "bhim123",
        resave: false,
        saveUninitialized: true,
    })
);

mongoose.set("strictQuery", false);
const db =
  "mongodb+srv://dreamypd73:bhimpd28913@cluster0.bldcxmp.mongodb.net/Naamche?retryWrites=true&w=majority";

mongoose
  .connect(db)
  .then(() => {
    console.log("mongodb connected...");
    app.listen(PORT, () => {
      console.log(`Server is running at ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

const userRouter = require("./routes/userRoutes");
app.use("/user",userRouter);

const productRouter = require("./routes/productRouter");
app.use("/product",productRouter);