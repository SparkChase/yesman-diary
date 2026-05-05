"use client";

import { useState, useCallback } from "react";
import ChallengeCard from "@/components/challenge/ChallengeCard";
import MomentForm from "@/components/moments/MomentForm";
import { Category } from "@/lib/constants";
import { useRouter } from "next/navigation";

interface Challenge {
  id: number;
  content: string;
  category: Category;
}

interface HomeContentProps {
  initialChallenge: Challenge;
}

export default function HomeContent({ initialChallenge }: HomeContentProps) {
  const [challenge, setChallenge] = useState<Challenge>(initialChallenge);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isAccepting, setIsAccepting] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const refreshChallenge = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await fetch("/api/challenges/random");
      const data = await res.json();
      setChallenge(data);
    } catch (error) {
      console.error("Failed to refresh challenge:", error);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  const acceptChallenge = useCallback(async () => {
    setIsAccepting(true);
    try {
      const res = await fetch("/api/moments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          content: challenge.content,
          category: challenge.category,
          source: "recommended",
          is_public: true,
        }),
      });
      if (res.ok) {
        router.refresh();
      }
    } catch (error) {
      console.error("Failed to accept challenge:", error);
    } finally {
      setIsAccepting(false);
    }
  }, [challenge, router]);

  const submitMoment = useCallback(
    async (data: { content: string; category: Category; isPublic: boolean }) => {
      setIsSubmitting(true);
      try {
        const res = await fetch("/api/moments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            content: data.content,
            category: data.category,
            source: "custom",
            is_public: data.isPublic,
          }),
        });
        if (res.ok) {
          router.refresh();
        }
      } catch (error) {
        console.error("Failed to create moment:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [router]
  );

  return (
    <div className="space-y-8">
      <section className="text-center py-8">
        <h1 className="text-3xl sm:text-4xl font-bold mb-3">
          今天你对什么说了 <span className="text-yes-orange">Yes</span>？
        </h1>
        <p className="text-base text-gray-600">每天一件小事，勇敢尝试，记录你的 Yes 时刻</p>
      </section>

      <ChallengeCard
        challenge={challenge}
        onRefresh={refreshChallenge}
        onAccept={acceptChallenge}
        isSubmitting={isRefreshing || isAccepting}
      />

      <MomentForm onSubmit={submitMoment} isSubmitting={isSubmitting} />
    </div>
  );
}
