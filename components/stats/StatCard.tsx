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

const accentMap = {
  total: { bg: "bg-yes-sky/20", text: "text-sky-600", card: "bg-white border-yes-sky/30" },
  streak: { bg: "bg-yes-orange/20", text: "text-yes-orange", card: "bg-yes-orange/10 border-yes-orange/30" },
  month: { bg: "bg-yes-pink/20", text: "text-yes-pink", card: "bg-yes-pink/10 border-yes-pink/30" },
};

export default function StatCard({ label, value, icon, accent }: StatCardProps) {
  const Icon = iconMap[icon];
  const theme = accentMap[icon];
  return (
    <div className={`rounded-3xl p-6 shadow-sm border ${accent ? theme.card : "bg-white border-yes-cream/50"}`}>
      <div className="flex items-center gap-3 mb-3">
        <div className={`p-2.5 rounded-2xl ${accent ? theme.bg : "bg-yes-cream/50"}`}>
          <Icon className={`w-5 h-5 ${accent ? theme.text : "text-gray-500"}`} />
        </div>
        <span className="text-sm font-bold text-gray-500">{label}</span>
      </div>
      <p className="text-3xl font-bold text-yes-black">
        {value}
      </p>
    </div>
  );
}
