import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Trash2, Quote } from "lucide-react";
import { useDeleteMessage } from "@/hooks/use-messages";
import type { Message } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { motion } from "framer-motion";

interface MessageCardProps {
  message: Message;
  index: number;
}

const COLORS = [
  "bg-yellow-100 hover:bg-yellow-50 border-yellow-200 text-yellow-900",
  "bg-pink-100 hover:bg-pink-50 border-pink-200 text-pink-900",
  "bg-cyan-100 hover:bg-cyan-50 border-cyan-200 text-cyan-900",
  "bg-green-100 hover:bg-green-50 border-green-200 text-green-900",
  "bg-purple-100 hover:bg-purple-50 border-purple-200 text-purple-900",
  "bg-orange-100 hover:bg-orange-50 border-orange-200 text-orange-900",
];

export function MessageCard({ message, index }: MessageCardProps) {
  const { mutate: deleteMessage, isPending } = useDeleteMessage();
  const { toast } = useToast();

  const colorClass = COLORS[index % COLORS.length];
  // Slightly rotate cards for "messy wall" effect based on ID
  const rotation = message.id % 2 === 0 ? "rotate-1" : "-rotate-1";

  const handleDelete = () => {
    if (confirm("Tem certeza que deseja apagar este recado?")) {
      deleteMessage(message.id, {
        onSuccess: () => {
          toast({
            title: "Recado removido",
            description: "A mensagem foi excluída do mural.",
          });
        },
        onError: () => {
          toast({
            title: "Erro",
            description: "Não foi possível excluir a mensagem.",
            variant: "destructive",
          });
        },
      });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
      className={`
        relative group p-6 rounded-none ${rotation} shadow-lg hover:shadow-xl hover:scale-[1.02] hover:z-10
        border transition-all duration-300 ${colorClass}
        flex flex-col justify-between min-h-[200px]
      `}
      style={{
        // Use clip-path or masking if we wanted torn paper edges, 
        // but for now we'll use a CSS trick for a sticky note look
        boxShadow: "5px 5px 15px rgba(0,0,0,0.1)",
      }}
    >
      {/* Tape effect */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 rotate-2 backdrop-blur-sm shadow-sm transform"></div>

      <div>
        <Quote className="w-8 h-8 opacity-20 mb-2" />
        <p className="font-medium text-lg leading-relaxed whitespace-pre-wrap font-display">
          {message.content}
        </p>
      </div>

      <div className="mt-6 flex items-end justify-between border-t border-black/5 pt-4">
        <span className="text-xs font-semibold opacity-60">
          {message.createdAt &&
            format(new Date(message.createdAt), "d 'de' MMM, HH:mm", {
              locale: ptBR,
            })}
        </span>

        <button
          onClick={handleDelete}
          disabled={isPending}
          className="
            p-2 rounded-full 
            hover:bg-black/10 text-black/40 hover:text-red-600
            transition-colors duration-200
            opacity-0 group-hover:opacity-100 focus:opacity-100
          "
          title="Excluir recado"
        >
          {isPending ? (
            <div className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          ) : (
            <Trash2 className="w-4 h-4" />
          )}
        </button>
      </div>
    </motion.div>
  );
}
