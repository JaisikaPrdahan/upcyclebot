import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import generateRouter from "./routes/generate.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/generate", generateRouter);

app.get("/", (_req, res) => {
  res.json({ message: "UpcycleBot backend is running" });
});

app.get("/test", async (req, res) => {
  const { generateIdeas } = await import("./services/aiService.js");
  const ideas = await generateIdeas("old t-shirt");
  res.json(ideas);
});

app.listen(port, () => {
  console.log(`UpcycleBot backend listening on port ${port}`);
});
