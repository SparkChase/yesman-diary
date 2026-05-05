import Link from "next/link";
import { Clapperboard } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-yes-black text-white">
      <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg hover:opacity-90 transition-opacity">
          <Clapperboard className="w-5 h-5 text-yes-yellow" />
          <span>
            <span className="text-yes-yellow">Yes</span> Man Diary
          </span>
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/timeline" className="hover:text-yes-yellow transition-colors">
            时间线
          </Link>
          <Link href="/stats" className="hover:text-yes-yellow transition-colors">
            统计
          </Link>
          <Link href="/private" className="hover:text-yes-yellow transition-colors">
            私密空间
          </Link>
        </div>
      </div>
    </nav>
  );
}
