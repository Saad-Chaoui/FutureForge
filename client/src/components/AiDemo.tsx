import { useState, useEffect, useRef } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { Maximize2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

export default function AiDemo() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  
  // Fetch initial messages
  const { data: messages = [], refetch } = useQuery<Message[]>({
    queryKey: ['/api/chat/history'],
  });

  // Send message mutation
  const { mutate: sendMessage, isPending } = useMutation({
    mutationFn: async (content: string) => {
      return await apiRequest("POST", "/api/chat/message", { content });
    },
    onSuccess: () => {
      refetch();
    },
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isPending) return;
    
    // Add optimistic user message to UI
    const newMessage = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue
    };
    
    // Send to API
    sendMessage(inputValue);
    setInputValue("");
    setIsTyping(true);

    // After a delay, simulate the assistant is done typing
    setTimeout(() => {
      setIsTyping(false);
    }, 2000);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const messageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section 
      className="py-20 bg-[hsl(var(--dark-500)_/_0.5)] relative" 
      id="ai-demo"
      ref={ref}
    >
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-[hsl(var(--background))] to-transparent opacity-60 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="max-w-4xl mx-auto text-center mb-16"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 
            className="text-3xl md:text-5xl font-display font-light mb-5"
            variants={itemVariants}
          >
            Experience <span className="text-[hsl(var(--neon-cyan))]">AI</span> in Action
          </motion.h2>
          <motion.p 
            className="text-gray-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            See our AI capabilities in real-time. Ask questions, solve problems, 
            and experience the future of intelligent assistance.
          </motion.p>
        </motion.div>
        
        <motion.div 
          className="max-w-4xl mx-auto bg-[hsl(var(--dark-400))] rounded-xl overflow-hidden border border-[hsl(var(--neon-cyan)_/_0.3)]"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <div className="bg-[hsl(var(--dark-300))] py-3 px-4 flex items-center justify-between border-b border-[hsl(var(--dark-100))]">
            <div className="flex items-center">
              <span className="h-3 w-3 rounded-full bg-[hsl(var(--neon-cyan))] mr-2 animate-pulse"></span>
              <span className="text-sm font-medium">AI Assistant Demo</span>
            </div>
            <div className="flex space-x-2">
              <button className="p-1 text-gray-400 hover:text-white" aria-label="Expand">
                <Maximize2 className="h-4 w-4" />
              </button>
              <button className="p-1 text-gray-400 hover:text-white" aria-label="Close">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
          
          <div className="p-4 h-80 overflow-y-auto" id="ai-chat-messages">
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                className={`flex mb-4 ${message.role === "user" ? "justify-end" : ""}`}
                initial="hidden"
                animate="visible"
                variants={messageVariants}
                custom={index}
              >
                {message.role === "assistant" && (
                  <div className="w-8 h-8 rounded-full bg-[hsl(var(--neon-cyan)_/_0.2)] flex items-center justify-center shrink-0 mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[hsl(var(--neon-cyan))]" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                <div className={`${
                  message.role === "user" 
                    ? "bg-[hsl(var(--neon-cyan)_/_0.1)]" 
                    : "bg-[hsl(var(--dark-300))]"
                  } rounded-lg p-3 max-w-[80%]`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </motion.div>
            ))}

            {isTyping && (
              <motion.div 
                className="flex justify-start mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="w-8 h-8 rounded-full bg-[hsl(var(--neon-cyan)_/_0.2)] flex items-center justify-center shrink-0 mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[hsl(var(--neon-cyan))]" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="bg-[hsl(var(--dark-300))] rounded-lg p-3 max-w-[80%] flex items-center">
                  <div className="dot-pulse"></div>
                </div>
              </motion.div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          <div className="p-4 border-t border-[hsl(var(--dark-100))]">
            <form className="flex items-center" onSubmit={handleSubmit}>
              <input 
                type="text" 
                placeholder="Ask anything about our AI platform..." 
                className="flex-1 bg-[hsl(var(--dark-300))] text-white border border-[hsl(var(--dark-100))] rounded-lg py-2 px-4 focus:outline-none focus:border-[hsl(var(--neon-cyan)_/_0.5)]"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                disabled={isPending}
              />
              <Button 
                type="submit" 
                className="ml-2 bg-[hsl(var(--neon-cyan))] text-black rounded-lg p-2 hover:bg-[hsl(var(--neon-cyan)_/_0.8)] transition-colors duration-300"
                disabled={isPending}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 15.707a1 1 0 010-1.414L14.586 10l-4.293-4.293a1 1 0 111.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  <path fillRule="evenodd" d="M4.293 15.707a1 1 0 010-1.414L8.586 10 4.293 5.707a1 1 0 011.414-1.414l5 5a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
