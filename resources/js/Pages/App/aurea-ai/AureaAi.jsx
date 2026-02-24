"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Mic,
  Sparkles,
  Paperclip,
  ChevronDown,
  Volume2,
  Search,
  Image,
  User,
  Send,
  Bot,
  StopCircle,
  Copy,
  Check,
  ArrowDown,
} from "lucide-react";
import { useTheme } from "@/Components/App/ThemeContext";

// ─── Demo AI responses ────────────────────────────────────────────────────────
const DEMO_RESPONSES = [
  "Great question! Aurea AI is here to assist you with intelligent insights, data analysis, and personalized recommendations tailored to your needs. How can I dive deeper for you?",
  "I've analyzed your request and here's what I found: the patterns suggest a strong upward trend over the next 30 days. Would you like a detailed breakdown or a visual chart?",
  "Absolutely! Based on your portfolio data, I recommend diversifying into three key sectors. I can generate a full report with risk assessments if you'd like.",
  "That's an interesting query! Let me process the latest market signals... Based on current indicators, the outlook appears optimistic. Want me to send you a summary report?",
  "I'm Aurea AI, your intelligent financial assistant powered by cutting-edge machine learning. I can help with market analysis, investment strategies, and real-time insights. What would you like to explore?",
  "Here's a quick summary: your account performance is up 12.4% this month, outperforming the benchmark by 3.2%. The top-performing asset in your portfolio was tech equities. Shall I break it down further?",
];

const getRandomResponse = () =>
  DEMO_RESPONSES[Math.floor(Math.random() * DEMO_RESPONSES.length)];

// ─── Suggestion chips ─────────────────────────────────────────────────────────
const SUGGESTIONS = [
  { icon: Search, label: "Analyze my portfolio" },
  { icon: Image, label: "Generate market chart" },
  { icon: User, label: "Investment strategies" },
  { icon: Volume2, label: "Voice summary" },
];

// ─── Typing dots animation ────────────────────────────────────────────────────
const TypingIndicator = ({ isDark }) => (
  <div className="flex items-end gap-3 mb-6 animate-fadeIn">
    <div
      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg
      ${isDark ? "bg-[#3BF5C4]/20 border border-[#3BF5C4]/40" : "bg-emerald-100 border border-emerald-300"}`}
    >
      <Bot size={16} className={isDark ? "text-[#3BF5C4]" : "text-emerald-600"} />
    </div>
    <div
      className={`px-5 py-3.5 rounded-2xl rounded-bl-sm shadow-sm
        ${isDark ? "bg-[#1E2830] border border-white/5" : "bg-white border border-gray-200"}`}
    >
      <div className="flex items-center gap-1.5 h-5">
        <span className={`w-2 h-2 rounded-full animate-bounce ${isDark ? "bg-[#3BF5C4]" : "bg-emerald-500"}`} style={{ animationDelay: "0ms" }} />
        <span className={`w-2 h-2 rounded-full animate-bounce ${isDark ? "bg-[#3BF5C4]" : "bg-emerald-500"}`} style={{ animationDelay: "150ms" }} />
        <span className={`w-2 h-2 rounded-full animate-bounce ${isDark ? "bg-[#3BF5C4]" : "bg-emerald-500"}`} style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  </div>
);

// ─── Message bubble ────────────────────────────────────────────────────────────
const MessageBubble = ({ msg, isDark }) => {
  const [copied, setCopied] = useState(false);
  const isUser = msg.role === "user";

  const handleCopy = () => {
    navigator.clipboard.writeText(msg.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`flex items-end gap-3 mb-6 animate-fadeIn ${isUser ? "flex-row-reverse" : ""}`}>
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg
          ${isUser
            ? isDark ? "bg-[#3BF5C4]/20 border border-[#3BF5C4]/40" : "bg-emerald-100 border border-emerald-300"
            : isDark ? "bg-white/5 border border-white/10" : "bg-gray-100 border border-gray-200"
          }`}
      >
        {isUser
          ? <User size={15} className={isDark ? "text-[#3BF5C4]" : "text-emerald-600"} />
          : <Bot size={15} className={isDark ? "text-gray-400" : "text-gray-500"} />
        }
      </div>

      {/* Bubble */}
      <div className={`group relative max-w-[75%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-1`}>
        <div
          className={`px-5 py-3.5 rounded-2xl shadow-sm leading-relaxed text-sm
            ${isUser
              ? isDark
                ? "bg-gradient-to-br from-[#3BF5C4] to-emerald-400 text-black rounded-br-sm font-medium"
                : "bg-gradient-to-br from-emerald-500 to-teal-400 text-white rounded-br-sm font-medium"
              : isDark
                ? "bg-[#1E2830] border border-white/5 text-gray-200 rounded-bl-sm"
                : "bg-white border border-gray-200 text-gray-700 rounded-bl-sm shadow-sm"
            }`}
        >
          {msg.content}
        </div>

        {/* Copy button (AI only) */}
        {!isUser && (
          <button
            onClick={handleCopy}
            className={`ml-1 flex items-center gap-1 text-xs opacity-0 group-hover:opacity-100 transition-all duration-200
              ${isDark ? "text-gray-500 hover:text-gray-300" : "text-gray-400 hover:text-gray-600"}`}
          >
            {copied ? <Check size={12} className="text-emerald-500" /> : <Copy size={12} />}
            {copied ? "Copied!" : "Copy"}
          </button>
        )}

        {/* Timestamp */}
        <span className={`text-[10px] mx-1 ${isDark ? "text-gray-600" : "text-gray-400"}`}>
          {msg.time}
        </span>
      </div>
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
const AureaAi = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const bottomRef = useRef(null);
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const hasMessages = messages.length > 0;

  const scrollToBottom = (smooth = true) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleScroll = () => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 120);
  };

  const sendMessage = (text) => {
    const content = (text || input).trim();
    if (!content || isTyping) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

    setMessages((prev) => [...prev, { role: "user", content, time }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    const delay = 1200 + Math.random() * 800;
    setTimeout(() => {
      const aiTime = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
      setMessages((prev) => [
        ...prev,
        { role: "ai", content: getRandomResponse(), time: aiTime },
      ]);
      setIsTyping(false);
    }, delay);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ─── Colors / tokens ───────────────────────────────────────────────────────
  const bg = isDark ? "bg-[#161B1F]" : "bg-gray-50";
  const cardBg = isDark ? "bg-[#1A2026]" : "bg-white";
  const border = isDark ? "border-white/5" : "border-gray-200";
  const accent = isDark ? "#3BF5C4" : "#10b981";
  const inputBg = isDark ? "bg-[#1E2830]" : "bg-white";
  const inputBorder = isDark ? "border-white/10" : "border-gray-300";
  const placeholderColor = isDark ? "placeholder:text-gray-600" : "placeholder:text-gray-400";
  const textMain = isDark ? "text-gray-100" : "text-gray-800";
  const textSub = isDark ? "text-gray-500" : "text-gray-500";
  const pillBorder = isDark ? "border-white/10 text-gray-400 hover:bg-white/5 hover:text-gray-200" : "border-gray-300 text-gray-500 hover:bg-gray-100 hover:text-gray-800";

  return (
    <div className={`flex flex-col h-[calc(100vh-80px)] ${bg} transition-colors duration-300`}>

      {/* ── HEADER ── */}
      <div className={`flex items-center gap-3 px-6 py-4 border-b ${border} ${cardBg} transition-colors duration-300`}>
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg"
          style={{ background: `linear-gradient(135deg, ${accent}22, ${accent}44)`, border: `1px solid ${accent}44` }}
        >
          <Sparkles size={20} style={{ color: accent }} />
        </div>
        <div>
          <h1 className={`text-lg font-semibold leading-tight ${textMain}`}>Aurea AI</h1>
          <p className={`text-xs ${textSub}`}>Powered by advanced intelligence</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className={`text-xs ${textSub}`}>Online</span>
        </div>
      </div>

      {/* ── CHAT AREA ── */}
      <div
        ref={chatRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-4 sm:px-8 py-6 scroll-smooth"
      >
        <div className="max-w-3xl mx-auto">

          {/* Empty state */}
          {!hasMessages && (
            <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center gap-6 animate-fadeIn">
              {/* Glowing orb */}
              <div className="relative">
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center shadow-2xl"
                  style={{
                    background: `linear-gradient(135deg, ${accent}33, ${accent}11)`,
                    border: `1px solid ${accent}44`,
                    boxShadow: `0 0 40px ${accent}22`,
                  }}
                >
                  <Sparkles size={36} style={{ color: accent }} />
                </div>
                <div
                  className="absolute -inset-3 rounded-3xl -z-10 blur-2xl opacity-30"
                  style={{ background: `radial-gradient(circle, ${accent}, transparent)` }}
                />
              </div>

              <div>
                <h2 className={`text-3xl font-bold mb-2 ${textMain}`}>
                  How can I help you today?
                </h2>
                <p className={`text-sm max-w-sm ${textSub}`}>
                  Ask me anything about your portfolio, market trends, or investment strategies.
                </p>
              </div>

              {/* Suggestion chips */}
              <div className="flex flex-wrap justify-center gap-3 mt-2">
                {SUGGESTIONS.map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    onClick={() => sendMessage(label)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 ${pillBorder}`}
                  >
                    <Icon size={15} />
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Message list */}
          {messages.map((msg, i) => (
            <MessageBubble key={i} msg={msg} isDark={isDark} />
          ))}

          {/* Typing indicator */}
          {isTyping && <TypingIndicator isDark={isDark} />}

          <div ref={bottomRef} />
        </div>
      </div>

      {/* Scroll-to-bottom button */}
      {showScrollBtn && (
        <button
          onClick={() => scrollToBottom()}
          className={`absolute bottom-28 right-8 w-9 h-9 rounded-full border shadow-lg 
            flex items-center justify-center transition-all duration-200 z-20
            ${isDark ? "bg-[#1E2830] border-white/10 text-gray-400 hover:text-white" : "bg-white border-gray-200 text-gray-500 hover:text-gray-800"}`}
        >
          <ArrowDown size={16} />
        </button>
      )}

      {/* ── INPUT AREA ── */}
      <div className={`px-4 sm:px-8 py-4 border-t ${border} ${cardBg} transition-colors duration-300`}>
        <div className="max-w-3xl mx-auto space-y-3">

          {/* Input box */}
          <div
            className={`flex items-center gap-3 ${inputBg} border ${inputBorder} rounded-2xl px-4 py-3 shadow-sm transition-all duration-200
              focus-within:ring-2`}
            style={{ "--tw-ring-color": `${accent}44` }}
          >
            {/* Attach */}
            <button
              className={`${textSub} hover:text-emerald-400 transition-colors flex-shrink-0`}
              title="Attach file"
            >
              <Paperclip size={18} />
            </button>

            {/* Textarea */}
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Message Aurea AI…"
              disabled={isTyping}
              className={`flex-1 bg-transparent outline-none focus:outline-none focus-within:ring-0 focus-within:ring-none border-none focus:border-none text-sm ${textMain} ${placeholderColor} disabled:opacity-50`}
            />

            {/* Mic */}
            <button
              className={`${textSub} hover:text-emerald-400 transition-colors flex-shrink-0`}
              title="Voice input"
            >
              <Mic size={18} />
            </button>

            {/* Send / Stop */}
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() && !isTyping}
              className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-all duration-200
                ${(input.trim() || isTyping)
                  ? "opacity-100 scale-100 shadow-md"
                  : "opacity-40 scale-95"
                }`}
              style={{
                background: (input.trim() || isTyping)
                  ? `linear-gradient(135deg, ${accent}, ${isDark ? "#10b981" : "#059669"})`
                  : isDark ? "#1E2830" : "#e5e7eb",
              }}
              title={isTyping ? "Stop" : "Send"}
            >
              {isTyping
                ? <StopCircle size={16} className="text-black" />
                : <Send size={16} className={input.trim() ? "text-black" : (isDark ? "text-gray-500" : "text-gray-400")} />
              }
            </button>
          </div>

          {/* Bottom pills */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              { icon: Search, label: "DeepSearch" },
              { icon: Image, label: "Imagine" },
              { icon: User, label: "Personas", chevron: true },
              { icon: Volume2, label: "Voice Chat" },
            ].map(({ icon: Icon, label, chevron }) => (
              <button
                key={label}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full border text-xs font-medium transition-all duration-200 ${pillBorder}`}
              >
                <Icon size={13} />
                {label}
                {chevron && <ChevronDown size={11} />}
              </button>
            ))}
          </div>

          {/* Terms */}
          <p className={`text-center text-[11px] ${textSub}`}>
            By messaging Aurea AI, you agree to our{" "}
            <span className="underline cursor-pointer hover:text-emerald-400 transition-colors">Terms</span>{" "}
            and{" "}
            <span className="underline cursor-pointer hover:text-emerald-400 transition-colors">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AureaAi;