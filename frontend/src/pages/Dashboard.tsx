// src/pages/Dashboard.tsx
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { getAllReadings, deleteReading } from "@/api/api";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Heart, Activity, Zap, Plus, Moon, Dumbbell, Trash2 } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";

// Types
interface Reading {
  _id: string;
  time: string;
  heartRate: number;
  bloodPressure: string; // "120/80"
  stressLevel: "Low" | "Moderate" | "High";
  sleepHours: number;
  exerciseMinutes: number;
}

const Dashboard = () => {
  const { isLoaded, user } = useUser();
  const [readings, setReadings] = useState<Reading[]>([]);
  const [healthTip, setHealthTip] = useState("Analyzing your data...");
  const [averages, setAverages] = useState({
    heartRate: 0,
    systolic: 0,
    diastolic: 0,
    stressLevel: "Normal",
    sleep: 0,
    exercise: 0,
  });

  // Fetch readings for logged-in user
  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchReadings = async () => {
      try {
        const res = await getAllReadings(user.id);
        const data: Reading[] = res.data || [];
        setReadings(data);

        if (data.length === 0) {
          setAverages({
            heartRate: 0,
            systolic: 0,
            diastolic: 0,
            stressLevel: "Normal",
            sleep: 0,
            exercise: 0,
          });
          setHealthTip("No readings yet — add your first reading to see personalized tips.");
          return;
        }

        // Helper avg with safety
        const avg = (arr: number[]) =>
          Math.round((arr.reduce((a, b) => a + b, 0) || 0) / (arr.length || 1));

        const heartRates = data.map((r) => Number(r.heartRate || 0));
        const systolics = data.map((r) => parseInt(r.bloodPressure.split("/")[0] || "0"));
        const diastolics = data.map((r) => parseInt(r.bloodPressure.split("/")[1] || "0"));
        const sleeps = data.map((r) => Number(r.sleepHours || 0));
        const exercises = data.map((r) => Number(r.exerciseMinutes || 0));

        // Stress majority logic
        const stressCount = { Low: 0, Moderate: 0, High: 0 } as any;
        data.forEach((r) => {
          if (r.stressLevel in stressCount) stressCount[r.stressLevel] += 1;
        });
      let stressLevel: "Low" | "Moderate" | "High" = "Low";

if (stressCount.High >= stressCount.Moderate && stressCount.High >= stressCount.Low && stressCount.High > 0) {
  stressLevel = "High";
} else if (stressCount.Moderate >= stressCount.Low && stressCount.Moderate > 0) {
  stressLevel = "Moderate";
} else {
  stressLevel = "Low";
}


        const computed = {
          heartRate: avg(heartRates),
          systolic: avg(systolics),
          diastolic: avg(diastolics),
          sleep: avg(sleeps),
          exercise: avg(exercises),
          stressLevel,
        };

        setAverages(computed);

        // Create health tip
        setHealthTip(
          generateHealthTip({
            heartRate: computed.heartRate,
            bp: `${computed.systolic}/${computed.diastolic}`,
            stressLevel: computed.stressLevel,
            exercise: computed.exercise,
          })
        );
      } catch (err) {
        console.error("❌ Failed to load readings", err);
        setHealthTip("Failed to load readings from server.");
      }
    };

    fetchReadings();
  }, [isLoaded, user]);

  // Delete reading (sends userId inside delete call)
  const handleDelete = async (id: string) => {
    if (!user) return;
    if (!confirm("Are you sure you want to delete this reading?")) return;

    try {
      await deleteReading(id, user.id);
      setReadings((prev) => prev.filter((r) => r._id !== id));
      toast.success("Reading deleted");
    } catch (err) {
      console.error("DELETE ERROR =", err);
      toast.error("Failed to delete reading");
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white shadow-glow">
          <h1 className="text-4xl font-bold mb-2">Welcome back! 👋</h1>
          <p className="text-white/90 text-lg">Your personalized heart health overview</p>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Link to="/analyze" className="flex-1 min-w-[200px]">
             <Button className="w-full py-6 border-2 border-primary" variant="outline">
              <Plus className="mr-2" /> Analyze Now
            </Button>
          </Link>

          <Link to="/add-reading" className="flex-1 min-w-[200px]">
            <Button className="w-full py-6 border-2 border-primary" variant="outline">
              <Plus className="mr-2" /> Add New Reading
            </Button>
          </Link>
        </div>

        {/* Average Metrics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
          <MetricCard icon={<Heart />} title="Avg Heart Rate" value={`${averages.heartRate} BPM`} />
          <MetricCard icon={<Activity />} title="Avg Blood Pressure" value={`${averages.systolic}/${averages.diastolic}`} />
          <MetricCard icon={<Zap />} title="Stress Level" value={averages.stressLevel} />
          <MetricCard icon={<Moon />} title="Avg Sleep" value={`${averages.sleep} hrs`} />
          <MetricCard icon={<Dumbbell />} title="Avg Exercise" value={`${averages.exercise} min`} />
        </div>

        {/* Recent Readings */}
        <Card className="shadow-card border border-primary/10">
          <CardHeader>
            <CardTitle>Recent Readings📊</CardTitle>
            <CardDescription>Your last {readings.length} health entries</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {readings.map((r, i) => (
                <div
                  key={r._id}
                  className="rounded-2xl p-5 bg-gradient-to-br from-background to-primary/5 border border-primary/10"
                >
                  <p className="text-sm text-muted-foreground mb-2">{r.time}</p>

                  <div className="grid grid-cols-2 gap-3">
                    <ReadingStat label="Heart Rate" value={`${r.heartRate} BPM`} icon="🫀" />
                    <ReadingStat label="Blood Pressure" value={r.bloodPressure} icon="🩺" />
                    <ReadingStat label="Sleep" value={`${r.sleepHours} hrs`} icon="🌙" />
                    <ReadingStat label="Exercise" value={`${r.exerciseMinutes} min`} icon="🏃" />
                  </div>

                  <div className="mt-3 text-sm font-medium flex items-center justify-between">
                    <span
                      className={`${
                        r.stressLevel === "High" ? "text-red-600" : r.stressLevel === "Moderate" ? "text-yellow-600" : "text-green-600"
                      }`}
                    >
                      {r.stressLevel} Stress
                    </span>

                    <Button onClick={() => handleDelete(r._id)} className="text-sm" variant="destructive">
                      <Trash2 className="w-4 h-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              ))}

              {readings.length === 0 && (
                <div className="col-span-full text-center p-6 text-muted-foreground">
                  No readings yet — click "Add New Reading" to create one.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* AI Health Tip */}
        <Card className="shadow-card border-l-4 border-l-primary">
          <CardHeader>
            <CardTitle>Health Tip of the Day💡</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground whitespace-pre-wrap leading-relaxed tracking-wide">
              {healthTip}
            </p>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

/* ---------- SMALL COMPONENTS ---------- */
const MetricCard = ({ icon, title, value }: { icon: any; title: string; value: string }) => (
  <Card className="shadow-card hover:shadow-glow transition-smooth">
    <div className="p-4 text-primary">{icon}</div>
    <CardContent className="pt-2">
      <h3 className="text-sm font-medium text-muted-foreground mb-1">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </CardContent>
  </Card>
);

const ReadingStat = ({ label, value, icon }: { label: string; value: string; icon?: string }) => (
  <div className="bg-white/60 rounded-xl p-3 text-center shadow-sm">
    <div className="text-lg mb-1">{icon}</div>
    <p className="text-sm font-medium text-muted-foreground">{label}</p>
    <p className="font-bold">{value}</p>
  </div>
);

/* ---------- HEALTH TIP GENERATOR ---------- */
const generateHealthTip = ({
  heartRate,
  bp,
  stressLevel,
  exercise,
}: {
  heartRate: number;
  bp: string;
  stressLevel: string;
  exercise: number;
}) => {
  let tip = "Based on your recent trends:\n\n";

  // ---- HEART RATE ----
  if (heartRate > 90) {
    tip += "• Your average heart rate is high — this may be due to stress, poor sleep, or low physical activity.\n";
  } else if (heartRate > 80) {
    tip += "• Your average heart rate is slightly elevated — consider relaxation and proper rest.\n";
  } else if (heartRate < 60) {
    tip += "• Your heart rate is on the lower side — this can be normal if you are physically active.\n";
  } else {
    tip += "• Your average heart rate is within a healthy range — good cardiovascular balance!\n";
  }

  // ---- BLOOD PRESSURE ----
  const [sys, dia] = bp.split("/").map(Number);

  if (sys >= 130 || dia >= 80) {
    tip += "• Your average blood pressure is high — reduce salt intake, manage stress, and stay active.\n";
  } else if (sys >= 120) {
    tip += "• Your blood pressure is slightly elevated — lifestyle improvements can help bring it down.\n";
  } else {
    tip += "• Your blood pressure is within a healthy range — keep maintaining these habits.\n";
  }

  // ---- STRESS ----
  if (stressLevel === "High") {
    tip += "• Stress levels are high — consider meditation, breathing exercises, or a short walk.\n";
  } else if (stressLevel === "Moderate") {
    tip += "• Stress is moderate — take short breaks and avoid long continuous work sessions.\n";
  } else {
    tip += "• Stress levels are low — great mental balance!\n";
  }

  // ---- EXERCISE ----
  if (exercise < 30) {
    tip += "• Try to reach at least 30 minutes of daily physical activity for heart health.\n";
  } else {
    tip += "• Your exercise routine looks good — consistency is key!\n";
  }

  tip += "\nRemember: these are lifestyle-based insights, not medical diagnoses. ❤️";

  return tip;
};


export default Dashboard;

