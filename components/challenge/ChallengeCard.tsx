"use client";

import { motion } from "framer-motion";
import { RefreshCw, Check, Sparkles } from "lucide-react";
import { Category, CATEGORY_LABELS, CATEGORY_COLORS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Challenge {
  id: number;
  content: string;
  category: Category;
}

interface ChallengeCardProps {
  challenge: Challenge | null;
  onRefresh: () => void;
  onAccept: () => void;
  isSubmitting?: boolean;
}

export default function ChallengeCard({
  challenge,
  onRefresh,
  onAccept,
  isSubmitting = false,
}: ChallengeCardProps) {
  if (!challenge) {
    return (
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-yes-cream text-center">
        <p className="text-gray-400">加载中...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ y: -30, opacity: 0, rotate: -2 }}
      animate={{ y: 0, opacity: 1, rotate: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="relative bg-white rounded-3xl shadow-xl border-2 border-yes-yellow overflow-hidden"
    >
      {/* Cute decorations */}
      <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-yes-pink/30 animate-pulse" />
      <div className="absolute top-8 right-8 w-3 h-3 rounded-full bg-yes-mint/40" />
      <div className="absolute bottom-4 left-4 w-4 h-4 rounded-full bg-yes-sky/30" />

      <div className="pt-8 pb-10 px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yes-orange" />
            <span className="text-sm font-medium text-gray-500">今日推荐挑战</span>
          </div>
          <span className={cn("px-3 py-1 rounded-full text-xs font-bold", CATEGORY_COLORS[challenge.category])}>
            {CATEGORY_LABELS[challenge.category]}
          </span>
        </div>

        {/* Content */}
        <motion.p
          key={challenge.id}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-2xl font-bold text-yes-black text-center mb-8 leading-relaxed"
        >
          {challenge.content}
        </motion.p>

        {/* Actions */}
        <div className="flex items-center gap-3 justify-center">
          <button
            onClick={onRefresh}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl border-2 border-yes-cream text-gray-500 hover:bg-yes-cream/50 hover:border-yes-cream transition-all disabled:opacity-50 font-medium"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="text-sm">换一条</span>
          </button>
          <button
            onClick={onAccept}
            disabled={isSubmitting}
            className="flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-yes-orange text-white hover:bg-yes-orange/90 transition-all disabled:opacity-50 shadow-lg shadow-yes-orange/20 font-bold"
          >
            <Check className="w-4 h-4" />
            <span className="text-sm">
              {isSubmitting ? "保存中..." : "接受挑战"}
            </span>
          </button>
        </div>
      </div>

      {/* Bottom decorations */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-yes-yellow" />
    </motion.div>
  );
}
