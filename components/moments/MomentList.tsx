"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CalendarDays } from "lucide-react";
import { Moment } from "@/lib/constants";
import { groupByMonth, formatMonth } from "@/lib/utils";
import MomentItem from "./MomentItem";

interface MomentListProps {
  moments: Moment[];
}

export default function MomentList({ moments }: MomentListProps) {
  const grouped = groupByMonth(moments);
  const months = Object.keys(grouped).sort((a, b) => b.localeCompare(a));
  const [openMonths, setOpenMonths] = useState<Set<string>>(new Set(months.slice(0, 3)));

  const toggleMonth = (month: string) => {
    setOpenMonths((prev) => {
      const next = new Set(prev);
      if (next.has(month)) {
        next.delete(month);
      } else {
        next.add(month);
      }
      return next;
    });
  };

  if (months.length === 0) {
    return (
      <div className="text-center py-16">
        <CalendarDays className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <p className="text-gray-500">还没有记录任何 Yes 时刻</p>
        <p className="text-sm text-gray-400 mt-1">去首页接受一个挑战吧！</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {months.map((month) => {
        const isOpen = openMonths.has(month);
        const items = grouped[month];

        return (
          <div key={month} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <button
              onClick={() => toggleMonth(month)}
              className="w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-yes-black">
                  {formatMonth(`${month}-01`)}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-yes-yellow/20 text-yes-black text-xs font-medium">
                  {items.length} 条
                </span>
              </div>
              <motion.div
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <ChevronDown className="w-5 h-5 text-gray-400" />
              </motion.div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 space-y-3">
                    {items.map((moment) => (
                      <MomentItem key={moment.id} moment={moment} />
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
