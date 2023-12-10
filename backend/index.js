const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./routess/user.routess");
const { noteRouter } = require("./routess/note.routess");

const app = express();
app.use(express.json());

app.use("/users", userRouter);
app.use("/notes", noteRouter);

app.listen(8080, async () => {
  try {
    await connection;
    console.log("Connected to the db");
    console.log("Server is running at port 8080");
  } catch (err) {
    console.log(err);
  }
});
