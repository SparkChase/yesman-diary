"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Lock, Globe, Heart } from "lucide-react";
import { Category, CATEGORIES, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface MomentFormProps {
  onSubmit: (data: { content: string; category: Category; isPublic: boolean }) => Promise<void>;
  isSubmitting?: boolean;
}

export default function MomentForm({ onSubmit, isSubmitting = false }: MomentFormProps) {
  const [content, setContent] = useState("");
  const [category, setCategory] = useState<Category>("custom");
  const [isPublic, setIsPublic] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || isSubmitting) return;

    await onSubmit({ content: content.trim(), category, isPublic });

    setContent("");
    setCategory("custom");
    setIsPublic(true);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 2000);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-8 shadow-sm border border-yes-cream relative overflow-hidden">
      {/* Cute decoration */}
      <div className="absolute top-3 right-6 w-5 h-5 rounded-full bg-yes-mint/20" />
      <div className="absolute top-8 right-12 w-3 h-3 rounded-full bg-yes-pink/20" />

      <h2 className="text-xl font-bold mb-6 text-yes-black flex items-center gap-2">
        <Heart className="w-5 h-5 text-yes-pink" />
        记录你的 Yes 时刻
      </h2>

      {/* Textarea */}
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="今天你对什么说了 Yes？（比如：今天学了 Neo4j，虽然很难但还是坚持下来了）"
          className="w-full h-28 p-4 rounded-2xl border-2 border-yes-cream bg-yes-cream/30 text-yes-black placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-yes-pink focus:border-transparent transition-all"
          maxLength={200}
        />
        <div className="text-right text-xs text-gray-400 mt-1">
          {content.length}/200
        </div>
      </div>

      {/* Category Pills */}
      <div className="mb-4">
        <label className="text-sm font-bold text-gray-500 mb-2 block">分类</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c !== "custom").map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105",
                category === cat
                  ? CATEGORY_COLORS[cat]
                  : "bg-yes-cream/50 text-gray-500 hover:bg-yes-cream"
              )}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCategory("custom")}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-bold transition-all hover:scale-105",
              category === "custom"
                ? CATEGORY_COLORS["custom"]
                : "bg-yes-cream/50 text-gray-500 hover:bg-yes-cream"
            )}
          >
            {CATEGORY_LABELS["custom"]}
          </button>
        </div>
      </div>

      {/* Public/Private Toggle + Submit */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setIsPublic(!isPublic)}
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-bold transition-all hover:scale-105",
            isPublic
              ? "bg-yes-sky text-sky-700"
              : "bg-yes-peach text-orange-700"
          )}
        >
          {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          {isPublic ? "公开" : "私密"}
        </button>

        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-yes-pink text-white hover:bg-yes-pink/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-yes-pink/20 font-bold"
        >
          <Send className="w-4 h-4" />
          <span className="text-sm">
            {isSubmitting ? "保存中..." : "记录 Yes 时刻"}
          </span>
        </button>
      </div>

      {/* Success Animation */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="mt-4 text-center text-sm font-bold text-yes-mint bg-yes-mint/10 rounded-2xl py-3 border border-yes-mint/30"
          >
            ✨ 已记录！继续保持 Yes 的态度 ✨
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
