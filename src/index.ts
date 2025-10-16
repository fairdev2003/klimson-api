import type { Request, Response } from "express";
import express from "express"; // ✅
import cors from "cors";
import axios from "axios";
import type { DiscordPresenceResponse } from "./types/SpotifyStatus";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.json({ text: "Hello world!", date: new Date() });
});

app.get("/spotify", async (req: Request, res: Response) => {
  const apiRoute = "https://api.lanyard.rest/v1/users/424502321800675328";

  const response = await axios.get<DiscordPresenceResponse>(apiRoute);
  const data = response.data.data;
  res.json({ data, success: true });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
