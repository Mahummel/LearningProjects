import express, { Request, Response } from "express";
import customer from "./routes/customer";

const app = express();

// Different route sections
app.use('/customer', customer);

app.get("/", (req: Request, res: Response): void => {
  res.sendStatus(204);
});

const PORT: number = Number(process.env.PORT) || 3000;

app.listen(PORT, () => {
  console.log(`Listening on localhost:${PORT}`);
});