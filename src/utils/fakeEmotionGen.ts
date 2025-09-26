// utils/fakeEmotionGen.ts
type EmotionLabel = "Happy" | "Sad" | "Angry" | "Surprise" | "Fear" | "Neutral";
type Emotion = { label: EmotionLabel; score: number };

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateFakeEmotionsImproved(
  text: string,
  opts?: {
    seed?: number; // deterministic if provided
    confidenceBoost?: number; // >0 to make predictions more confident (0.0..1.0)
    noiseLevel?: number; // how much random noise to add (0..1)
  }
): Emotion[] {
  const rng = opts?.seed != null ? mulberry32(opts.seed) : Math.random;

const keywords: Record<EmotionLabel, string[]> = {
  Happy: [
    "happy", "joy", "glad", "pleased", "delighted", "smile", "love", "great", 
    "awesome", "fantastic", "wonderful", "excited", "cheerful", "grateful",
    "positive", "sunny", "yay", "good", "blessed", "peaceful", "ecstatic", 
    "thrilled", "elated", "overjoyed", "amazing", "content", "optimistic", 
    "jolly", "radiant", "beautiful", "fun", "playful", "😂", "😃", "😁", "😊", "🥳", "😍"
  ],
  Sad: [
    "sad", "unhappy", "down", "tear", "depress", "grief", "mourn", "sorrow", 
    "lonely", "heartbroken", "cry", "upset", "gloomy", "miserable", "hurt", 
    "blue", "unloved", "hopeless", "melancholy", "despair", "😭", "😢", "💔", 
    "☹️", "😞", "😔", "😿", "🥀","🥹"
  ],
  Angry: [
    "angry", "mad", "furious", "annoyed", "hate", "irritated", "rage",
    "frustrated", "disgusted", "hostile", "offended", "pissed", "resent",
    "outraged", "infuriated", "bitter", "grumpy", "enraged", "rebellious", 
    "spiteful", "😡", "🤬", "😤", "👿", "🔥"
  ],
  Surprise: [
    "surprise", "shocked", "wow", "amazed", "omg", "unexpected", "astonished",
    "incredible", "unbelievable", "suddenly", "whoa", "what?!", "no way",
    "flabbergasted", "speechless", "astounded", "mind-blown", "holy", "😲", 
    "😮", "😯", "🤯", "🙀"
  ],
  Fear: [
    "fear", "scared", "terrified", "nervous", "anxious", "worried",
    "afraid", "panic", "insecure", "hesitant", "uncertain", "threatened",
    "horrified", "frightened", "apprehensive", "paranoid", "creeped out",
    "😨", "😰", "😱", "😟", "🙀", "👻"
  ],
Neutral: [
    "okay", "fine", "neutral", "meh", "alright", "so-so", "average",
    "normal", "not bad", "whatever", "nothing special", "decent",
    "okayish", "cool", "just okay", "nothing much", "chill", "casual",
    "ordinary", "routine", "moderate", "😐", "😑", "🙃", "🤷"
  ]
}
;


  // base prior probabilities (small bias to neutral)
  const priors: Record<EmotionLabel, number> = {
    Happy: 0.15,
    Sad: 0.12,
    Angry: 0.1,
    Surprise: 0.1,
    Fear: 0.08,
    Neutral: 0.45,
  };

  const lower = text.toLowerCase();
  const scores: Record<EmotionLabel, number> = {
    Happy: priors.Happy,
    Sad: priors.Sad,
    Angry: priors.Angry,
    Surprise: priors.Surprise,
    Fear: priors.Fear,
    Neutral: priors.Neutral,
  };

  // keyword hits produce additive score increases with diminishing returns
  for (const label of Object.keys(keywords) as EmotionLabel[]) {
    let hits = 0;
    for (const w of keywords[label]) {
      // word boundary check (simple)
      const pattern = new RegExp(
        `\\b${w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
        "i"
      );
      if (pattern.test(lower)) hits++;
    }
    if (hits > 0) {
      // each hit adds smaller increments; more hits -> more confidence
      scores[label] += 0.25 * (1 - Math.exp(-0.8 * hits));
    }
  }

  // Sentiment-ish cue: exclamation marks, emojis, intensifiers
  const exclamations = (text.match(/!/g) || []).length;
  if (exclamations > 0) {
    scores.Happy += 0.07 * Math.min(exclamations, 3);
    scores.Surprise += 0.05 * Math.min(exclamations, 3);
  }
  if (/[?]{2,}/.test(text) || /\b(why|how|who)\b/.test(lower)) {
    scores.Surprise += 0.06;
  }
  if (/\b(very|extremely|so|really)\b/.test(lower)) {
    // amplifies any existing top candidates by a small factor
    for (const k of Object.keys(scores) as EmotionLabel[]) {
      scores[k] *= 1 + 0.03;
    }
  }

  // Add controlled noise
  const noiseLevel = opts?.noiseLevel ?? 0.06;
  for (const k of Object.keys(scores) as EmotionLabel[]) {
    const n = (rng() - 0.5) * 2 * noiseLevel; // -noise..+noise
    scores[k] = Math.max(0.0001, scores[k] + n);
  }

  // softmax normalization
  const exp = (v: number) => Math.exp(v);
  const exps = (Object.keys(scores) as EmotionLabel[]).map((k) =>
    exp(scores[k])
  );
  const sumExps = exps.reduce((a, b) => a + b, 0);
  let result = (Object.keys(scores) as EmotionLabel[]).map((k, i) => ({
    label: k,
    score: Math.max(0, Math.min(1, exps[i] / sumExps)),
  }));

  // confidence boost: push the top emotion up and renormalize
  if (opts?.confidenceBoost && opts.confidenceBoost > 0) {
    result.sort((a, b) => b.score - a.score);
    const boost = Math.min(0.9, Math.max(0, opts.confidenceBoost));
    result[0].score = Math.min(
      0.98,
      result[0].score + boost * (1 - result[0].score)
    );
    // renormalize
    const s = result.reduce((acc, r) => acc + r.score, 0);
    result = result.map((r) => ({
      ...r,
      score: Math.round((r.score / s) * 100) / 100,
    }));
  } else {
    result = result.map((r) => ({
      ...r,
      score: Math.round(r.score * 100) / 100,
    }));
  }

  // ensure ordering
  result.sort((a, b) => b.score - a.score);
  return result;
}
