// utils/evaluateFake.ts
import { generateFakeEmotionsImproved } from "./fakeEmotionGen";

type EmotionLabel = "Happy" | "Sad" | "Angry" | "Surprise" | "Fear" | "Neutral";

export function evaluateDataset(
  dataset: { text: string; expected: EmotionLabel }[],
  opts?: { seed?: number; confidenceBoost?: number }
) {
  let correctTop1 = 0;
  const counts: Record<string, Record<string, number>> = {}; // expected -> predicted -> count
  for (const item of dataset) {
    const r = generateFakeEmotionsImproved(item.text, {
      seed: opts?.seed,
      confidenceBoost: opts?.confidenceBoost ?? 0.3,
      noiseLevel: 0.04,
    });
    const predicted = r[0].label;
    if (!counts[item.expected]) counts[item.expected] = {};
    counts[item.expected][predicted] = (counts[item.expected][predicted] || 0) + 1;
    if (predicted === item.expected) correctTop1++;
  }
  const accuracy = correctTop1 / dataset.length;
  return { accuracy, counts };
}
