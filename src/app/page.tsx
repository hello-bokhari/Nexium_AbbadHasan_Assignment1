"use client";

import { useEffect, useState } from "react";
import { quotes } from "./quotes";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

// Unique topics
const topics = ["random", ...new Set(quotes.map((q) => q.topic))];

export default function Home() {
  const [topic, setTopic] = useState("random");
  const [quoteOfDay, setQuoteOfDay] = useState<string>("");
  const [results, setResults] = useState<string[]>([]);
  const [renderKey, setRenderKey] = useState(0); // 🔑 new state

  // Load quote of the day on first render
  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setQuoteOfDay(randomQuote.text);
  }, []);

  const generateQuotes = () => {
    const filtered =
      topic === "random"
        ? quotes
        : quotes.filter((q) => q.topic.toLowerCase() === topic.toLowerCase());

    const selected = [...filtered]
      .sort(() => Math.random() - 0.5)
      .slice(0, 3)
      .map((q) => q.text);

    setResults(selected);
    setRenderKey((prev) => prev + 1); // 👈 trigger animation only on click
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-violet-100 to-blue-100 p-6">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md p-8 rounded-xl shadow-xl space-y-10 border border-white">

        {/* Title */}
        <h1 className="text-5xl font-bold text-center text-violet-800">Quotes</h1>

        {/* Quote of the Day */}
        <div className="text-center space-y-2">
          <p className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 italic">
            “{quoteOfDay}”
          </p>
          <p className="text-sm text-gray-500">This is the quote of the day</p>
        </div>

        {/* Selector + Generate */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          <Select value={topic} onValueChange={setTopic}>
            <SelectTrigger className="w-full md:w-64 bg-white text-violet-700 border border-violet-300 shadow-sm">
              <SelectValue placeholder="Select topic" />
            </SelectTrigger>
            <SelectContent>
              {topics.map((t) => (
                <SelectItem key={t} value={t}>
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            onClick={generateQuotes}
            className="bg-violet-600 hover:bg-violet-700 text-white px-6"
          >
            Generate
          </Button>
        </div>

        {/* Generated Quotes */}
        <AnimatePresence mode="wait">
          <motion.div
            key={renderKey} // animation only when "Generate" is clicked
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            {results.map((quote, idx) => (
              <motion.p
                key={quote}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="bg-violet-50 border-l-4 border-violet-500 text-violet-900 p-4 rounded shadow-sm italic"
              >
                {quote}
              </motion.p>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </main>
  );
}
