import { useState } from "react";

import { SquarePen } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const EditProfileSettingsDialog = () => {
  const { toast } = useToast();

  const [isUpdateProfileOpen, setIsUpdateProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleEditProfile = () => {
    setIsUpdateProfileOpen(true);
  };

  const handleUpdateProfile = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Profile Updated",
      description: `${profileData.name} has been added successfully.`,
    });
    setIsUpdateProfileOpen(false);
    setProfileData({ name: "", email: "", phone: "", company: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setProfileData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isUpdateProfileOpen} onOpenChange={setIsUpdateProfileOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleEditProfile}
          className="w-32 self-end bg-blue-600 hover:bg-blue-700"
        >
          <SquarePen className="size-4" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
          <DialogDescription>
            Update your personal information.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleUpdateProfile} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Full Name</Label>
            <Input
              id="clientName"
              value={profileData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter client name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientEmail">Email</Label>
            <Input
              id="clientEmail"
              type="email"
              value={profileData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="client@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientPhone">Phone</Label>
            <Input
              id="clientPhone"
              value={profileData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+1-555-0123"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientCompany">Company</Label>
            <Input
              id="clientCompany"
              value={profileData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              placeholder="Company name"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsUpdateProfileOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProfileSettingsDialog;
