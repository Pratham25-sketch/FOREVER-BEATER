import { Button } from "@/components/ui/button";
import { Heart, Activity, TrendingUp, Shield } from "lucide-react";
import { Link, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useUser } from "@clerk/clerk-react";

/* ❤️ Beating Heart Component (replaces "v") */
const BeatingHeart = () => (
  <motion.span
    className="inline-block text-red-500 mx-1"
    animate={{ scale: [1, 1.25, 1] }}
    transition={{
      duration: 0.8,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    ❤️
  </motion.span>
);

const Landing = () => {
  const { isSignedIn } = useUser();

  // 🔥 Prevent auth redirect loop
  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-white dark:bg-neutral-950">

      {/* ================= HERO SECTION ================= */}
      <section
        className="min-h-screen flex items-center justify-center px-4 relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.55)), url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Gradient blobs */}
        <div className="absolute -top-10 -left-10 w-72 h-72 bg-primary/30 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-accent/30 rounded-full blur-[120px]" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-4xl text-center text-white px-4"
        >
          <h1 className="text-6xl md:text-7xl font-extrabold tracking-tight mb-6 bg-gradient-to-r from-white via-primary to-accent bg-clip-text text-transparent">
            Fore
            <BeatingHeart />
            erBeater
          </h1>

          <p className="text-2xl md:text-3xl font-medium mb-4 text-white/90">
            Stay in rhythm, forever.
          </p>

          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed mb-10">
            The most advanced AI-powered companion crafted to track, analyze,
            and improve heart health — designed especially for teens.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/sign-up">
              <Button
                size="lg"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-10 py-6 text-lg rounded-xl shadow-xl hover:bg-white/20 hover:scale-105 transition-all"
              >
                Sign Up Free
              </Button>
            </Link>

            <Link to="/sign-in">
              <Button
                size="lg"
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white font-semibold px-10 py-6 text-lg rounded-xl shadow-xl hover:bg-white/20 hover:scale-105 transition-all"
              >
                Login
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* ================= FEATURES SECTION ================= */}
      <section className="py-24 px-6 bg-neutral-900 text-white">
        <div className="max-w-6xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4">
            Why ForeverBeater?
          </h2>
          <p className="text-lg md:text-xl text-white/80">
            Your complete heart wellness ecosystem.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <FeatureCard
            icon={<Activity className="w-10 h-10" />}
            title="Live Tracking"
            description="Track heart rate, BP, and activity in real-time."
          />
          <FeatureCard
            icon={<Heart className="w-10 h-10" />}
            title="AI Insights"
            description="Get personalized health insights powered by AI."
          />
          <FeatureCard
            icon={<TrendingUp className="w-10 h-10" />}
            title="Progress Reports"
            description="Visual dashboards to understand your growth."
          />
          <FeatureCard
            icon={<Shield className="w-10 h-10" />}
            title="Safe & Secure"
            description="Your health data stays private and encrypted."
          />
        </div>
      </section>

      {/* ================= CTA SECTION ================= */}
      <section
        className="py-24 px-6 relative"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.75), rgba(0,0,0,0.75)), url('https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1600&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-4xl mx-auto text-center text-white relative z-10">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-6">
            Ready to take control of your heart health?
          </h2>
          <p className="text-xl text-white/80 mb-10">
            Start your journey today.
          </p>

          <Link to="/sign-up">
            <Button
              size="lg"
              className="bg-primary text-white font-semibold px-12 py-6 text-lg rounded-xl hover:bg-primary/90 shadow-xl transition-all"
            >
              Get Started Now
            </Button>
          </Link>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="py-10 bg-neutral-950 text-center text-white">
        <p className="text-white/90 font-medium">
          © 2025 ForeverBeater. Made with ❤️ for your ❤️.
        </p>
        <p className="text-white/60 text-sm mt-2">
          Created by Pratham Pratap Singh
        </p>
      </footer>
    </div>
  );
};

/* ================= FEATURE CARD ================= */
const FeatureCard = ({ icon, title, description }: any) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      className="p-8 bg-white/95 dark:bg-neutral-900 rounded-2xl shadow-lg border border-white/10 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="text-primary mb-5">{icon}</div>
      <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </motion.div>
  );
};

export default Landing;
