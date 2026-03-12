"use client";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import {
  Mic,
  Sparkles,
  Paperclip,
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

const suggestedQuestions = {
  portfolio: [
    "How should I rebalance my portfolio?",
    "What's a good asset allocation for my risk profile?",
  ],
  planning: [
    "How much should I save for retirement?",
    "Should I prioritize my 401(k) or IRA?",
  ],
  education: [
    "What's the difference between stocks and bonds?",
    "How do ETFs work?",
  ],
  market: [
    "How might current market conditions affect my portfolio?",
    "What are the key market trends to watch?",
  ],
};

const suggestionSections = [
  { key: "portfolio", title: "Portfolio", icon: Search },
  { key: "planning", title: "Planning", icon: User },
  { key: "education", title: "Education", icon: Image },
  { key: "market", title: "Market", icon: Volume2 },
];

const formatMessageTime = () =>
  new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

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
          <div className="whitespace-pre-wrap break-words">{msg.content}</div>
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
  const [requestError, setRequestError] = useState("");
  const [selectedSection, setSelectedSection] = useState(suggestionSections[0].key);
  const bottomRef = useRef(null);
  const chatRef = useRef(null);
  const inputRef = useRef(null);
  const requestControllerRef = useRef(null);
  const hasMessages = messages.length > 0;
  const visibleQuestions = suggestedQuestions[selectedSection] ?? [];

  const scrollToBottom = (smooth = true) => {
    bottomRef.current?.scrollIntoView({ behavior: smooth ? "smooth" : "instant" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      requestControllerRef.current?.abort();
    };
  }, []);

  const handleScroll = () => {
    if (!chatRef.current) return;
    const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
    setShowScrollBtn(scrollHeight - scrollTop - clientHeight > 120);
  };

  const stopGeneration = () => {
    requestControllerRef.current?.abort();
    requestControllerRef.current = null;
    setIsTyping(false);
    inputRef.current?.focus();
  };

  const fillSuggestedQuestion = (question) => {
    setInput(question);
    setRequestError("");
    inputRef.current?.focus();
  };

  const sendMessage = async (text) => {
    const content = (text || input).trim();
    if (!content || isTyping) return;

    const nextMessages = [...messages, { role: "user", content, time: formatMessageTime() }];

    setMessages(nextMessages);
    setInput("");
    setRequestError("");
    setIsTyping(true);

    const controller = new AbortController();
    requestControllerRef.current = controller;

    try {
      const response = await axios.post(
        "/aurea-ai/chat",
        {
          messages: nextMessages.map(({ role, content: messageContent }) => ({
            role,
            content: messageContent,
          })),
        },
        {
          signal: controller.signal,
        }
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: response.data.reply,
          time: formatMessageTime(),
        },
      ]);
    } catch (error) {
      if (error.code === "ERR_CANCELED") {
        return;
      }

      const fallbackMessage =
        error.response?.data?.message ||
        "Aurea AI is unavailable right now. Please try again in a moment.";

      setRequestError(fallbackMessage);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: fallbackMessage,
          time: formatMessageTime(),
        },
      ]);
    } finally {
      if (requestControllerRef.current === controller) {
        requestControllerRef.current = null;
      }

      setIsTyping(false);
      inputRef.current?.focus();
    }
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
          <div className={`sticky top-0 z-20 -mx-1 mb-6 rounded-2xl border px-4 py-4 backdrop-blur ${isDark ? "border-white/5 bg-[#161B1F]/95" : "border-gray-200 bg-gray-50/95"}`}>
            <div className="flex flex-wrap items-center gap-2">
              {suggestionSections.map(({ key, title, icon: Icon }) => {
                const isActive = selectedSection === key;

                return (
                  <button
                    key={key}
                    onClick={() => setSelectedSection(key)}
                    className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200 ${isActive
                      ? isDark
                        ? "border-[#3BF5C4]/40 bg-[#3BF5C4]/15 text-[#3BF5C4]"
                        : "border-emerald-300 bg-emerald-50 text-emerald-700"
                      : pillBorder}`}
                  >
                    <Icon size={14} />
                    {title}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mb-8">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h2 className={`text-sm font-semibold ${textMain}`}>
                  {suggestionSections.find(({ key }) => key === selectedSection)?.title} questions
                </h2>
                <p className={`text-xs ${textSub}`}>
                  Select a question to fill the input, then press send to call Aurea AI.
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {visibleQuestions.map((question) => (
                <button
                  key={question}
                  onClick={() => fillSuggestedQuestion(question)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm transition-all duration-200 ${isDark
                    ? "border-white/10 bg-[#1A2026] text-gray-200 hover:border-[#3BF5C4]/30 hover:bg-[#1F2B33]"
                    : "border-gray-200 bg-white text-gray-700 hover:border-emerald-300 hover:bg-emerald-50/60"}`}
                >
                  {question}
                </button>
              ))}
            </div>
          </div>

          {!hasMessages && (
            <div className={`mb-10 rounded-3xl border border-dashed px-6 py-12 text-center ${isDark ? "border-white/10 bg-[#1A2026]/45" : "border-gray-200 bg-white/70"}`}>
              <div
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl shadow-lg"
                style={{
                  background: `linear-gradient(135deg, ${accent}22, ${accent}11)`,
                  border: `1px solid ${accent}44`,
                }}
              >
                <Sparkles size={28} style={{ color: accent }} />
              </div>
              <h2 className={`mb-2 text-2xl font-bold ${textMain}`}>
                Start with a suggested question
              </h2>
              <p className={`mx-auto max-w-md text-sm ${textSub}`}>
                Choose a title above, pick one question, then press send when you are ready.
              </p>
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
          {/* {requestError && (
            <div className={`rounded-xl border px-4 py-3 text-sm ${isDark ? "border-red-500/20 bg-red-500/10 text-red-300" : "border-red-200 bg-red-50 text-red-600"}`}>
              {requestError}
            </div>
          )} */}

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
              onClick={() => (isTyping ? stopGeneration() : sendMessage())}
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