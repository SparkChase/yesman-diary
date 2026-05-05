"use client";

import { useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Download, Smartphone, Image as ImageIcon, ArrowLeft } from "lucide-react";
import { toPng } from "html-to-image";
import PosterVertical from "@/components/share/PosterVertical";
import PosterSquare from "@/components/share/PosterSquare";
import { Moment } from "@/lib/constants";
import Link from "next/link";

type PosterType = "vertical" | "square";

interface SharePageClientProps {
  moment: Moment;
}

export default function SharePageClient({ moment }: SharePageClientProps) {
  const [posterType, setPosterType] = useState<PosterType>("vertical");
  const [isGenerating, setIsGenerating] = useState(false);
  const verticalRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    const ref = posterType === "vertical" ? verticalRef : squareRef;
    if (!ref.current) return;

    setIsGenerating(true);
    try {
      const dataUrl = await toPng(ref.current, {
        pixelRatio: 2,
        cacheBust: true,
      });

      const link = document.createElement("a");
      link.download = `yes-man-${moment.id}-${posterType}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to generate poster:", error);
    } finally {
      setIsGenerating(false);
    }
  }, [posterType, moment.id]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Link
            href="/timeline"
            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-yes-black">分享海报</h1>
        </div>
      </div>

      {/* Poster type selector */}
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={() => setPosterType("vertical")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            posterType === "vertical"
              ? "bg-yes-yellow text-yes-black"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <Smartphone className="w-4 h-4" />
          竖版票根
        </button>
        <button
          onClick={() => setPosterType("square")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            posterType === "square"
              ? "bg-yes-yellow text-yes-black"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          方形卡片
        </button>
      </div>

      {/* Poster preview */}
      <motion.div
        key={posterType}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center"
      >
        <div className="shadow-2xl rounded-lg overflow-hidden">
          {posterType === "vertical" ? (
            <PosterVertical ref={verticalRef} moment={moment} />
          ) : (
            <PosterSquare ref={squareRef} moment={moment} />
          )}
        </div>
      </motion.div>

      {/* Download button */}
      <div className="flex justify-center pb-8">
        <button
          onClick={handleDownload}
          disabled={isGenerating}
          className="flex items-center gap-2 px-8 py-3 rounded-xl bg-yes-black text-white hover:bg-yes-black/90 transition-all disabled:opacity-50 text-sm font-medium shadow-lg"
        >
          <Download className="w-4 h-4" />
          {isGenerating ? "生成中..." : "下载海报"}
        </button>
      </div>
    </div>
  );
}
