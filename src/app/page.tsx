"use client";

import { useState } from "react";
import { quotes } from "./quotes";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { motion, AnimatePresence } from "framer-motion";

const topics = [...new Set(quotes.map((q) => q.topic))];

export default function Home() {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [results, setResults] = useState<string[]>([]);

  const handleTopicChange = (value: string) => {
    setSelectedTopic(value);
    const matched = quotes
      .filter((q) => q.topic.toLowerCase() === value.toLowerCase())
      .slice(0, 3)
      .map((q) => q.text);
    setResults(matched);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-white/80 backdrop-blur-md rounded-2xl shadow-xl p-8 space-y-8 border border-white">
        <h1 className="text-4xl font-extrabold text-center text-indigo-700 drop-shadow">
           Quote Generator
        </h1>

        <Select onValueChange={handleTopicChange}>
          <SelectTrigger className="w-full bg-white text-indigo-700 font-medium border border-indigo-300 shadow-sm">
            <SelectValue placeholder="Choose a topic" />
          </SelectTrigger>
          <SelectContent>
            {topics.map((topic) => (
              <SelectItem key={topic} value={topic} className="capitalize">
                {topic}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <div className="space-y-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedTopic}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-4"
            >
              {results.map((quote, idx) => (
                <motion.p
                  key={quote}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="bg-indigo-50 text-indigo-900 p-4 rounded-lg shadow-md border-l-4 border-indigo-500 italic"
                >
                  {quote}
                </motion.p>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  );
}
