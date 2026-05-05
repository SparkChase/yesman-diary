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
  social: "bg-blue-100 text-blue-700",
  food: "bg-orange-100 text-orange-700",
  explore: "bg-green-100 text-green-700",
  creative: "bg-purple-100 text-purple-700",
  health: "bg-red-100 text-red-700",
  learning: "bg-indigo-100 text-indigo-700",
  custom: "bg-gray-100 text-gray-700",
};

export const CATEGORIES: Category[] = ["social", "food", "explore", "creative", "health", "learning", "custom"];
