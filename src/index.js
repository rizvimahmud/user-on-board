const Express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { connectToDatabase } = require("./db.js");

const app = Express();

const PORT = 8080;

dotenv.config();
//middlewares
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:4200",
  })
);
app.use(Express.json());

//Routes

const server = app.listen(PORT, async () => {
  await connectToDatabase();
  console.log(`server listening at http://localhost:${PORT}`);
});
