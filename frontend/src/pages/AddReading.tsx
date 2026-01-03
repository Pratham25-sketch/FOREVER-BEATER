// src/pages/AddReading.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { addReading } from "@/api/api";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";
import { useUser } from "@clerk/clerk-react";

const AddReading = () => {
  const navigate = useNavigate();
  const { user } = useUser(); // ✅ Get Clerk user

  const [form, setForm] = useState({
    heartRate: "",
    bloodPressure: "",
    stressLevel: "",
    sleepHours: "",
    exerciseMinutes: "",
  });

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await addReading({
        userId: user?.id, // ✅ Attach userId
        heartRate: Number(form.heartRate),
        bloodPressure: form.bloodPressure,
        stressLevel: form.stressLevel,
        sleepHours: Number(form.sleepHours),
        exerciseMinutes: Number(form.exerciseMinutes),
      });

      toast.success("Reading added successfully!");
      navigate("/dashboard");
    } catch (err: any) {
      console.error("ADD ERROR =", err.response?.data || err);
      toast.error("Failed to add reading.");
    }
  };

  return (
    <DashboardLayout>
      <Card className="max-w-xl mx-auto mt-10 shadow-card border border-primary/20">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Add New Reading 🩺
          </CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Heart Rate */}
            <div>
              <Label>Heart Rate (BPM)</Label>
              <Input
                type="number"
                name="heartRate"
                value={form.heartRate}
                onChange={handleChange}
                required
              />
            </div>

            {/* Blood Pressure */}
            <div>
              <Label>Blood Pressure (mmHg)</Label>
              <Input
                name="bloodPressure"
                value={form.bloodPressure}
                onChange={handleChange}
                placeholder="120/80"
                required
              />
            </div>

          
          {/* Stress Level */}
<div>
  <Label>Stress Level</Label>
  <select
    name="stressLevel"
    value={form.stressLevel}
    onChange={handleChange}
    required
    className="
      w-full h-11 px-3 rounded-lg border
      bg-white text-gray-900
      dark:bg-neutral-900 dark:text-white
      border-input dark:border-neutral-700
      focus:outline-none focus:ring-2 focus:ring-primary
      transition
    "
  >
    <option value="">Select</option>
    <option value="Low">Low</option>
    <option value="Moderate">Moderate</option>
    <option value="High">High</option>
  </select>
</div>


            {/* Sleep Hours */}
            <div>
              <Label>Sleep Hours</Label>
              <Input
                type="number"
                step="0.1"
                name="sleepHours"
                value={form.sleepHours}
                onChange={handleChange}
                required
              />
            </div>

            {/* Exercise Minutes */}
            <div>
              <Label>Exercise Minutes</Label>
              <Input
                type="number"
                name="exerciseMinutes"
                value={form.exerciseMinutes}
                onChange={handleChange}
                required
              />
            </div>

            {/* Submit */}
            <Button className="w-full py-6 bg-primary text-white">
              Add Reading
            </Button>
          </form>
        </CardContent>
      </Card>
    </DashboardLayout>
  );
};

export default AddReading;


