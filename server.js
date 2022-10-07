import express from "express";
import cors from "cors";
import knex from "knex";
import bcrypt from "bcryptjs";
import handleRegister from "./controllers/register.js"; 
import handleProfile from "./controllers/profile.js";
import handleScore from "./controllers/score.js";
import handleSignIn from "./controllers/signIn.js";
import handleApiCall from "./controllers/apiCall.js";
import handleDelete from "./controllers/delete.js"; 

const db = knex(
  {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: true
    },
  }
);
const app = express();
const PORT = process.env.PORT;

app.use(express.json());
// app.use(cors());

app.get("/", (req, res) => res.json("success"));
app.post("/sign-in", (req, res) => {handleSignIn(req, res, db, bcrypt)});
app.post("/register", (req, res) => {handleRegister(req, res, db, bcrypt)});
app.get("/profile/:id", (req, res) => {handleProfile(res, req, db)});
app.put("/score", (req, res) => {handleScore(req, res, db)});
app.post("/image", (req, res) => {handleApiCall(req, res)});
app.delete("/delete", (req, res) => {handleDelete(req, res, db)});

app.listen(PORT, () => {
  console.log(`SmartBrain is running on port ${PORT}.`);
});
