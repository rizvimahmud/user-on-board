const Express = require("express");
const cors = require("cors");
const dotenv = require("dotenv").config();
const { connectToDatabase } = require("./db.js");
const userRouter = require("./routes/user-routes.js");

const app = Express();

const PORT = process.env.PORT || 8080;

//middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);
app.use(Express.json());

//Routes

app.use("/api/user", userRouter);

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`server listening at http://localhost:${PORT}`);
});
