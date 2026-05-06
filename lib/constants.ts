export type Category = "social" | "food" | "explore" | "creative" | "health" | "learning" | "custom";

export interface Moment {
  id: number;
  content: string;
  category: Category;
  source: "recommended" | "custom";
  is_public: boolean;
  completed_at: string;
  created_at: string;
}

export const CATEGORY_LABELS: Record<Category, string> = {
  social: "社交",
  food: "美食",
  explore: "探索",
  creative: "创意",
  health: "健康",
  learning: "学习",
  custom: "自定义",
};

export const CATEGORY_COLORS: Record<Category, string> = {
  social: "bg-yes-sky text-sky-700 border border-sky-200",
  food: "bg-yes-peach text-orange-700 border border-orange-200",
  explore: "bg-yes-mint text-emerald-700 border border-emerald-200",
  creative: "bg-yes-lavender text-purple-700 border border-purple-200",
  health: "bg-yes-coral text-rose-700 border border-rose-200",
  learning: "bg-blue-100 text-blue-700 border border-blue-200",
  custom: "bg-gray-100 text-gray-600 border border-gray-200",
};

export const CATEGORIES: Category[] = ["social", "food", "explore", "creative", "health", "learning", "custom"];
