import { MessageCard } from "@/components/MessageCard";
import { CreateMessageForm } from "@/components/CreateMessageForm";
import { useMessages } from "@/hooks/use-messages";
import { Loader2, Smile } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const { data: messages, isLoading, isError } = useMessages();

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <header className="pt-16 pb-8 px-4 text-center">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h1 className="text-4xl md:text-6xl text-primary drop-shadow-sm mb-4">
            Nina Mural 🎨
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-lg mx-auto">
            Deixe um recadinho anônimo para o mundo. <br />
            Espalhe positividade!
          </p>
        </motion.div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 sm:px-6">
        {/* Input Form */}
        <CreateMessageForm />

        {/* Messages Grid */}
        <div className="mt-12">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
              <Loader2 className="w-10 h-10 animate-spin mb-4 text-primary" />
              <p>Carregando mural...</p>
            </div>
          ) : isError ? (
            <div className="text-center py-20 bg-red-50 rounded-2xl border border-red-100 text-red-600">
              <p className="font-bold text-lg">Ops, algo deu errado!</p>
              <p>Não foi possível carregar os recados. Tente recarregar a página.</p>
            </div>
          ) : messages?.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 text-muted-foreground bg-white/50 rounded-3xl border-2 border-dashed border-border"
            >
              <Smile className="w-16 h-16 mx-auto mb-4 text-primary/30" />
              <h3 className="text-xl font-bold mb-2">Mural vazio!</h3>
              <p>Seja a primeira pessoa a deixar um recado hoje.</p>
            </motion.div>
          ) : (
            <motion.div 
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              <AnimatePresence mode="popLayout">
                {messages?.map((message, index) => (
                  <MessageCard 
                    key={message.id} 
                    message={message} 
                    index={index} 
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 py-8 text-center text-muted-foreground text-sm font-medium">
        <p>© {new Date().getFullYear()} Nina Mural • Feito com 💖 e código</p>
      </footer>
    </div>
  );
}
