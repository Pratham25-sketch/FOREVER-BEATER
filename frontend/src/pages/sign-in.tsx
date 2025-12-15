import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter your email and password");
      return;
    }

    const storedUser = localStorage.getItem("foreverbeater_user");

    if (storedUser) {
      localStorage.setItem("foreverbeater_lastLogin", new Date().toISOString());

      toast.success("Welcome back!");
      navigate("/dashboard");
    } else {
      toast.error("Account not found. Please sign up first");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gradient-to-br from-primary/10 via-white to-accent/10 dark:from-neutral-900 dark:via-neutral-950 dark:to-neutral-900">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-md">
        <Card className="shadow-xl rounded-2xl border border-primary/10 bg-white dark:bg-neutral-900">
          <CardHeader className="text-center pb-2">
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4 }}
              className="mx-auto mb-4 p-4 rounded-full bg-primary/10 dark:bg-primary/20 w-fit"
            >
              <Heart className="w-14 h-14 text-primary animate-heartbeat" fill="currentColor" />
            </motion.div>
            <CardTitle className="text-3xl font-semibold tracking-tight">Welcome Back</CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              Log in to continue your health insights
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label>Email</Label>
                <Input
                  type="email"
                  placeholder="you@example.com"
                  className="normal-case"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <Button
                type="submit"
                className="w-full py-6 rounded-xl text-lg font-medium shadow-lg bg-gradient-to-r from-primary to-accent text-white hover:opacity-90 transition-all"
              >
                Log In
              </Button>

              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/sign-up" className="text-primary font-semibold hover:underline">
                  Sign Up
                </Link>
              </p>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default Login;
