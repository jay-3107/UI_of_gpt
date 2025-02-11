import React, { useState } from "react";
import ChatBox from "./components/ChatBox";
import InputBox from "./components/InputBox";
import TranslateButton from "./components/TranslateButton";
import axios from "axios";
import { motion } from "framer-motion";
import "./styles.css";

const API_KEY = "AIzaSyCdH3aDzd12nL4N4_aagzm5wlyVphMTQWw";

const App = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
  
    const userMessage = { text: inputText, type: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);
  
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Add delay to prevent rate limit
  
      const response = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: [{ role: "user", parts: [{ text: `Translate this Sanskrit text to English and briefly explain its meaning: "${inputText}"` }] }],
        },
        { headers: { "Content-Type": "application/json" } }
      );
  
      const translatedText = response.data.candidates[0]?.content?.parts[0]?.text || "Translation error";
      setMessages((prevMessages) => [...prevMessages, { text: translatedText, type: "bot" }]);
    } catch (error) {
      console.error("Error translating:", error);
  
      if (error.response?.status === 429) {
        setMessages((prevMessages) => [...prevMessages, { text: "⚠️ API Limit Reached. Try again later.", type: "bot" }]);
      } else {
        setMessages((prevMessages) => [...prevMessages, { text: "Error in translation.", type: "bot" }]);
      }
    }
  
    setInputText("");
    setLoading(false);
  };
  

  return (
    <div className="app-container">
      {/* Show loading animation when translating */}
      {loading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="loading-animation"
        >
          ⏳ Translating...
        </motion.div>
      )}

      <ChatBox messages={messages} />
      <InputBox inputText={inputText} setInputText={setInputText} />
      <TranslateButton onTranslate={handleTranslate} loading={loading} />
    </div>
  );
};

export default App;
