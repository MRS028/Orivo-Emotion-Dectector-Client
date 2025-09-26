// src/components/TextResponseBox.tsx

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Send, Sparkles, Loader2 } from "lucide-react";
import clsx from "clsx";

import type { Emotion } from "@/lib/textResponseUtils";
import {
  generateFakeEmotions,
  emotionConfig as baseEmotionConfig,
  formatPercent,
  computeConfidenceGap,
} from "@/lib/textResponseUtils";
import "@/styles/progress-percent.css";

interface TextResponseBoxProps {
  placeholder?: string;
  maxLength?: number;
  onSubmit?: (text: string) => void | Promise<void>;
  autoClear?: boolean;
}

// --- SKELETON LOADER ---
// --- SKELETON LOADER COMPONENT ---
interface ResultsSkeletonProps {
  topEmotion: Emotion | null;
  results: Emotion[] | null;
}

const ResultsSkeleton: React.FC<ResultsSkeletonProps> = ({
  topEmotion,
  results,
}) => {
  const second = results?.[1];
  const gap = topEmotion ? topEmotion.score - (second?.score ?? 0) : 0;

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle className="text-lg">Analyzing...</CardTitle>
        <CardDescription>
          Please wait while we process the text.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 animate-pulse">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-between">
              <div className="h-4 bg-muted rounded w-1/4"></div>
              <div className="h-4 bg-muted rounded w-1/6"></div>
            </div>
            <div className="text-sm mt-2">
              {topEmotion && (
                <>
                  <span>
                    {topEmotion.label} ({Math.round(topEmotion.score * 100)}%)
                  </span>
                  {topEmotion.score >= 0.6 && (
                    <span className="ml-2 text-green-600">Confident</span>
                  )}
                  {gap < 0.1 && second && (
                    <div className="mt-1 text-xs text-muted-foreground">
                      Close call — could also be{" "}
                      <strong>
                        {second.label} ({Math.round(second.score * 100)}%)
                      </strong>
                    </div>
                  )}
                </>
              )}
            </div>
            <div className="h-3 w-full bg-muted rounded-full"></div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

// --- MAIN COMPONENT ---
const TextResponseBox: React.FC<TextResponseBoxProps> = ({
  placeholder = "Enter text to analyze... (e.g., 'I had a wonderful day!')",
  maxLength = 500,
  onSubmit,
  autoClear = true,
}) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Emotion[] | null>(null);

  const handleAnalyze = async () => {
    if (text.trim().length === 0) return;
    setIsLoading(true);
    setResults(null);

    // Simulate network delay
    await new Promise((res) => setTimeout(res, 800 + Math.random() * 700));

    if (onSubmit) {
      void onSubmit(text.trim());
    }

    const fakeEmotions = generateFakeEmotions(text.trim());
    setResults(fakeEmotions);
    setIsLoading(false);

    if (autoClear) setText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      handleAnalyze();
    }
  };

  const topEmotion = React.useMemo(
    () => (results && results.length ? results[0] : null),
    [results]
  );

  const secondEmotion = results?.[1];
  const confidenceGap = computeConfidenceGap(results);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 pt-5">
      {/* INPUT CARD */}
      <Card className="shadow-lg border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-2xl">
            <span className="p-2 bg-primary/10 rounded-lg text-primary">
              <Sparkles className="w-6 h-6" />
            </span>
            Text Emotion Analyzer
          </CardTitle>
          <CardDescription>
            Type something below and we'll guess the emotion behind the text.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder={placeholder}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={5}
            maxLength={maxLength}
            className="resize-none text-base focus-visible:ring-2 focus-visible:ring-primary/50"
          />
        </CardContent>
        <CardFooter className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">
            Tip: Press{" "}
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md">
              Ctrl
            </kbd>{" "}
            +{" "}
            <kbd className="px-2 py-1 text-xs font-semibold text-gray-800 bg-gray-100 border border-gray-200 rounded-md">
              Enter
            </kbd>{" "}
            to submit.
          </span>
          <div className="flex items-center gap-4">
            <span
              className={clsx(
                "text-sm",
                text.length > maxLength * 0.9
                  ? "text-destructive font-medium"
                  : "text-muted-foreground"
              )}
            >
              {text.length}/{maxLength}
            </span>
            <Button
              onClick={handleAnalyze}
              disabled={isLoading || text.trim().length === 0}
              className="w-32"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Analyze
                </>
              )}
            </Button>
          </div>
        </CardFooter>
      </Card>

      {/* RESULTS */}
      {isLoading && (
        <ResultsSkeleton topEmotion={topEmotion} results={results} />
      )}

      {results && !isLoading && topEmotion && (
        <Card className="mt-6 animate-fade-in shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Analysis Results</CardTitle>
            <div className="flex items-baseline gap-2 pt-2">
              <p className="text-muted-foreground">Top Emotion:</p>
              <div
                className={clsx(
                  "flex items-center gap-2 font-bold text-2xl",
                  baseEmotionConfig[topEmotion.label].color
                )}
              >
                {React.createElement(baseEmotionConfig[topEmotion.label].icon, {
                  className: "w-7 h-7",
                })}
                {topEmotion.label}
              </div>
              <span className="text-lg font-semibold text-muted-foreground">
                ({Math.round(topEmotion.score * 100)}%)
              </span>
            </div>

            {/* Close call check */}
            {confidenceGap !== null && confidenceGap < 0.1 && secondEmotion && (
              <div className="mt-2 text-sm text-muted-foreground">
                Close call — could also be{" "}
                <strong>
                  {secondEmotion.label} ({Math.round(secondEmotion.score * 100)}
                  %)
                </strong>
              </div>
            )}
          </CardHeader>

          <CardContent className="space-y-4">
            {results.map((result) => {
              const config = baseEmotionConfig[result.label];
              const Icon = config.icon as React.ElementType;
              return (
                <div key={result.label}>
                  <div className="flex justify-between items-center mb-1 text-sm font-medium">
                    <div className="flex items-center gap-2">
                      <Icon className={clsx("w-4 h-4", config.color)} />
                      <span>{result.label}</span>
                    </div>
                    <span className="text-muted-foreground">
                      {formatPercent(result.score)}
                    </span>
                  </div>
                  <div className="w-full bg-white border border-neutral-200 rounded-full h-2.5 overflow-hidden">
                    <div
                      className={clsx(
                        "h-2.5 transition-all duration-500 ease-out",
                        config.progressBar,
                        Math.round(result.score * 100) === 100
                          ? "rounded-full"
                          : "rounded-l-full",
                        `p-w-${Math.round(result.score * 100)}`
                      )}
                    />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default TextResponseBox;
