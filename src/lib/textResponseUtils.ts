import React from "react";

export type EmotionLabel =
  | "Happy"
  | "Sad"
  | "Angry"
  | "Surprise"
  | "Fear"
  | "Neutral";
export type Emotion = { label: EmotionLabel; score: number };

// Simple fake generator used for demos (keyword boosting + randomness)
export function generateFakeEmotions(text: string): Emotion[] {
  const keywords: { [k: string]: string[] } = {
    Happy: ["happy", "joy", "glad", "pleased", "delighted", "smile", "love"],
    Sad: ["sad", "unhappy", "down", "tear", "depress", "grief"],
    Angry: ["angry", "mad", "furious", "annoyed", "hate", "irritated"],
    Surprise: ["surprise", "shocked", "wow", "amazed", "omg"],
    Fear: ["fear", "scared", "terrified", "nervous", "anxious"],
    Neutral: ["okay", "fine", "neutral", "meh", "alright"],
  };

  const lower = text.toLowerCase();
  const base: Emotion[] = (Object.keys(keywords) as EmotionLabel[]).map(
    (label) => ({ label, score: 0.05 })
  );

  for (const [label, words] of Object.entries(keywords)) {
    for (const w of words) {
      if (lower.includes(w)) {
        const idx = base.findIndex((e) => e.label === label);
        base[idx].score += 0.25 + Math.random() * 0.2; // boost
      }
    }
  }

  if (base.every((e) => e.score <= 0.06)) {
    const rndIdx = Math.floor(Math.random() * base.length);
    base[rndIdx].score = 0.5 + Math.random() * 0.35;
  }

  // add some noise and normalize
  let total = 0;
  for (const e of base) {
    e.score += Math.random() * 0.08;
    total += e.score;
  }
  for (const e of base) {
    e.score = Math.round((e.score / total) * 100) / 100; // two decimals
  }

  // sort descending
  return base.sort((a, b) => b.score - a.score);
}

const IconPlaceholder: React.FC<{ className?: string }> = () => null;

export const emotionConfig: {
  [key in EmotionLabel]: {
    icon: React.ElementType;
    color: string;
    progressBar: string;
  };
} = {
  Happy: {
    icon: IconPlaceholder,
    color: "text-green-500",
    progressBar: "bg-green-500",
  },
  Sad: {
    icon: IconPlaceholder,
    color: "text-blue-500",
    progressBar: "bg-blue-500",
  },
  Angry: {
    icon: IconPlaceholder,
    color: "text-red-500",
    progressBar: "bg-red-500",
  },
  Surprise: {
    icon: IconPlaceholder,
    color: "text-yellow-500",
    progressBar: "bg-yellow-500",
  },
  Fear: {
    icon: IconPlaceholder,
    color: "text-purple-500",
    progressBar: "bg-purple-500",
  },
  Neutral: {
    icon: IconPlaceholder,
    color: "text-gray-500",
    progressBar: "bg-gray-500",
  },
};

export function formatPercent(score: number) {
  return `${Math.round(score * 100)}%`;
}

export function computeConfidenceGap(results: Emotion[] | null) {
  if (!results || results.length < 2) return null;
  return results[0].score - results[1].score;
}
