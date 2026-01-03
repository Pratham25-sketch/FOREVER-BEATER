import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Sparkles, Moon, Smile, Utensils, Cigarette, Dumbbell } from "lucide-react";
import { toast } from "sonner";

const Analyze = () => {
  const [formData, setFormData] = useState({
    foodToday: "",
    smokedDrank: "no",
    exerciseMinutes: "",
    sleepHours: "",
    mood: "",
  });

  const [analysis, setAnalysis] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.foodToday || !formData.exerciseMinutes || !formData.sleepHours || !formData.mood) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsAnalyzing(true);

    // Simulate AI analysis
    setTimeout(() => {
      const exerciseMin = parseInt(formData.exerciseMinutes);
      const sleepHrs = parseFloat(formData.sleepHours);
      const hasUnhealthyHabits = formData.smokedDrank !== "no";

      let predictedHeartRate = 72;
      if (exerciseMin > 30) predictedHeartRate -= 5;
      if (exerciseMin < 15) predictedHeartRate += 8;
      if (sleepHrs < 7) predictedHeartRate += 6;
      if (hasUnhealthyHabits) predictedHeartRate += 10;
      if (formData.mood === "stressed") predictedHeartRate += 8;
      if (formData.mood === "calm" || formData.mood === "happy") predictedHeartRate -= 3;

      let systolic = 120;
      let diastolic = 80;
      if (exerciseMin < 20) { systolic += 5; diastolic += 3; }
      if (hasUnhealthyHabits) { systolic += 8; diastolic += 5; }
      if (sleepHrs < 7) { systolic += 6; diastolic += 4; }
      if (formData.mood === "stressed") { systolic += 10; diastolic += 5; }

      const heartRateStatus = predictedHeartRate > 80 ? "slightly elevated" : predictedHeartRate < 60 ? "lower than average" : "optimal";
      const bpStatus = systolic > 125 ? "slightly elevated" : "healthy";

      const mockAnalysis = `Based on your lifestyle data today, here's your comprehensive health analysis:

**Predicted Vital Signs:**
🫀 Heart Rate: ${predictedHeartRate} BPM (${heartRateStatus})
🩺 Blood Pressure: ${systolic}/${diastolic} mmHg (${bpStatus})

**Key Insights:**
${predictedHeartRate > 80 ? "⚠️ Your heart rate is elevated. Consider stress management and adequate rest." : "✅ Your heart rate is in a healthy range."}
${systolic > 125 ? "⚠️ Blood pressure is slightly high. Monitor sodium intake and stress levels." : "✅ Blood pressure is healthy."}

**Lifestyle Factors:**
🍽️ Nutrition: ${formData.foodToday.toLowerCase().includes("vegetable") || formData.foodToday.toLowerCase().includes("fruit") ? "Good food choices detected!" : "Consider adding more whole foods."}
💪 Exercise: ${exerciseMin >= 30 ? "Excellent! You've met the daily activity goal." : exerciseMin > 0 ? "Good start, aim for 30 minutes daily." : "Try to add some physical activity."}
😴 Sleep: ${sleepHrs >= 8 ? "Perfect rest!" : sleepHrs >= 7 ? "Good, but try to get 8-9 hours." : "⚠️ Insufficient sleep detected."}
${hasUnhealthyHabits ? "⚠️ Smoking/drinking detected - significantly impacts cardiovascular health." : "✅ No smoking/drinking - great for your heart!"}

**Personalized Recommendations:**
${sleepHrs < 7 ? "🌙 Prioritize 8+ hours of sleep tonight\n" : ""}${exerciseMin < 30 ? "🏃 Add 30 minutes of cardio exercise\n" : ""}${hasUnhealthyHabits ? "🚭 Avoid smoking/drinking tomorrow\n" : ""}💧 Drink 8-10 glasses of water
🥗 Focus on lean proteins and vegetables
🧘 Practice 10 minutes of meditation
${formData.mood === "stressed" ? "💆 Take breaks and manage stress\n" : ""}
Keep up the great work! Your heart will thank you. ❤️`;

      setAnalysis(mockAnalysis);
      setIsAnalyzing(false);
      toast.success("Analysis complete! 🎉");
    }, 2000);
  };

  return (
    <div
      className="min-h-screen text-white"
      style={{ backgroundColor: "#984e5aff" }}
    >
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="space-y-8">
          <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-primary-foreground shadow-lg">
            <h1 className="text-4xl font-bold mb-2">AI Health Analysis 🤖</h1>
            <p className="text-primary-foreground/90 text-lg">Get personalized insights powered by AI</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Input Form */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-6 h-6 text-primary" />
                  Enter Your Lifestyle Data
                </CardTitle>
                <CardDescription>
                  Tell us about your day and we'll predict your health metrics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="foodToday" className="flex items-center gap-2">
                      <Utensils className="w-4 h-4 text-primary" />
                      Food You Had Today
                    </Label>
                    <Textarea
                      id="foodToday"
                      placeholder="e.g., Oatmeal for breakfast, grilled chicken salad for lunch, pasta for dinner..."
                      value={formData.foodToday}
                      onChange={(e) => setFormData({ ...formData, foodToday: e.target.value })}
                      className="mt-1 min-h-[80px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="smokedDrank" className="flex items-center gap-2">
                      <Cigarette className="w-4 h-4 text-primary" />
                      Did You Smoke or Drink Today?
                    </Label>
                    <Select value={formData.smokedDrank} onValueChange={(value) => setFormData({ ...formData, smokedDrank: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="Select..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="no">No, neither</SelectItem>
                        <SelectItem value="smoked">Smoked only</SelectItem>
                        <SelectItem value="drank">Drank only</SelectItem>
                        <SelectItem value="both">Both</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="exerciseMinutes" className="flex items-center gap-2">
                      <Dumbbell className="w-4 h-4 text-primary" />
                      Exercise Minutes Today
                    </Label>
                    <Input
                      id="exerciseMinutes"
                      type="number"
                      placeholder="30"
                      min="0"
                      value={formData.exerciseMinutes}
                      onChange={(e) => setFormData({ ...formData, exerciseMinutes: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sleepHours" className="flex items-center gap-2">
                      <Moon className="w-4 h-4 text-primary" />
                      Sleep Hours (last night)
                    </Label>
                    <Input
                      id="sleepHours"
                      type="number"
                      placeholder="8"
                      min="0"
                      max="24"
                      step="0.5"
                      value={formData.sleepHours}
                      onChange={(e) => setFormData({ ...formData, sleepHours: e.target.value })}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="mood" className="flex items-center gap-2">
                      <Smile className="w-4 h-4 text-primary" />
                      Current Mood
                    </Label>
                    <Select value={formData.mood} onValueChange={(value) => setFormData({ ...formData, mood: value })}>
                      <SelectTrigger className="mt-1">
                        <SelectValue placeholder="How are you feeling?" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="happy">Happy </SelectItem>
                        <SelectItem value="calm">Calm </SelectItem>
                        <SelectItem value="stressed">Stressed </SelectItem>
                        <SelectItem value="tired">Tired </SelectItem>
                        <SelectItem value="energetic">Energetic </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    type="submit"
                    disabled={isAnalyzing}
                    className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-semibold py-6 hover:opacity-90 transition-all"
                  >
                    {isAnalyzing ? (
                      <>
                        <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                        Analyzing...
                      </>
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Analyze Now
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Analysis Results */}
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle>AI Health Prediction 💡</CardTitle>
                <CardDescription>
                  Predicted vital signs and personalized recommendations
                </CardDescription>
              </CardHeader>
              <CardContent>
                {analysis ? (
                  <div className="space-y-6 animate-in fade-in duration-500">
                    {/* Quick Metrics Overview */}
                    <div className="grid grid-cols-2 gap-4">
                      {/* Heart Rate Card */}
                      <div className="bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-950/30 dark:to-rose-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl p-4 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-xl">
                            🫀
                          </div>
                          <span className="text-xs font-semibold px-2 py-1 bg-red-500/20 text-red-700 dark:text-red-300 rounded-full">
                            {parseInt(formData.exerciseMinutes) > 30 || parseFloat(formData.sleepHours) >= 7 ? "Good" : "Monitor"}
                          </span>
                        </div>
                        <h3 className="font-semibold text-red-900 dark:text-red-100 mb-1">Heart Rate</h3>
                        <p className="text-3xl font-bold text-red-700 dark:text-red-300">
                          {(() => {
                            let hr = 72;
                            if (parseInt(formData.exerciseMinutes) > 30) hr -= 5;
                            if (parseInt(formData.exerciseMinutes) < 15) hr += 8;
                            if (parseFloat(formData.sleepHours) < 7) hr += 6;
                            if (formData.smokedDrank !== "no") hr += 10;
                            if (formData.mood === "stressed") hr += 8;
                            if (formData.mood === "calm" || formData.mood === "happy") hr -= 3;
                            return hr;
                          })()}
                        </p>
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">BPM (predicted)</p>
                      </div>

                      {/* Blood Pressure Card */}
                      <div className="bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-950/30 dark:to-cyan-900/20 border-2 border-blue-200 dark:border-blue-800 rounded-xl p-4 hover:shadow-lg transition-all">
                        <div className="flex items-start justify-between mb-2">
                          <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-xl">
                            🩺
                          </div>
                          <span className="text-xs font-semibold px-2 py-1 bg-blue-500/20 text-blue-700 dark:text-blue-300 rounded-full">
                            {formData.smokedDrank === "no" && parseFloat(formData.sleepHours) >= 7 ? "Healthy" : "Watch"}
                          </span>
                        </div>
                        <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-1">Blood Pressure</h3>
                        <p className="text-2xl font-bold text-blue-700 dark:text-blue-300">
                          {(() => {
                            let sys = 120, dia = 80;
                            if (parseInt(formData.exerciseMinutes) < 20) { sys += 5; dia += 3; }
                            if (formData.smokedDrank !== "no") { sys += 8; dia += 5; }
                            if (parseFloat(formData.sleepHours) < 7) { sys += 6; dia += 4; }
                            if (formData.mood === "stressed") { sys += 10; dia += 5; }
                            return `${sys}/${dia}`;
                          })()}
                        </p>
                        <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">mmHg (predicted)</p>
                      </div>
                    </div>

                    {/* Lifestyle Factors */}
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs">
                          📊
                        </div>
                        Lifestyle Impact
                      </h3>

                      <div className="grid gap-3">
                        {/* Sleep */}
                        <div className="flex items-center gap-3 p-3 bg-indigo-50 dark:bg-indigo-950/20 border border-indigo-200 dark:border-indigo-800 rounded-lg">
                          <Moon className="w-5 h-5 text-indigo-600" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">Sleep Quality</p>
                            <p className="text-xs text-muted-foreground">{formData.sleepHours} hours</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${parseFloat(formData.sleepHours) >= 8 ? "bg-green-500/20 text-green-700" :
                              parseFloat(formData.sleepHours) >= 7 ? "bg-yellow-500/20 text-yellow-700" :
                                "bg-red-500/20 text-red-700"
                            }`}>
                            {parseFloat(formData.sleepHours) >= 8 ? "Excellent" :
                              parseFloat(formData.sleepHours) >= 7 ? "Good" : "Poor"}
                          </div>
                        </div>

                        {/* Exercise */}
                        <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                          <Dumbbell className="w-5 h-5 text-green-600" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">Physical Activity</p>
                            <p className="text-xs text-muted-foreground">{formData.exerciseMinutes} minutes</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${parseInt(formData.exerciseMinutes) >= 30 ? "bg-green-500/20 text-green-700" :
                              parseInt(formData.exerciseMinutes) > 0 ? "bg-yellow-500/20 text-yellow-700" :
                                "bg-red-500/20 text-red-700"
                            }`}>
                            {parseInt(formData.exerciseMinutes) >= 30 ? "Active" :
                              parseInt(formData.exerciseMinutes) > 0 ? "Moderate" : "Inactive"}
                          </div>
                        </div>

                        {/* Habits */}
                        <div className="flex items-center gap-3 p-3 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg">
                          <Cigarette className="w-5 h-5 text-purple-600" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">Daily Habits</p>
                            <p className="text-xs text-muted-foreground">
                              {formData.smokedDrank === "no" ? "No smoking/drinking" :
                                formData.smokedDrank === "smoked" ? "Smoked today" :
                                  formData.smokedDrank === "drank" ? "Drank alcohol" : "Both"}
                            </p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${formData.smokedDrank === "no" ? "bg-green-500/20 text-green-700" : "bg-red-500/20 text-red-700"
                            }`}>
                            {formData.smokedDrank === "no" ? "Healthy" : "Risky"}
                          </div>
                        </div>

                        {/* Mood */}
                        <div className="flex items-center gap-3 p-3 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
                          <Smile className="w-5 h-5 text-amber-600" />
                          <div className="flex-1">
                            <p className="font-medium text-sm">Mental Wellness</p>
                            <p className="text-xs text-muted-foreground capitalize">{formData.mood}</p>
                          </div>
                          <div className={`px-3 py-1 rounded-full text-xs font-semibold ${formData.mood === "happy" || formData.mood === "calm" || formData.mood === "energetic"
                              ? "bg-green-500/20 text-green-700"
                              : "bg-yellow-500/20 text-yellow-700"
                            }`}>
                            {formData.mood === "happy" || formData.mood === "calm" || formData.mood === "energetic"
                              ? "Positive" : "Monitor"}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* AI Recommendations */}
                    <div className="bg-gradient-to-br from-primary/10 to-accent/10 border-2 border-primary/30 rounded-xl p-5">
                      <h3 className="font-semibold text-lg flex items-center gap-2 mb-4">
                        <Sparkles className="w-5 h-5 text-primary" />
                        AI Recommendations
                      </h3>
                      <div className="space-y-3 text-sm">
                        {parseFloat(formData.sleepHours) < 7 && (
                          <div className="flex gap-3 p-3 bg-background/50 rounded-lg border">
                            <span className="text-xl">🌙</span>
                            <div>
                              <p className="font-medium">Prioritize Sleep</p>
                              <p className="text-xs text-muted-foreground">Aim for 8+ hours tonight for optimal recovery</p>
                            </div>
                          </div>
                        )}
                        {parseInt(formData.exerciseMinutes) < 30 && (
                          <div className="flex gap-3 p-3 bg-background/50 rounded-lg border">
                            <span className="text-xl">🏃</span>
                            <div>
                              <p className="font-medium">Increase Activity</p>
                              <p className="text-xs text-muted-foreground">Try to reach 30 minutes of exercise daily</p>
                            </div>
                          </div>
                        )}
                        {formData.smokedDrank !== "no" && (
                          <div className="flex gap-3 p-3 bg-background/50 rounded-lg border">
                            <span className="text-xl">🚭</span>
                            <div>
                              <p className="font-medium">Reduce Harmful Habits</p>
                              <p className="text-xs text-muted-foreground">Consider cutting back on smoking/drinking</p>
                            </div>
                          </div>
                        )}
                        {formData.mood === "stressed" && (
                          <div className="flex gap-3 p-3 bg-background/50 rounded-lg border">
                            <span className="text-xl">🧘</span>
                            <div>
                              <p className="font-medium">Manage Stress</p>
                              <p className="text-xs text-muted-foreground">Try meditation or deep breathing exercises</p>
                            </div>
                          </div>
                        )}
                        <div className="flex gap-3 p-3 bg-background/50 rounded-lg border">
                          <span className="text-xl">💧</span>
                          <div>
                            <p className="font-medium">Stay Hydrated</p>
                            <p className="text-xs text-muted-foreground">Drink 8-10 glasses of water throughout the day</p>
                          </div>
                        </div>
                        <div className="flex gap-3 p-3 bg-background/50 rounded-lg border">
                          <span className="text-xl">🥗</span>
                          <div>
                            <p className="font-medium">Balanced Nutrition</p>
                            <p className="text-xs text-muted-foreground">Focus on whole foods, lean proteins, and vegetables</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Full Analysis (Collapsible) */}
                    <details className="group">
                      <summary className="cursor-pointer list-none">
                        <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors">
                          <span className="font-medium flex items-center gap-2">
                            <span className="text-lg">📋</span>
                            View Detailed Analysis
                          </span>
                          <span className="text-xs text-muted-foreground group-open:rotate-180 transition-transform">▼</span>
                        </div>
                      </summary>
                      <div className="mt-3 p-4 bg-muted/30 rounded-lg text-sm whitespace-pre-wrap leading-relaxed">
                        {analysis}
                      </div>
                    </details>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-12 text-center">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                      <Sparkles className="w-10 h-10 text-primary animate-pulse" />
                    </div>
                    <p className="text-muted-foreground max-w-md">
                      Enter your lifestyle data and click <b>"Analyze Now"</b> to see your personalized AI health report 
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analyze;