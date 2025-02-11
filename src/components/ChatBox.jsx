import React from "react";
import { motion } from "framer-motion";
import userIcon from "../assets/user.png";  // User avatar
import botIcon from "../assets/bot.png";    // Bot avatar
import "./ChatBox.css";

const ChatBox = ({ messages }) => {
  return (
    <div className="chat-box">
      {messages.map((msg, index) => (
        <motion.div
          key={index}
          className={`message ${msg.type}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <img src={msg.type === "user" ? userIcon : botIcon} alt="icon" className="avatar" />
          <div className="message-text">
            {msg.type === "bot" ? (
              <div
                dangerouslySetInnerHTML={{
                  __html: msg.text
                    .replace(/\*\*(Translation|English Translation):\*\*/gi, "<strong>Translation:</strong><br>") // Handles both variations
                    .replace(/\*\*(Meaning|Explanation):\*\*/g, "<br><br><strong>Meaning:</strong><br>"), // Handles both "Meaning" and "Explanation",
                }}
              />
            ) : (
              <p>{msg.text}</p>
            )}
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default ChatBox;
