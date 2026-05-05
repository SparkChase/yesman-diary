"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import PasswordGate from "@/components/layout/PasswordGate";
import MomentList from "@/components/moments/MomentList";
import { Moment } from "@/lib/constants";
import { Lock, LogOut } from "lucide-react";

export default function PrivatePageClient() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [moments, setMoments] = useState<Moment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleUnlock = useCallback(async (pwd: string) => {
    setPassword(pwd);
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/moments/private", {
        headers: { "x-private-password": pwd },
      });

      if (!res.ok) {
        if (res.status === 401) {
          setError("密码错误，请重试");
        } else {
          setError("获取数据失败");
        }
        return;
      }

      const data = await res.json();
      setMoments(data);
      setIsUnlocked(true);
    } catch (err) {
      setError("网络错误，请重试");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleLock = useCallback(() => {
    setIsUnlocked(false);
    setPassword("");
    setMoments([]);
    setError("");
  }, []);

  if (!isUnlocked) {
    return (
      <div className="space-y-6 pt-8">
        <div className="text-center">
          <Lock className="w-8 h-8 text-yes-orange mx-auto mb-3" />
          <h1 className="text-2xl font-bold text-yes-black">私密空间</h1>
          <p className="text-sm text-gray-500 mt-1">只有你能看到的 Yes 时刻</p>
        </div>
        <PasswordGate onUnlock={handleUnlock} error={error} />
        {loading && (
          <p className="text-center text-sm text-gray-400 animate-pulse">验证中...</p>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between py-4">
        <div className="flex items-center gap-3">
          <Lock className="w-6 h-6 text-yes-orange" />
          <div>
            <h1 className="text-2xl font-bold text-yes-black">私密空间</h1>
            <p className="text-sm text-gray-500">只有你能看到的 Yes 时刻</p>
          </div>
        </div>
        <button
          onClick={handleLock}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition-all text-sm"
        >
          <LogOut className="w-4 h-4" />
          退出
        </button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <MomentList moments={moments} />
      </motion.div>
    </div>
  );
}
