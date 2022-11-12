import jwt, { Secret } from "jsonwebtoken";
import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

dotenv.config();
const app = express();
app.use(express.json());

const posts = [
  {
    username: "michael",
    title: "post 2",
  },
  {
    username: "michael",
    title: "post 23",
  },
  {
    username: "matthew",
    title: "post 24",
  },
];

app.get("/posts", authToken, (req, res) => {
  res.json(posts.filter(post => post.username === req.user.name));
});

app.post("/login", (req, res) => {
  const username = req.body.username;
  const user = { name: username };
  const secret: Secret = process.env.ACCESS_TOKEN_SECRET as Secret;
  const accessToken = jwt.sign(user, secret);
  res.json({ accessToken: accessToken });
});

function authToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as Secret, (err, user) => {
    if (err) return res.sendStatus(403);
		req.user = user;
    next();
  });
}

app.listen(3000, () => {
  console.log("Alive on port:", 3000);
});
