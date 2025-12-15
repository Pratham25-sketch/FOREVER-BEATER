import { useState } from "react";
import { useUser } from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Edit,
  Mail,
  User,
  Briefcase,
  CalendarCheck,
  Camera,
} from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Profile = () => {
  const { user, isLoaded } = useUser();
  const [open, setOpen] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);

  if (!isLoaded) return null;
  if (!user) return null;

  const name = user.fullName || "User";
  const email = user.primaryEmailAddress?.emailAddress || "Not available";
  const createdAt = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString()
    : "N/A";

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);

  const handleProfilePic = (e: any) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setProfilePic(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <DashboardLayout>
      <div className="space-y-10">
        {/* HEADER */}
        <div className="bg-gradient-to-r from-primary to-accent rounded-2xl p-8 text-white shadow-lg">
          <h1 className="text-4xl font-bold">Profile</h1>
          <p className="text-white/90 text-lg">
            Your account details & preferences
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <Card className="shadow-xl border border-primary/10 rounded-2xl">
            <CardHeader className="text-center">
              <div className="relative flex justify-center mb-4">
                <Avatar className="w-28 h-28 border-4 border-primary shadow-lg">
                  <AvatarImage
                    src={profilePic || user.imageUrl}
                  />
                  <AvatarFallback className="text-3xl bg-gradient-to-br from-primary to-accent text-white">
                    {getInitials(name)}
                  </AvatarFallback>
                </Avatar>

                <label className="absolute bottom-0 right-[35%] bg-primary p-2 rounded-full cursor-pointer">
                  <Camera className="text-white w-4 h-4" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleProfilePic}
                    className="hidden"
                  />
                </label>
              </div>

              <CardTitle className="text-2xl">{name}</CardTitle>
              <p className="text-muted-foreground">{email}</p>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Type</span>
                <Badge variant="outline" className="border-primary text-primary">
                  Clerk Auth
                </Badge>
              </div>

              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Edit className="w-4 h-4 mr-2" /> Edit Profile
                  </Button>
                </DialogTrigger>

                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Edit Profile</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4">
                    <div>
                      <Label>Name</Label>
                      <Input value={name} disabled />
                    </div>

                    <div>
                      <Label>Email</Label>
                      <Input value={email} disabled />
                    </div>

                    <Button
                      className="w-full"
                      onClick={() => setOpen(false)}
                    >
                      Save (Handled by Clerk)
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          {/* RIGHT */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="shadow-xl border border-primary/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm">
                <InfoRow
                  icon={<Mail className="w-4 h-4 text-primary" />}
                  label="Email"
                  value={email}
                />
                <InfoRow
                  icon={<Briefcase className="w-4 h-4 text-primary" />}
                  label="Auth Provider"
                  value="Clerk"
                />
              </CardContent>
            </Card>

            <Card className="shadow-xl border border-primary/10 rounded-2xl">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CalendarCheck className="w-5 h-5 text-primary" />
                  Account Info
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4 text-sm">
                <UsageRow label="Account Created" value={createdAt} />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const InfoRow = ({ icon, label, value }: any) => (
  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
    {icon}
    <div>
      <p className="text-muted-foreground text-xs">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  </div>
);

const UsageRow = ({ label, value }: any) => (
  <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
    <span className="text-muted-foreground">{label}</span>
    <span className="font-semibold">{value}</span>
  </div>
);

export default Profile;

