"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, Sparkles } from "lucide-react";

interface PasswordGateProps {
  onUnlock: (password: string) => void;
  error?: string;
}

export default function PasswordGate({ onUnlock, error }: PasswordGateProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      onUnlock(password.trim());
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto"
    >
      <div className="bg-white rounded-3xl p-8 shadow-lg border-2 border-yes-pink/30 text-center relative overflow-hidden">
        {/* Cute decorations */}
        <div className="absolute top-3 left-4 w-4 h-4 rounded-full bg-yes-mint/20" />
        <div className="absolute top-6 right-6 w-3 h-3 rounded-full bg-yes-sky/20" />

        <div className="w-16 h-16 bg-yes-pink/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-yes-pink" />
        </div>
        <h2 className="text-xl font-bold text-yes-black mb-2">私密空间</h2>
        <p className="text-gray-400 text-sm mb-8">只有你知道密码才能进入这里</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="输入访问密码"
              className="w-full px-4 py-3 pr-12 rounded-2xl bg-yes-cream/30 border-2 border-yes-cream text-yes-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yes-pink focus:border-transparent transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-yes-pink transition-colors"
              aria-label={showPassword ? "隐藏密码" : "显示密码"}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          {error && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-yes-orange text-sm font-medium"
            >
              {error}
            </motion.p>
          )}

          <button
            type="submit"
            className="w-full py-3 rounded-2xl bg-yes-pink text-white font-bold hover:bg-yes-pink/90 transition-colors shadow-lg shadow-yes-pink/20"
          >
            <span className="flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" />
              进入私密空间
            </span>
          </button>
        </form>
      </div>
    </motion.div>
  );
}
