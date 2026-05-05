"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Lock, Globe } from "lucide-react";
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
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
      <h2 className="text-xl font-semibold mb-6">记录你的 Yes 时刻</h2>

      {/* Textarea */}
      <div className="mb-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="今天你对什么说了 Yes？（比如：今天学了 Neo4j，虽然很难但还是坚持下来了）"
          className="w-full h-28 p-4 rounded-xl border border-gray-200 bg-gray-50 text-yes-black placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-yes-yellow focus:border-transparent transition-all"
          maxLength={200}
        />
        <div className="text-right text-xs text-gray-400 mt-1">
          {content.length}/200
        </div>
      </div>

      {/* Category Pills */}
      <div className="mb-4">
        <label className="text-sm font-medium text-gray-600 mb-2 block">分类</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.filter((c) => c !== "custom").map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategory(cat)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
                category === cat
                  ? CATEGORY_COLORS[cat]
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              )}
            >
              {CATEGORY_LABELS[cat]}
            </button>
          ))}
          <button
            type="button"
            onClick={() => setCategory("custom")}
            className={cn(
              "px-3 py-1.5 rounded-full text-xs font-medium transition-all",
              category === "custom"
                ? CATEGORY_COLORS["custom"]
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
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
            "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all",
            isPublic
              ? "bg-blue-50 text-blue-600"
              : "bg-gray-100 text-gray-600"
          )}
        >
          {isPublic ? <Globe className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
          {isPublic ? "公开" : "私密"}
        </button>

        <button
          type="submit"
          disabled={!content.trim() || isSubmitting}
          className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-yes-orange text-white hover:bg-yes-orange/90 transition-all disabled:opacity-40 disabled:cursor-not-allowed shadow-lg shadow-yes-orange/20"
        >
          <Send className="w-4 h-4" />
          <span className="text-sm font-medium">
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
            className="mt-4 text-center text-sm font-medium text-green-600 bg-green-50 rounded-lg py-2"
          >
            已记录！继续保持 Yes 的态度
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  );
}
