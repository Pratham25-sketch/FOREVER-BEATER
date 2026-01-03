import { Link, useLocation } from "react-router-dom";
import {
  Heart,
  LayoutDashboard,
  Activity,
  User,
  Lightbulb,
  Settings,
  LogOut,
  Menu,
  Moon,
  Sun,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState, useEffect } from "react";

import {
  SignOutButton,
  useUser,
} from "@clerk/clerk-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "./ui/dropdown-menu";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "./ui/alert-dialog";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const location = useLocation();
  const { user } = useUser();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
 const [darkMode, setDarkMode] = useState(() => {
  return localStorage.getItem("theme") === "dark";
});

  useEffect(() => {
    const root = document.documentElement;

    if (darkMode) {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);


  const toggleDarkMode = () => {
  setDarkMode(prev => !prev);
};


  const navItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { path: "/analyze", icon: Activity, label: "AI Analysis" },
    { path: "/profile", icon: User, label: "Profile" },
    { path: "/tips", icon: Lightbulb, label: "Tips" },
    { path: "/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background">
      {/* ================= TOP NAVBAR ================= */}
     {/* ================= PREMIUM TOP NAVBAR ================= */}
<nav className="sticky top-0 z-50 backdrop-blur-xl bg-white/70 dark:bg-neutral-950/70 border-b border-border shadow-sm">
  <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

    {/* LEFT — BRAND */}
    <Link to="/dashboard" className="flex items-center gap-3 group">
      <div className="relative">
        <Heart className="w-9 h-9 text-rose-500 fill-rose-500 animate-pulse" />
        <span className="absolute inset-0 rounded-full bg-rose-400 blur-xl opacity-30 group-hover:opacity-60 transition" />
      </div>

      <div className="flex flex-col leading-tight">
        <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          ForeverBeater
        </span>
        <span className="text-xs text-muted-foreground">
          AI Heart Intelligence
        </span>
      </div>
    </Link>

    {/* CENTER — QUICK ACTIONS */}
    <div className="hidden md:flex items-center gap-3">
      <Link to="/add-reading">
        <Button className="rounded-full bg-gradient-to-r from-primary to-accent text-white shadow-md hover:scale-105 transition">
          + Add New Reading
        </Button>
      </Link>

      <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted text-sm">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        Heart Status: Stable
      </div>
    </div>
{/* Right Controls */}
<div className="flex items-center gap-4">

  {/* Dark Mode Toggle */}
  <Button
    variant="ghost"
    onClick={toggleDarkMode}
    className="flex items-center gap-2 h-11 px-4 rounded-full border border-border "
  >
    <span className="flex items-center justify-center w-9 h-9  border-border">
      {darkMode ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </span>
    <span className="text-sm font-medium hidden md:inline">
      {darkMode ? "Light Mode" : "Dark Mode"}
    </span>
  </Button>

  {/* About the Creator */}
  <Link to="/creator" className="block">
    <Button
      variant="ghost"
      className="flex items-center gap-2 h-11 px-4 rounded-full border border-border "
    >
      <span className="flex items-center justify-center w-9 h-9  border-border text-lg">
        👨‍💻
      </span>
      <span className="text-sm font-medium hidden md:inline">
        About Us
      </span>
    </Button>
  </Link>


      {/* USER AVATAR DROPDOWN */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex items-center gap-2 rounded-full px-2"
          >
            <img
  src={user?.imageUrl || "/avatar-default.png"}
  alt="avatar"
  className="w-9 h-9 rounded-full ring-2 ring-primary/50"
/>

            <span className="hidden lg:block text-sm font-medium">
              Hi, {user?.firstName}
            </span>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem disabled>
            {user?.emailAddresses[0]?.emailAddress}
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem asChild>
            <Link to="/profile">👤 Profile</Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link to="/settings">⚙ Settings</Link>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onClick={() => setLogoutOpen(true)}
            className="text-destructive"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </div>
</nav>


      {/* ================= MOBILE NAV ================= */}
      {mobileOpen && (
        <div className="md:hidden border-b bg-card px-4 py-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = location.pathname === item.path;

            return (
              <Link key={item.path} to={item.path} onClick={() => setMobileOpen(false)}>
                <Button
                  variant="ghost"
                  className={`w-full justify-start ${
                    active && "bg-primary text-primary-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5 mr-3" />
                  {item.label}
                </Button>
              </Link>
            );
          })}

          <Button variant="ghost" onClick={toggleDarkMode} className="w-full">
            {darkMode ? <Sun className="mr-2" /> : <Moon className="mr-2" />}
            Toggle Theme
          </Button>

          <Button
            variant="ghost"
            className="w-full text-destructive"
            onClick={() => setLogoutOpen(true)}
          >
            <LogOut className="mr-2" /> Logout
          </Button>
        </div>
      )}

      {/* ================= CONTENT ================= */}
      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="hidden lg:block">
          <div className="bg-card p-4 rounded-2xl shadow border">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path;

              return (
                <Link key={item.path} to={item.path}>
                  <Button
                    variant="ghost"
                    className={`w-full justify-start transition-all ${
                      active &&
                      "bg-primary text-primary-foreground shadow-md scale-[1.02]"
                    }`}
                  >
                    <Icon className="w-5 h-5 mr-3" />
                    {item.label}
                  </Button>
                </Link>
              );
            })}
          </div>
        </aside>

        <main>{children}</main>
      </div>

      {/* ================= LOGOUT WARNING ================= */}
      <AlertDialog open={logoutOpen} onOpenChange={setLogoutOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? You will need to sign in again to
              access your dashboard.
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <SignOutButton redirectUrl="/">
              <AlertDialogAction className="bg-destructive text-white">
                Logout
              </AlertDialogAction>
            </SignOutButton>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default DashboardLayout;
