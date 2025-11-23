import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { MessageSquare, AlertTriangle } from "lucide-react";
import MessagingTab from "@/components/pages/notifications/tabs/MessagingTab";
import NotificationsTab from "@/components/pages/notifications/tabs/NotificationsTab";
import { useSearchParams } from "react-router-dom";

const Messages = () => {
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const tab = URLSearchParams.get("tab") || "messages";
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Notifications & Messages
        </h1>
        <p className="mt-2 text-gray-600">
          Manage internal communications and system alerts.
        </p>
      </div>

      <Tabs
        defaultValue={tab}
        onValueChange={(value) => {
          setURLSearchParams((prev) => {
            prev.set("tab", value);
            return prev;
          });
        }}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="messages" className="flex items-center gap-2">
            <MessageSquare className="size-4" />
            Internal Messaging (To Individuals / Teams)
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center gap-2"
          >
            <AlertTriangle className="size-4" />
            Alerts (Deadlines – Payment Approvals – Inventory Shortage)
          </TabsTrigger>
        </TabsList>

        <MessagingTab />
        <NotificationsTab />
      </Tabs>
    </div>
  );
};

export default Messages;
