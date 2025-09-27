/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Calendar, Filter, Trash2, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { emotionConfig } from "@/lib/textResponseUtils";
import { useAuth } from "@/Hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import { emotionConfig } from "@/lib/textResponseUtils";
import useScrollUp from "@/Hooks/useScrollUp";

interface EmotionHistory {
  _id: string;
  text: string;
  detectedEmotion: string;
  createdAt: string;
  confidence?: number;
  email: string;
}

const History: React.FC = () => {
  const { user } = useAuth();
  const [emotions, setEmotions] = useState<EmotionHistory[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"newest" | "oldest">("newest");
  useScrollUp();

  const showErrorAlert = (error: any) => {
    console.error("API Error:", error);
    Swal.fire({
      title: "Error!",
      text: error.response?.data?.message || "Something went wrong!",
      icon: "error",
      confirmButtonText: "OK",
    });
  };

  const showSuccessAlert = (title: string, text?: string) => {
    Swal.fire({
      title,
      text,
      icon: "success",
      confirmButtonText: "OK",
    });
  };

  const fetchEmotions = async () => {
    if (!user?.email) return;

    try {
      const response = await axios.get(
        `https://orivo-emotion-detector-backend.vercel.app/api/emotions`,
        {
          params: { email: user.email },
        }
      );
      setEmotions(response.data);
    } catch (error) {
      showErrorAlert(error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchEmotions();
  }, [user?.email]);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchEmotions();
  };

  const handleDelete = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this emotion record!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!result.isConfirmed) return;

    setDeletingId(id);
    try {
      await axios.delete(
        `https://orivo-emotion-detector-backend.vercel.app/api/emotions/${id}`
      );
      setEmotions(emotions.filter((emotion) => emotion._id !== id));
      showSuccessAlert("Deleted!", "The emotion record has been deleted.");
    } catch (error) {
      showErrorAlert(error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleClearAll = async () => {
    if (!user?.email) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete ALL your emotion history. This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete all!",
      cancelButtonText: "Cancel",
      background: "#1f2937",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      await axios.delete(
        `https://orivo-emotion-detector-backend.vercel.app/api/emotions`,
        {
          params: { email: user.email },
        }
      );
      setEmotions([]);
      showSuccessAlert("Cleared!", "All emotion history has been deleted.");
    } catch (error) {
      showErrorAlert(error);
    }
  };

  const filteredAndSortedEmotions = emotions
    .filter(
      (emotion) =>
        filter === "all" ||
        emotion.detectedEmotion.toLowerCase() === filter.toLowerCase()
    )
    .sort((a, b) => {
      if (sortBy === "newest") {
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      } else {
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      }
    });

  const emotionStats = emotions.reduce((stats, emotion) => {
    stats[emotion.detectedEmotion] = (stats[emotion.detectedEmotion] || 0) + 1;
    return stats;
  }, {} as Record<string, number>);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-64">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 pt-10 pb-5">
      {/* Header Stats */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="w-6 h-6" />
                Emotion History
              </CardTitle>
              <CardDescription>
                {emotions.length} analyzed text
                {emotions.length !== 1 ? "s" : ""} in total
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleRefresh}
                disabled={refreshing}
              >
                <RefreshCw
                  className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </Button>
              {emotions.length > 0 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={handleClearAll}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        {emotions.length > 0 && (
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {Object.entries(emotionStats).map(([emotion, count]) => {
                // @ts-ignore
                const config = emotionConfig[emotion] || emotionConfig.Happy;
                return (
                  <Badge
                    key={emotion}
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <config.icon className="w-3 h-3" />
                    {emotion}: {count}
                  </Badge>
                );
              })}
            </div>
          </CardContent>
        )}
      </Card>

      {/* Filters */}
      {emotions.length > 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter by emotion:</span>
                <Select value={filter} onValueChange={setFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Emotions</SelectItem>
                    {Object.keys(emotionConfig).map((emotion) => (
                      <SelectItem key={emotion} value={emotion.toLowerCase()}>
                        <div className="flex items-center gap-2">
                          {/* @ts-ignore */}
                          {React.createElement(emotionConfig[emotion].icon, {
                            className: "w-3 h-3",
                          })}
                          {emotion}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Sort by:</span>
                <Select
                  value={sortBy}
                  onValueChange={(value: "newest" | "oldest") =>
                    setSortBy(value)
                  }
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="newest">Newest First</SelectItem>
                    <SelectItem value="oldest">Oldest First</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Emotion List */}
      {filteredAndSortedEmotions.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">
              No emotion history found
            </h3>
            <p className="text-muted-foreground">
              {emotions.length === 0
                ? "Start analyzing text to see your emotion history here!"
                : "No emotions match your current filter."}
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredAndSortedEmotions.map((emotion) => {
            const config =
              // @ts-expect-error
              emotionConfig[emotion?.detectedEmotion] || emotionConfig.Happy;
            return (
              <Card
                key={emotion._id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="pt-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge
                          className="flex items-center gap-1"
                          style={{
                            backgroundColor: config.color.replace(
                              "text-",
                              "bg-"
                            ),
                            color: "white",
                          }}
                        >
                          <config.icon className="w-3 h-3" />
                          {emotion.detectedEmotion}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatDate(emotion.createdAt)}
                        </span>
                      </div>
                      <p className="text-lg">{emotion.text}</p>
                      {emotion.confidence && (
                        <div className="flex items-center gap-2 mt-2">
                          <div className="w-full bg-secondary rounded-full h-2">
                            <div
                              className="h-2 rounded-full bg-primary"
                              style={{ width: `${emotion.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {Math.round(emotion.confidence * 100)}% confidence
                          </span>
                        </div>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(emotion._id)}
                      disabled={deletingId === emotion._id}
                      className="ml-4"
                    >
                      {deletingId === emotion._id ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Trash2 className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;
