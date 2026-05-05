"use client";

import { Flame } from "lucide-react";
import { motion } from "framer-motion";

interface StreakCounterProps {
  streak: number;
}

export default function StreakCounter({ streak }: StreakCounterProps) {
  return (
    <div className="bg-yes-black rounded-2xl p-6 text-white shadow-lg">
      <div className="flex items-center gap-3 mb-2">
        <motion.div
          animate={streak > 0 ? { scale: [1, 1.2, 1] } : {}}
          transition={{ repeat: streak > 0 ? Infinity : 0, duration: 2 }}
        >
          <Flame className="w-6 h-6 text-yes-orange" />
        </motion.div>
        <span className="text-sm font-medium text-white/80">连续打卡</span>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="text-4xl font-bold">{streak}</span>
        <span className="text-lg text-white/60">天</span>
      </div>
      <p className="text-xs text-white/50 mt-2">
        {streak > 0 ? "继续保持！每天说 Yes" : "今天还没打卡哦，去记录一个 Yes 时刻吧"}
      </p>
    </div>
  );
}
