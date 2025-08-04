import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Bell } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const NotificationTab = () => {
  const { toast } = useToast();
  const handleSave = (section: string) => {
    toast({
      title: "Settings saved",
      description: `Your ${section} settings have been updated successfully.`,
    });
  };
  return (
    <TabsContent value="notification" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bell className="size-5 text-blue-600" />
            Notification Preferences
          </CardTitle>
          <CardDescription>
            Configure how your recieve notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="email-notification">Email Notification</Label>
              <p className="text-sm text-gray-600">
                Receive notifications via email
              </p>
            </div>
            <Switch id="email-notification" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="push-notification">Push Notification</Label>
              <p className="text-sm text-gray-600">
                Receive notifications via browser
              </p>
            </div>
            <Switch id="push-notification" />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="project-updates">Project Updates</Label>
              <p className="text-sm text-gray-600">
                Get notified about project changes
              </p>
            </div>
            <Switch id="project-updates" />
          </div>
          <Button
            type="submit"
            className="self-end bg-blue-600 hover:bg-blue-700"
            onClick={() => handleSave("notifications")}
          >
            Save Preferences
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default NotificationTab;
