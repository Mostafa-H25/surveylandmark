import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { TabsContent } from "@/components/ui/tabs";

import { User, Camera } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import EditProfileSettingsDialog from "../dialogs/EditProfileSettingsDialog";

const ProfileTab = () => {
  const { user } = useAuth();

  return (
    <TabsContent value="profile" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="size-5 text-blue-600" />
            Profile Settings
          </CardTitle>
          <CardDescription>
            Personal information and account details
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex h-auto w-full items-center justify-start space-x-3 p-2">
            <div className="flex size-20 items-center justify-center rounded-full bg-blue-100">
              <span className="text-sm font-medium text-blue-600">
                {user?.name.charAt(0)}
              </span>
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium whitespace-nowrap text-gray-900">
                  {user?.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {user?.role.replaceAll("_", " ")}
                </p>
              </div>
              <Button variant="secondary" size="sm">
                <Camera />
                Change Photo
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-full">
              <p className="text-sm text-gray-600">Bio</p>
              <p className="text-gray-900 capitalize">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Doloribus possimus nihil animi officia distinctio. Quas fugit
                eius, quia sit commodi corrupti quos? Quaerat harum quis dolor
                autem dolorum facilis! Accusantium?
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Role</p>
              <p className="text-gray-900 capitalize">
                {user?.role.replaceAll("_", " ")}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Department</p>
              <p className="text-gray-900 capitalize">Engineering</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-gray-900 capitalize">(+20) 123456789</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="text-gray-900 capitalize">
                {new Date().toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Last Login</p>
              <p className="text-gray-900 capitalize">
                {new Date().toLocaleString()}
              </p>
            </div>
          </div>
          <EditProfileSettingsDialog />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default ProfileTab;
