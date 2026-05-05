import { BarChart3, Flame, Calendar, Award } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: "total" | "streak" | "month";
  accent?: boolean;
}

const iconMap = {
  total: BarChart3,
  streak: Flame,
  month: Calendar,
};

export default function StatCard({ label, value, icon, accent }: StatCardProps) {
  const Icon = iconMap[icon];
  return (
    <div className={`rounded-2xl p-6 shadow-sm border ${accent ? "bg-yes-yellow border-yes-yellow/30" : "bg-white border-gray-100"}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2 rounded-lg ${accent ? "bg-yes-black/10" : "bg-gray-100"}`}>
          <Icon className={`w-5 h-5 ${accent ? "text-yes-black" : "text-gray-600"}`} />
        </div>
        <span className="text-sm font-medium text-gray-600">{label}</span>
      </div>
      <p className={`text-3xl font-bold ${accent ? "text-yes-black" : "text-yes-black"}`}>
        {value}
      </p>
    </div>
  );
}
