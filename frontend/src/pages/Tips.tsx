import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Lightbulb, Sparkles, Activity } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { useEffect, useState } from "react";
import { getAITips } from "@/api/api";

const Tips = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    const loadAI = async () => {
      try {
        const res = await getAITips();
        setData(res.data);
      } catch (err) {
        console.error("AI FETCH ERROR:", err);
      }
      setLoading(false);
    };

    loadAI();
  }, []);

  // Prevents crashes
  if (loading || !data || !data.quote) {
    return (
      <DashboardLayout>
        <p className="p-10 text-center text-xl">Generating smart tips with AI… 💡</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white shadow-glow">
          <h1 className="text-4xl font-bold mb-2">Smart AI Tips 💡</h1>
          <p className="text-white/90 text-lg">
            Fresh AI-powered insights every time
          </p>
        </div>

        {/* Quote */}
        <Card className="shadow-card border-l-4 border-l-accent">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="w-6 h-6 text-accent" />
              Quote of the Moment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <blockquote className="text-xl font-medium italic mb-2">
              “{data.quote.text}”
            </blockquote>
            <p className="text-muted-foreground">
              — attributed to a respected source
            </p>
          </CardContent>
        </Card>

        {/* AI Tips */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Heart className="w-6 h-6 text-primary" />
            AI Heart Health Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {data.tips.map((t: any, i: number) => (
              <TipCard
                key={i}
                icon={t.emoji}
                title={t.title}
                description={t.description}
                category="AI Tip"
              />
            ))}
          </div>
        </div>

        {/* AI Habits */}
        <div>
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <Activity className="w-6 h-6 text-primary" />
            Healthy Habits From AI
          </h2>
          <div className="space-y-4">
            {data.habits.map((h: any, i: number) => (
              <HabitCard
                key={i}
                time={h.time}
                habit={h.habit}
                icon={h.emoji}
              />
            ))}
          </div>
        </div>

        {/* Facts */}
        <Card className="shadow-card bg-gradient-to-br from-primary/5 to-accent/5">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="w-6 h-6 text-primary" />
              Fun Facts from AI 🤖
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {data.facts.map((f: string, i: number) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary">•</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

// Components
const TipCard = ({ icon, title, description, category }: any) => (
  <Card className="shadow-card hover:shadow-glow transition-smooth">
    <CardHeader>
      <div className="flex items-start gap-3">
        <div className="text-4xl">{icon}</div>
        <div>
          <CardTitle className="text-lg">{title}</CardTitle>
          <Badge variant="secondary" className="mt-1">
            {category}
          </Badge>
        </div>
      </div>
    </CardHeader>
    <CardContent>
      <CardDescription className="text-base">{description}</CardDescription>
    </CardContent>
  </Card>
);

const HabitCard = ({ time, habit, icon }: any) => (
  <Card className="shadow-card">
    <CardContent className="flex items-center gap-4 p-4">
      <div className="text-3xl">{icon}</div>
      <div className="flex-1">
        <p className="font-semibold">{time}</p>
        <p className="text-muted-foreground">{habit}</p>
      </div>
    </CardContent>
  </Card>
);

export default Tips;
