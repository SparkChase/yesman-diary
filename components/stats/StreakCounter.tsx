"use client";

import { Flame } from "lucide-react";
import { motion } from "framer-motion";

interface StreakCounterProps {
  streak: number;
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="bg-white rounded-3xl p-6 text-yes-black shadow-sm border border-yes-cream relative overflow-hidden">
      <div className="absolute top-2 right-4 w-4 h-4 rounded-full bg-yes-pink/20" />
      <div className="absolute bottom-2 left-4 w-3 h-3 rounded-full bg-yes-mint/20" />

      <div className="flex items-center gap-3 mb-2">
        <motion.div
          animate={streak > 0 ? { scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] } : {}}
          transition={{ repeat: streak > 0 ? Infinity : 0, duration: 2 }}
        >
          <Flame className="w-6 h-6 text-yes-orange" />
        </motion.div>
        <span className="text-sm font-bold text-gray-500">连续打卡</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold text-yes-orange">{streak}</span>
        <span className="text-lg text-gray-500">天</span>
      </div>
      <p className="text-xs text-gray-400 mt-2">
        {streak > 0 ? "继续保持！每天说 Yes" : "今天还没打卡哦，去记录一个 Yes 时刻吧"}
      </p>
    </div>
  );
}
