import { Link, useLocation, useNavigate } from "react-router-dom";
import { Heart, LayoutDashboard, Activity, User, Lightbulb, Settings, LogOut } from "lucide-react";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/analyze", icon: Activity, label: "AI Analysis" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/tips", icon: Lightbulb, label: "Tips & Insights" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("foreverbeater_user");
    toast.success("Logged out successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* Top Navigation Bar */}
      <nav className="bg-card border-b border-border shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/dashboard" className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-primary fill-primary" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                ForeverBeater
              </span>
            </Link>
            
            <Button
              onClick={handleLogout}
              variant="ghost"
              className="text-muted-foreground hover:text-destructive transition-smooth"
            >
              <LogOut className="w-5 h-5 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-[240px_1fr] gap-8">
          {/* Sidebar Navigation */}
          <aside className="space-y-2">
            <div className="bg-card rounded-2xl p-4 shadow-card border border-border">
              <p className="text-sm font-medium text-muted-foreground mb-4 px-2">Navigation</p>
              <nav className="space-y-1">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.path;
                  
                  return (
                    <Link key={item.path} to={item.path}>
                      <Button
                        variant={isActive ? "secondary" : "ghost"}
                        className={`w-full justify-start transition-smooth ${
                          isActive
                            ? "bg-primary text-primary-foreground shadow-glow"
                            : "hover:bg-muted"
                        }`}
                      >
                        <Icon className="w-5 h-5 mr-3" />
                        {item.label}
                      </Button>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          {/* Main Content Area */}
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
