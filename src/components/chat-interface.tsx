"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Send } from "lucide-react";
import { LiquidMetal, PulsingBorder } from "@paper-design/shaders-react";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
  timestamp: Date;
}

export function ChatInterface() {
  const [isFocused, setIsFocused] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    // Create a new user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: "user",
      timestamp: new Date(),
    };

    // Add the user message to messages
    setMessages((prev) => [...prev, userMessage]);

    // Reset input field
    setInputValue("");

    // Set loading state
    setIsLoading(true);

    try {
      // Call the API endpoint
      const API_BASE_URL =
        process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3001";
      const response = await fetch(`${API_BASE_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ input: userMessage.content }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      // Create assistant message from API response
      const assistantMessage: Message = {
        id: Date.now().toString(),
        content: data.ans,
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error("Error sending message:", error);

      // Add error message to chat
      const errorMessage: Message = {
        id: Date.now().toString(),
        content:
          "Sorry, there was an error processing your request. Please try again.",
        role: "assistant",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-1 flex flex-col items-center p-4">
        <div className="w-full max-w-4xl flex flex-col h-full">
          {/* Greeting */}
          <div className="flex flex-row items-center mb-4">
            {/* Shader Circle */}
            <motion.div
              id="circle-ball"
              className="relative flex items-center justify-center z-10"
              animate={{
                y: isFocused ? 50 : 0,
                opacity: isFocused ? 0 : 100,
                filter: isFocused ? "blur(4px)" : "blur(0px)",
                rotate: isFocused ? 180 : 0,
              }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              <div className="z-10 absolute bg-white/5 h-11 w-11 rounded-full backdrop-blur-[3px]">
                <div className="h-[2px] w-[2px] bg-white rounded-full absolute top-4 left-4 blur-[1px]" />
                <div className="h-[2px] w-[2px] bg-white rounded-full absolute top-3 left-7 blur-[0.8px]" />
                <div className="h-[2px] w-[2px] bg-white rounded-full absolute top-8 left-2 blur-[1px]" />
                <div className="h-[2px] w-[2px] bg-white rounded-full absolute top-5 left-9 blur-[0.8px]" />
                <div className="h-[2px] w-[2px] bg-white rounded-full absolute top-7 left-7 blur-[1px]" />
              </div>
              <LiquidMetal
                style={{
                  height: 80,
                  width: 80,
                  filter: "blur(14px)",
                  position: "absolute",
                }}
                colorBack="hsl(0, 0%, 0%, 0)"
                colorTint="hsl(29, 77%, 49%)"
                repetition={4}
                softness={0.5}
                shiftRed={0.3}
                shiftBlue={0.3}
                distortion={0.1}
                contour={1}
                shape="circle"
                offsetX={0}
                offsetY={0}
                scale={0.58}
                rotation={50}
                speed={5}
              />
              <LiquidMetal
                style={{ height: 80, width: 80 }}
                colorBack="hsl(0, 0%, 0%, 0)"
                colorTint="hsl(29, 77%, 49%)"
                repetition={4}
                softness={0.5}
                shiftRed={0.3}
                shiftBlue={0.3}
                distortion={0.1}
                contour={1}
                shape="circle"
                offsetX={0}
                offsetY={0}
                scale={0.58}
                rotation={50}
                speed={5}
              />
            </motion.div>

            {/* Greeting Text */}
            <motion.p
              className="text-white/40 text-sm font-light z-10"
              animate={{
                y: isFocused ? 50 : 0,
                opacity: isFocused ? 0 : 100,
                filter: isFocused ? "blur(4px)" : "blur(0px)",
              }}
              transition={{
                duration: 0.5,
                type: "spring",
                stiffness: 200,
                damping: 20,
              }}
            >
              Hey there! I&apos;m here to help with anything you need
            </motion.p>
          </div>

          {/* Messages Display */}
          <div className="flex-1 mb-4">
            <AnimatePresence>
              {messages.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mb-6 space-y-4 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar"
                >
                  <div className="space-y-4 pb-2">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{
                          opacity: 0,
                          x: message.role === "user" ? 20 : -20,
                        }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`flex ${
                          message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-4 rounded-2xl ${
                            message.role === "user"
                              ? "bg-amber-600/20 border border-amber-600/30 text-white"
                              : "bg-zinc-800/50 border border-zinc-700 text-zinc-100"
                          }`}
                        >
                          <div className="text-sm leading-relaxed markdown-content">
                            <ReactMarkdown>{message.content}</ReactMarkdown>
                          </div>
                          <span className="text-xs text-zinc-400 mt-2 block">
                            {message.timestamp.toLocaleTimeString()}
                          </span>
                        </div>
                      </motion.div>
                    ))}

                    {/* Loading Indicator */}
                    {isLoading && (
                      <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-zinc-800/50 border border-zinc-700 p-4 rounded-2xl">
                          <div className="flex items-center gap-2">
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{
                                duration: 1,
                                repeat: Infinity,
                                ease: "linear",
                              }}
                              className="h-4 w-4 border-2 border-amber-500/30 border-t-amber-500 rounded-full"
                            />
                            <span className="text-zinc-400 text-sm">
                              Thinking...
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Input Container */}
          <div className="w-full">
            <div className="relative">
              <motion.div
                className="absolute w-full h-full z-0 flex items-center justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: isFocused ? 1 : 0 }}
                transition={{
                  duration: 0.8,
                }}
              >
                <PulsingBorder
                  style={{ height: "146.5%", minWidth: "143%" }}
                  colorBack="hsl(0, 0%, 0%)"
                  roundness={0.18}
                  thickness={0}
                  softness={0}
                  intensity={0.3}
                  bloom={2}
                  spots={2}
                  spotSize={0.25}
                  pulse={0}
                  smoke={0.35}
                  smokeSize={0.4}
                  scale={0.7}
                  rotation={0}
                  offsetX={0}
                  offsetY={0}
                  speed={1}
                  colors={[
                    "hsl(29, 70%, 37%)",
                    "hsl(32, 100%, 83%)",
                    "hsl(4, 32%, 30%)",
                    "hsl(25, 60%, 50%)",
                    "hsl(0, 100%, 10%)",
                  ]}
                />
              </motion.div>

              <motion.div
                className="relative bg-[#040404] rounded-2xl p-4 z-10"
                animate={{
                  borderColor: isFocused ? "#BA9465" : "#3D3D3D",
                }}
                transition={{
                  duration: 0.6,
                  delay: 0.1,
                }}
                style={{
                  borderWidth: "1px",
                  borderStyle: "solid",
                }}
              >
                {/* Message Input */}
                <div className="relative mb-6">
                  <Textarea
                    placeholder="Type your message here..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="min-h-[80px] resize-none bg-transparent border-none text-white text-base placeholder:text-zinc-500 focus:ring-0 focus:outline-none focus-visible:ring-0 focus-visible:outline-none pr-16"
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    disabled={isLoading}
                  />

                  {/* Send Button */}
                  <motion.div
                    className="absolute bottom-2 right-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={handleSendMessage}
                      disabled={!inputValue.trim() || isLoading}
                      size="sm"
                      className="h-10 w-10 p-0 bg-amber-600/20 hover:bg-amber-600/40 border border-amber-600/30 hover:border-amber-600/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      <motion.div
                        animate={{ rotate: isLoading ? 360 : 0 }}
                        transition={{
                          duration: 1,
                          repeat: isLoading ? Infinity : 0,
                          ease: "linear",
                        }}
                      >
                        <Send className="h-4 w-4 text-amber-500 group-hover:text-amber-400 transition-colors" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </div>

                {/* Action Buttons Row */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center pl-2">
                    <p className="text-zinc-400 text-xs italic">
                      Nucleito can make mistakes
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-zinc-400">
                    <Select defaultValue="gemini-2.5-pro">
                      <SelectTrigger className="w-40 bg-transparent border-zinc-700 text-zinc-400 text-xs">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-zinc-900 border-zinc-700 text-zinc-50">
                        <SelectItem value="gemini-2.5-pro">
                          Gemini 2.5 Pro
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
