"use client";

interface MonthlyChartProps {
  data: { month: string; count: number }[];
}

export default function MonthlyChart({ data }: MonthlyChartProps) {
  const maxCount = Math.max(...data.map((d) => d.count), 1);

  const formatMonthLabel = (month: string) => {
    const [year, m] = month.split("-");
    return `${year}年${parseInt(m)}月`;
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <h3 className="text-lg font-semibold mb-6">近 12 个月完成数</h3>
      <div className="space-y-3">
        {data.map((item) => {
          const percentage = (item.count / maxCount) * 100;
          return (
            <div key={item.month} className="flex items-center gap-3">
              <span className="text-xs text-gray-500 w-20 shrink-0 text-right">
                {formatMonthLabel(item.month)}
              </span>
              <div className="flex-1 h-6 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yes-orange rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${Math.max(percentage, 2)}%` }}
                />
              </div>
              <span className="text-xs font-medium text-gray-700 w-6 shrink-0 text-right">
                {item.count}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
