"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Download, Image as ImageIcon, Smartphone } from "lucide-react";
import { toPng } from "html-to-image";
import PosterVertical from "./PosterVertical";
import PosterSquare from "./PosterSquare";
import { Moment } from "@/lib/constants";

interface ShareModalProps {
  moment: Moment | null;
  isOpen: boolean;
  onClose: () => void;
}

type PosterType = "vertical" | "square";

export default function ShareModal({ moment, isOpen, onClose }: ShareModalProps) {
  const [posterType, setPosterType] = useState<PosterType>("vertical");
  const [isGenerating, setIsGenerating] = useState(false);
  const verticalRef = useRef<HTMLDivElement>(null);
  const squareRef = useRef<HTMLDivElement>(null);

  const handleDownload = useCallback(async () => {
    const ref = posterType === "vertical" ? verticalRef : squareRef;
    if (!ref.current || !moment) return;

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
  }, [posterType, moment]);

  if (!moment) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <h3 className="text-lg font-semibold">分享海报</h3>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
                aria-label="关闭"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Poster type selector */}
            <div className="flex items-center justify-center gap-2 px-6 py-3 border-b border-gray-100">
              <button
                onClick={() => setPosterType("vertical")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  posterType === "vertical"
                    ? "bg-yes-yellow text-yes-black"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
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
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                方形卡片
              </button>
            </div>

            {/* Preview area */}
            <div className="flex-1 overflow-auto p-6 bg-gray-50 flex items-start justify-center">
              <div className="scale-[0.55] origin-top">
                {posterType === "vertical" ? (
                  <PosterVertical ref={verticalRef} moment={moment} />
                ) : (
                  <PosterSquare ref={squareRef} moment={moment} />
                )}
              </div>
            </div>

            {/* Footer actions */}
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                预览已缩小，下载为高清原图
              </p>
              <button
                onClick={handleDownload}
                disabled={isGenerating}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-yes-black text-white hover:bg-yes-black/90 transition-all disabled:opacity-50 text-sm font-medium"
              >
                <Download className="w-4 h-4" />
                {isGenerating ? "生成中..." : "下载海报"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
