import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.messages.list.path, async (req, res) => {
    const messages = await storage.getMessages();
    res.json(messages);
  });

  app.post(api.messages.create.path, async (req, res) => {
    try {
      const input = api.messages.create.input.parse(req.body);
      const message = await storage.createMessage(input);
      res.status(201).json(message);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  app.delete(api.messages.delete.path, async (req, res) => {
    const id = Number(req.params.id);
    const existing = await storage.getMessage(id);
    if (!existing) {
      return res.status(404).json({ message: "Message not found" });
    }
    await storage.deleteMessage(id);
    res.status(204).send();
  });

  // Seed data if empty
  const existing = await storage.getMessages();
  if (existing.length === 0) {
    await storage.createMessage({ content: "Bem-vindo ao Nina Mural! 🎉 Deixe seu recado aqui." });
    await storage.createMessage({ content: "Que este dia seja maravilhoso para todos! ☀️" });
    await storage.createMessage({ content: "Adorei o novo visual do mural! Ficou lindo. 💖" });
  }

  return httpServer;
}
