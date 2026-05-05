"use client";

import { useEffect, useState } from "react";
import StatCard from "@/components/stats/StatCard";
import MonthlyChart from "@/components/stats/MonthlyChart";
import CategoryPie from "@/components/stats/CategoryPie";
import StreakCounter from "@/components/stats/StreakCounter";
import { Stats } from "@/lib/stats";
import { BarChart3 } from "lucide-react";

export default function StatsPageClient() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then((data) => {
        setStats(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load stats:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center gap-3 py-4">
          <BarChart3 className="w-6 h-6 text-yes-orange" />
          <h1 className="text-2xl font-bold text-yes-black">统计</h1>
        </div>
        <div className="animate-pulse space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-32 bg-gray-100 rounded-2xl" />
            ))}
          </div>
          <div className="h-64 bg-gray-100 rounded-2xl" />
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="text-center py-16">
        <p className="text-gray-500">加载统计数据失败</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 py-4">
        <BarChart3 className="w-6 h-6 text-yes-orange" />
        <h1 className="text-2xl font-bold text-yes-black">统计</h1>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="总完成数" value={stats.total} icon="total" />
        <StatCard label="本月完成" value={stats.thisMonth} icon="month" accent />
        <StatCard label="连续打卡" value={`${stats.streak} 天`} icon="streak" />
      </div>

      {/* Streak Highlight */}
      <StreakCounter streak={stats.streak} />

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyChart data={stats.monthly} />
        <CategoryPie data={stats.byCategory} />
      </div>
    </div>
  );
}
