import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const Landing = () => {
  const { isSignedIn } = useUser();

  // 🔥 THIS FIXES THE LOOP
  if (isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold">ForeverBeater ❤️</h1>

        <div className="flex gap-4 justify-center">
          <Link to="/sign-up">
            <Button size="lg">Sign Up</Button>
          </Link>
          <Link to="/sign-in">
            <Button size="lg" variant="outline">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
