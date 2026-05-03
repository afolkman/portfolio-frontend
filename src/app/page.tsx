"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [reply, setReply] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setReply(""); // Clear previous response

    try {
      // Send the POST request to the FastAPI backend
      const response = await fetch("http://localhost:8000/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      setReply(data.reply);
    } catch (error) {
      setReply("Error connecting to the backend. Is the server running?");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-12 bg-gray-50">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          My AI Portfolio Chatbot
        </h1>

        <div className="space-y-4">
          <textarea
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-black"
            rows={4}
            placeholder="Ask me anything about my experience..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button
            onClick={sendMessage}
            disabled={isLoading}
            className="w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {isLoading ? "Thinking..." : "Send Message"}
          </button>
        </div>

        {reply && (
          <div className="mt-8 p-6 bg-gray-100 rounded-lg border border-gray-200 text-gray-800">
            <h3 className="font-bold mb-2">Chatbot Reply:</h3>
            <p className="whitespace-pre-wrap">{reply}</p>
          </div>
        )}
      </div>
    </main>
  );
}