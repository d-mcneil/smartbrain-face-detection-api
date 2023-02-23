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
// import databaseInfo from './databaseInfo.js'; // for development

const app = express();

// const db = knex(databaseInfo); // for development
// const PORT = 3001; // for development
// app.use(cors());  // for development


const db = knex( // for production
    {
      client: "pg",
      connection: {
        connectionString: process.env.DATABASE_URL,
        ssl: {
          rejectUnauthorized: false
        }
      },
    }
);
const PORT = process.env.PORT; // for production
const corsOptions = { // for production
  origin: process.env.ORIGIN_URL,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions)); // for production

app.use(express.json());

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
