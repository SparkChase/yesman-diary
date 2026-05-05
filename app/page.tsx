import HomeContent from "@/components/home/HomeContent";
import challenges from "@/data/challenges";

export default function HomePage() {
  const randomIndex = Math.floor(Math.random() * challenges.length);
  const initialChallenge = challenges[randomIndex];

  return <HomeContent initialChallenge={initialChallenge} />;
}
