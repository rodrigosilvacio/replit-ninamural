import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import type { InsertMessage } from "@shared/schema";
import { z } from "zod";

// Helper to validate and parse API responses safely
function parseResponse<T>(schema: z.ZodType<T>, data: unknown): T {
  const result = schema.safeParse(data);
  if (!result.success) {
    console.error("API Validation Failed:", result.error);
    throw new Error("Dados inválidos recebidos do servidor");
  }
  return result.data;
}

// GET /api/messages
export function useMessages() {
  return useQuery({
    queryKey: [api.messages.list.path],
    queryFn: async () => {
      const res = await fetch(api.messages.list.path);
      if (!res.ok) throw new Error("Erro ao carregar recados");
      const data = await res.json();
      // Sort in frontend just to be safe, though backend should handle it
      const messages = parseResponse(api.messages.list.responses[200], data);
      return messages.sort((a, b) => {
        return new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime();
      });
    },
  });
}

// POST /api/messages
export function useCreateMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (newMessage: InsertMessage) => {
      // Client-side validation before sending
      const validated = api.messages.create.input.parse(newMessage);
      
      const res = await fetch(api.messages.create.path, {
        method: api.messages.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validated),
      });

      if (!res.ok) {
        if (res.status === 400) {
          const errorData = await res.json();
          // Try to parse structured error
          try {
            const error = api.messages.create.responses[400].parse(errorData);
            throw new Error(error.message);
          } catch {
            throw new Error("Erro de validação");
          }
        }
        throw new Error("Falha ao publicar recado");
      }

      return parseResponse(api.messages.create.responses[201], await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.messages.list.path] });
    },
  });
}

// DELETE /api/messages/:id
export function useDeleteMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      const url = buildUrl(api.messages.delete.path, { id });
      const res = await fetch(url, {
        method: api.messages.delete.method,
      });

      if (!res.ok) {
        if (res.status === 404) throw new Error("Recado não encontrado");
        throw new Error("Erro ao excluir recado");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.messages.list.path] });
    },
  });
}
