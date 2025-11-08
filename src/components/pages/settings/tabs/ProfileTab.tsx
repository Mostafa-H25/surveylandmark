import { type ChangeEvent, useEffect, useState } from "react";

import { format } from "date-fns";
import { Camera, User as UserIcon } from "lucide-react";

import { meApi } from "@/api/user/me.api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import type { UserProfile } from "@/types/interfaces";
import { formatPhoneNumber } from "@/helpers/formatPhoneNumber";
import { editProfileImageApi } from "@/api/user/edit-profile-image.api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import EditProfileSettingsDialog from "../dialogs/EditProfileSettingsDialog";
import { formatCamelCaseToText } from "@/helpers/formatCamelCaseToText";

const ProfileTab = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchUser = async () => {
    try {
      const result = await meApi();
      setUser({ ...result });
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onImageChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!user) return;
    setIsSubmitting(true);

    const img = e.target.files?.[0];
    if (img) {
      const url = URL.createObjectURL(img);

      try {
        await editProfileImageApi(img);
        setUser({
          ...user,
          profileImageUrl: url,
          profileImage: img,
        });
        toast.success("Profile Image Updated", {
          description: `Your profile image has been updated successfully.`,
          richColors: true,
        });
      } catch (error) {
        console.error(error);
        toast.error("Profile Image Update Failed", {
          description: `Your profile image update failed. Please try again.`,
          richColors: true,
        });
      }
      setIsSubmitting(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }
  return (
    <TabsContent value="profile" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserIcon className="size-5 text-blue-600" />
            Profile Settings
          </CardTitle>
          <CardDescription>
            Personal information and account details
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex h-auto w-full items-center justify-start space-x-3 p-2">
            <div className="relative flex size-20 items-center justify-center overflow-clip rounded-full bg-blue-100">
              {user.profileImageUrl ? (
                <img
                  src={user.profileImageUrl}
                  alt="profile picture"
                  className="absolute inset-0"
                />
              ) : (
                <span className="text-sm font-medium text-blue-600">
                  {user.name.charAt(0)}
                </span>
              )}
            </div>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium whitespace-nowrap text-gray-900 capitalize">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 capitalize">
                  {formatCamelCaseToText(user.role)}
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                className="relative flex w-36 cursor-pointer items-center justify-center p-2"
              >
                {isSubmitting ? (
                  <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
                ) : (
                  <>
                    <Camera />
                    Change Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute inset-0 z-10 opacity-0"
                      onChange={onImageChange}
                    />
                  </>
                )}
              </Button>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-full">
              <p className="text-sm text-gray-600">Bio</p>
              <p className="min-h-12 text-gray-900 capitalize">{user?.bio}</p>
              <hr />
            </div>
            <div>
              <p className="text-sm text-gray-600">Full Name</p>
              <p className="text-gray-900 capitalize">{user.name}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Department</p>
              <p className="text-gray-900 capitalize">{user?.department}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email</p>
              <p className="text-gray-900">{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Location</p>
              <p className="text-gray-900 capitalize">{user?.location}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="text-gray-900 capitalize">
                {formatPhoneNumber(user.phone)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="text-gray-900">
                {format(user.createdAt, "do MMM, yyyy")}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-600">Last Login</p>
              <p className="text-gray-900">
                {format(user.lastLogin, "do MMM, yyyy hh:mm bbb")}
              </p>
            </div>
          </div>
          <EditProfileSettingsDialog user={user} setUser={setUser} />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default ProfileTab;
