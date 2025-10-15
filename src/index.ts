import type { Request, Response } from "express";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// 🔧 Fix dla ESM — tworzymy __dirname i __filename
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, "messages.json");

// ✅ Funkcja wczytująca dane z pliku
function loadMessages(): { id: number; text: string; timestamp: string }[] {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, "[]", "utf-8");
  }
  const data = fs.readFileSync(dataFilePath, "utf-8");
  return JSON.parse(data);
}

// ✅ Funkcja zapisująca dane do pliku
function saveMessages(messages: any[]) {
  fs.writeFileSync(dataFilePath, JSON.stringify(messages, null, 2), "utf-8");
}

let messages = loadMessages();

app.get("/", (req: Request, res: Response) => {
  const newMessage = {
    id: messages.length + 1,
    text: "Hello world!",
    timestamp: new Date().toISOString(),
  };

  messages.push(newMessage);
  saveMessages(messages);

  res.json({
    message: "Nowa wiadomość dodana!",
    data: messages,
  });
});

app.get("/messages", (req: Request, res: Response) => {
  res.json(messages);
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
