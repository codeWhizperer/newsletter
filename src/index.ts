import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import NewLetter from "./model/models";
import { newLetterEmail } from "./mailer";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());
app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

const options: object = {
  useNewUrlParser: true as boolean,
  useUnifiedTopology: true as boolean,
};

mongoose.connect(process.env.MONGODB_URL as string, options, () => {
  console.log("connected to db");
});
console.log(mongoose.connection.readyState);

app.post("/newsletter", async (req: Request, res: Response) => {
  let { name, email} = req.body;

  if (!name || !email) {
    res.status(400).json({ message: "missing credential!" });
  }
  try {
    const user = await NewLetter.findOne({ email });
    if (user) {
      return res
        .status(423)
        .json({ status: false, message: "user already exist" });
    }

    let data = new NewLetter({
      name: name,
      email: email,
    });
    data.save();
    await newLetterEmail(email, name);

    res
      .status(201)
      .json({ message: data, success: "newsletter added successfully!" });
  } catch (error) {
    res.status(400).json({ message: error });
  }
});

// https://i.ibb.co/MVFt5VL/nahmii.png

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
