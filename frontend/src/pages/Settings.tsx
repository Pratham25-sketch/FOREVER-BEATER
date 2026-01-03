import DashboardLayout from "@/components/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { ShieldCheck, Info, Activity } from "lucide-react";
import { UserProfile } from "@clerk/clerk-react";

const Settings = () => {
  return (
    <DashboardLayout>
      <div className="space-y-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl p-10 bg-gradient-to-r from-primary to-accent text-white shadow-xl"
        >
          <h1 className="text-4xl font-semibold tracking-tight">Settings</h1>
          <p className="text-white/80 mt-1 text-lg">
            Manage your account & application preferences
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid lg:grid-cols-50 gap-8">

          {/* ACCOUNT & SECURITY */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="shadow-xl border border-primary/10 rounded-2xl bg-white dark:bg-neutral-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg font-semibold">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                  Account & Security
                </CardTitle>
                <CardDescription>
                  Securely manage your login, password, and sessions
                </CardDescription>
              </CardHeader>

              <CardContent className="overflow-hidden bg-white dark:bg-neutral-900" >
                <UserProfile
                  appearance={{
                    elements: {
                      card: "shadow-none border-none bg-transparent",
                      navbar: "hidden",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                    },
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>

          {/* APP INFO */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
          
          </motion.div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;

