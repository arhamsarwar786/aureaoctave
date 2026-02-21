"use client";
import React from "react";
import {
  Mic,
  Sparkles,
  Paperclip,
  ChevronDown,
  Volume2,
  Search,
  Image,
  User,
} from "lucide-react";

const AureaAi = () => {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center overflow-hidden">

      {/* Star Background */}
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] [background-size:80px_80px] opacity-10" />

      <div className="relative z-10 w-full max-w-4xl px-6 text-center">

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <Sparkles className="w-10 h-10 text-white" />
          <h1 className="text-5xl font-semibold tracking-wide">Aurea</h1>
        </div>

        {/* Search Bar */}
        <div className="bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 rounded-full px-6 py-4 flex items-center gap-4 shadow-2xl">

          {/* Attachment */}
          <Paperclip className="w-5 h-5 text-gray-400" />

          {/* Input */}
          <input
            type="text"
            placeholder="How can I help you today?"
            className="flex-1 bg-transparent outline-none text-gray-300 placeholder:text-gray-500"
          />

          {/* Auto Mode */}
          <div className="flex items-center gap-1 text-gray-400 text-sm cursor-pointer hover:text-white transition">
            <Sparkles size={16} />
            Auto
            <ChevronDown size={14} />
          </div>

          {/* Mic */}
          <button className="w-9 h-9 rounded-full border border-zinc-700 flex items-center justify-center hover:bg-zinc-800 transition">
            <Mic size={16} />
          </button>

          {/* Voice Visual Button */}
          <button className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:scale-105 transition">
            <Volume2 size={18} />
          </button>
        </div>

        {/* Feature Pills */}
        <div className="flex flex-wrap items-center justify-center gap-4 mt-8">

          <button className="px-5 py-2 rounded-full border border-zinc-700 text-gray-300 hover:bg-zinc-800 transition flex items-center gap-2">
            <Search size={16} />
            DeepSearch
          </button>

          <button className="px-5 py-2 rounded-full border border-zinc-700 text-gray-300 hover:bg-zinc-800 transition flex items-center gap-2">
            <Image size={16} />
            Imagine
          </button>

          <button className="px-5 py-2 rounded-full border border-zinc-700 text-gray-300 hover:bg-zinc-800 transition flex items-center gap-2">
            <User size={16} />
            Pick Personas
            <ChevronDown size={14} />
          </button>

          <button className="px-5 py-2 rounded-full border border-zinc-700 text-gray-300 hover:bg-zinc-800 transition flex items-center gap-2">
            <Volume2 size={16} />
            Voice Chat
          </button>

        </div>

        {/* Terms */}
        <p className="text-xs text-gray-500 mt-8">
          By messaging Aurea, you agree to our{" "}
          <span className="underline cursor-pointer hover:text-gray-300">
            Terms
          </span>{" "}
          and{" "}
          <span className="underline cursor-pointer hover:text-gray-300">
            Privacy Policy
          </span>.
        </p>

      </div>
    </div>
  );
};

export default AureaAi;