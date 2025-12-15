// Enhanced Settings Page UI matching Dashboard theme
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Settings as SettingsIcon, Lock, Trash2, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/DashboardLayout";
import { toast } from "sonner";
import { motion } from "framer-motion";

const Settings = () => {
  const navigate = useNavigate();
  const [passwords, setPasswords] = useState({ current: "", new: "", confirm: "" });

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (!passwords.current || !passwords.new || !passwords.confirm) return toast.error("Fill all fields");
    if (passwords.new !== passwords.confirm) return toast.error("Passwords don't match");
    if (passwords.new.length < 6) return toast.error("Min 6 characters");
    toast.success("Password updated!");
    setPasswords({ current: "", new: "", confirm: "" });
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem("foreverbeater_user");
    toast.success("Account deleted");
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("foreverbeater_user");
    toast.success("Logged out");
    navigate("/");
  };

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl p-10 bg-gradient-to-r from-primary/90 to-accent/90 text-white shadow-xl">
          <h1 className="text-4xl font-semibold tracking-tight">Settings</h1>
          <p className="text-white/80 mt-1 text-lg">Manage your account preferences</p>
        </motion.div>

        {/* Settings Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Password Update */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="shadow-xl border border-primary/10 rounded-2xl bg-white dark:bg-neutral-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                  <Lock className="w-5 h-5 text-primary" /> Change Password
                </CardTitle>
                <CardDescription>Update your password to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div>
                    <Label>Current Password</Label>
                    <Input type="password" placeholder="Enter current password" value={passwords.current} onChange={(e) => setPasswords({ ...passwords, current: e.target.value })} className="mt-1" />
                  </div>
                  <div>
                    <Label>New Password</Label>
                    <Input type="password" placeholder="Enter new password" value={passwords.new} onChange={(e) => setPasswords({ ...passwords, new: e.target.value })} className="mt-1" />
                  </div>
                  <div>
                    <Label>Confirm Password</Label>
                    <Input type="password" placeholder="Confirm password" value={passwords.confirm} onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })} className="mt-1" />
                  </div>
                  <Button type="submit" variant="destructive" className="w-full py-4 rounded-xl">
                    Update Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* Account Actions */}
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            {/* Logout */}
            <Card className="shadow-xl border border-primary/10 rounded-2xl bg-white dark:bg-neutral-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <LogOut className="w-5 h-5 text-primary" /> Logout
                </CardTitle>
                <CardDescription>Sign out of your account</CardDescription>
              </CardHeader>
              <CardContent>
                <Button onClick={handleLogout} variant="outline" variant="destructive" className="w-full py-4 rounded-xl">
                  Logout
                </Button>
              </CardContent>
            </Card>

            {/* Danger Zone */}
            <Card className="shadow-xl border border-destructive/30 rounded-2xl bg-white dark:bg-neutral-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold text-destructive">
                  <Trash2 className="w-5 h-5" /> Danger Zone
                </CardTitle>
                <CardDescription>Permanently delete your account</CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full py-4 rounded-xl">Delete Account</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>This action cannot be undone. Your data will be lost forever.</AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleDeleteAccount} className="bg-destructive hover:bg-destructive/90 rounded-xl">Yes, delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* App Info */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="shadow-xl border border-primary/10 rounded-2xl bg-white dark:bg-neutral-900">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg font-semibold tracking-tight">
                <SettingsIcon className="w-5 h-5 text-primary" /> About ForeverBeater
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Version</span>
                <span className="font-semibold">1.0.0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="font-semibold text-green-600">All Systems Operational ✓</span>
              </div>
              <p className="text-sm text-muted-foreground pt-4 leading-relaxed">
                ForeverBeater helps teens track and improve their heart health with AI insights. Not a substitute for medical advice.
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;