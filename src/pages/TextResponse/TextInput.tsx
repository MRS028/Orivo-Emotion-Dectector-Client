/* eslint-disable @typescript-eslint/no-explicit-any */
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
// JWT Protected Axios
import "@/styles/progress-percent.css";

import axios from "axios";
import { useAuth } from "@/Hooks/useAuth";

interface TextResponseBoxProps {
  placeholder?: string;
  maxLength?: number;
  autoClear?: boolean;
  user?: any; // Or use a proper User type
}

// --- SKELETON LOADER ---
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
  placeholder = "Enter text to analyze...",
  maxLength = 500,
  autoClear = true,
}) => {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<Emotion[] | null>(null);
  const { user } = useAuth();
  // console.log(user);
  // console.log(user?.email);

  const handleAnalyze = async () => {
    const email = user?.email;
    if (!text.trim()) return;
    setIsLoading(true);
    setResults(null);

    // --- Simulate delay ---
    await new Promise((res) => setTimeout(res, 800 + Math.random() * 700));

    // --- Generate fake emotions ---
    const fakeEmotions = generateFakeEmotions(text.trim());
    setResults(fakeEmotions);
    const topEmotion = fakeEmotions[0];

    // --- Save emotion to database ---
    try {
      await axios.post(
        "https://orivo-emotion-detector-backend.vercel.app/api/emotions",
        {
          email,
          text: text.trim(),
          detectedEmotion: topEmotion.label,
        }
      );
      // console.log("✅ Emotion saved to server!");
      // console.log("email", email);
      // console.log("text", response.data);
    } catch (err) {
      console.error("❌ Failed to save emotion:", err);
    }

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
    <div className="w-full max-w-2xl mx-auto space-y-6 pt-5 pb-5">
      {/* INPUT CARD */}
      <Card className="shadow-xl border-primary/10 bg-gradient-to-br from-white to-primary/5 backdrop-blur-sm w-full max-w-4xl mx-auto">
        <CardHeader className="pb-6 px-8 pt-8">
          <CardTitle className="flex items-center gap-4 text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            <div className="p-3 bg-gradient-to-br from-primary to-primary/80 rounded-2xl text-white shadow-2xl">
              <Sparkles className="w-8 h-8" />
            </div>
            Advanced Emotion Analysis Tool
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground pt-3 leading-relaxed">
            Enter your text below for comprehensive emotional sentiment
            analysis. Our advanced AI detects subtle emotional patterns and
            provides detailed insights into your writing's emotional undertones.
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-8 px-8">
          <div className="relative">
            <Textarea
              placeholder={placeholder}
              value={text}
              onChange={(e) => setText(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={10}
              maxLength={maxLength}
              className="resize-none text-lg border-2 focus:border-primary/30 transition-all duration-200 rounded-2xl p-6 bg-white/60 backdrop-blur-sm shadow-inner focus-visible:ring-4 focus-visible:ring-primary/20 min-h-[150px] leading-relaxed"
            />
            {text.length > 0 && (
              <div className="absolute bottom-4 right-4">
                <div
                  className={clsx(
                    "text-sm font-semibold px-3 py-1.5 rounded-full transition-colors border backdrop-blur-sm",
                    text.length > maxLength * 0.9
                      ? "bg-destructive/10 text-destructive border-destructive/20"
                      : "bg-primary/10 text-primary border-primary/20"
                  )}
                >
                  {text.length}/{maxLength}
                </div>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 pt-6 border-t border-primary/10 px-8 pb-8">
          <div className="flex flex-col gap-3">
            <span className="text-base text-muted-foreground font-semibold">
              Keyboard Shortcuts
            </span>
            <div className="flex items-center gap-3">
              <kbd className="px-3 py-2 text-sm font-semibold text-gray-700 bg-gray-100/80 border border-gray-300 rounded-xl shadow-sm backdrop-blur-sm min-w-[60px] text-center">
                Ctrl
              </kbd>
              <span className="text-base text-muted-foreground font-medium">
                +
              </span>
              <kbd className="px-3 py-2 text-sm font-semibold text-gray-700 bg-gray-100/80 border border-gray-300 rounded-xl shadow-sm backdrop-blur-sm min-w-[70px] text-center">
                Enter
              </kbd>
              <span className="text-base text-muted-foreground ml-3">
                - Quick Analysis
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="flex-1 sm:flex-none">
              <Button
                onClick={handleAnalyze}
                disabled={
                  isLoading ||
                  text.trim().length === 0 ||
                  text.length > maxLength
                }
                className="w-full sm:w-44 h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-xl hover:shadow-2xl transition-all duration-200 transform hover:scale-105 disabled:transform-none disabled:opacity-50 text-base font-semibold"
                size="lg"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-3 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5 mr-3" />
                    Analyze Text
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>

      {/* RESULTS */}
      {isLoading && (
        <ResultsSkeleton topEmotion={topEmotion} results={results} />
      )}

      {results && !isLoading && topEmotion && (
        <Card className="mt-6 animate-fade-in shadow-md mx-2 lg:mx-0">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Analysis Results
            </CardTitle>
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
