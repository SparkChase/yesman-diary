import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-yes-cream shadow-sm">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-90 transition-opacity">
          <Sparkles className="w-5 h-5 text-yes-orange" />
          <span className="text-yes-black">
            <span className="text-yes-orange">Yes</span> Man Diary
          </span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/timeline" className="text-gray-600 hover:text-yes-orange transition-colors font-medium">
            时间线
          </Link>
          <Link href="/stats" className="text-gray-600 hover:text-yes-orange transition-colors font-medium">
            统计
          </Link>
          <Link href="/private" className="text-gray-600 hover:text-yes-orange transition-colors font-medium">
            私密空间
          </Link>
        </div>
      </div>
    </nav>
  );
}
