"use client";

import { CATEGORY_LABELS, Category } from "@/lib/constants";

const CATEGORY_CHART_COLORS: Record<Category, string> = {
  social: "#3b82f6",
  food: "#f97316",
  explore: "#22c55e",
  creative: "#a855f7",
  health: "#ef4444",
  learning: "#6366f1",
  custom: "#6b7280",
};

interface CategoryPieProps {
  data: { category: Category; count: number }[];
}

export default function CategoryPie({ data }: CategoryPieProps) {
  const total = data.reduce((sum, d) => sum + d.count, 0);

  if (total === 0) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-lg font-semibold mb-4">分类占比</h3>
        <p className="text-gray-500 text-center py-8">暂无数据</p>
      </div>
    );
  }

  let cumulativeAngle = 0;
  const radius = 60;
  const circumference = 2 * Math.PI * radius;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-6">分类占比</h3>
      <div className="flex items-center gap-6 flex-wrap">
        <svg width="140" height="140" viewBox="0 0 140 140" className="shrink-0">
          <circle cx="70" cy="70" r={radius} fill="none" stroke="#f3f4f6" strokeWidth="20" />
          {data.map((item) => {
            const percentage = item.count / total;
            const dashArray = percentage * circumference;
            const stroke = CATEGORY_CHART_COLORS[item.category];

            const circle = (
              <circle
                key={item.category}
                cx="70"
                cy="70"
                r={radius}
                fill="none"
                stroke={stroke}
                strokeWidth="20"
                strokeDasharray={`${dashArray} ${circumference - dashArray}`}
                strokeDashoffset={-cumulativeAngle * circumference}
                strokeLinecap="butt"
                transform="rotate(-90 70 70)"
              />
            );
            cumulativeAngle += percentage;
            return circle;
          })}
        </svg>

        <div className="flex-1 space-y-2 min-w-[140px]">
          {data.map((item) => (
            <div key={item.category} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: CATEGORY_CHART_COLORS[item.category] }}
                />
                <span className="text-gray-700">{CATEGORY_LABELS[item.category]}</span>
              </div>
              <span className="text-gray-500">
                {item.count} ({Math.round((item.count / total) * 100)}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
