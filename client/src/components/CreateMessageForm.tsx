import { useState } from "react";
import { useCreateMessage } from "@/hooks/use-messages";
import { useToast } from "@/hooks/use-toast";
import { Send, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export function CreateMessageForm() {
  const [content, setContent] = useState("");
  const { mutate: createMessage, isPending } = useCreateMessage();
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    createMessage(
      { content },
      {
        onSuccess: () => {
          setContent("");
          toast({
            title: "Recado enviado! 🎉",
            description: "Sua mensagem já está no mural.",
            className: "bg-green-50 border-green-200 text-green-800",
          });
        },
        onError: (error) => {
          toast({
            title: "Ops!",
            description: error.message,
            variant: "destructive",
          });
        },
      }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto mb-12"
    >
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
        <form
          onSubmit={handleSubmit}
          className="relative bg-white rounded-2xl p-6 shadow-xl border border-border/50"
        >
          <label htmlFor="message" className="sr-only">
            Deixe seu recado
          </label>
          <div className="flex flex-col gap-4">
            <textarea
              id="message"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Escreva algo legal aqui..."
              className="w-full min-h-[100px] resize-none border-0 bg-transparent text-lg placeholder:text-muted-foreground focus:ring-0 focus:outline-none p-0"
              maxLength={280}
            />
            
            <div className="flex items-center justify-between border-t border-border/40 pt-4 mt-2">
              <span className="text-xs font-medium text-muted-foreground">
                {content.length}/280 caracteres
              </span>
              
              <button
                type="submit"
                disabled={isPending || !content.trim()}
                className="
                  inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-bold text-white
                  bg-gradient-to-r from-primary to-pink-600
                  shadow-lg shadow-primary/25
                  hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5
                  active:translate-y-0 active:shadow-md
                  disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
                  transition-all duration-200 ease-out
                "
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Enviando...
                  </>
                ) : (
                  <>
                    Publicar Recado
                    <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </motion.div>
  );
}
