import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProfileTab from "@/components/pages/settings/tabs/ProfileTab";
import CompanyTab from "@/components/pages/settings/tabs/CompanyTab";
import SecurityTab from "@/components/pages/settings/tabs/SecurityTab";
import NotificationTab from "@/components/pages/settings/tabs/NotificationTab";

const Settings = () => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings, company information, and system
          configurations.
        </p>
      </div>

      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="notification">Notifications</TabsTrigger>
          <TabsTrigger value="company">Company Info</TabsTrigger>
        </TabsList>

        <ProfileTab />
        <SecurityTab />
        <NotificationTab />
        <CompanyTab />
      </Tabs>
    </div>
  );
};

export default Settings;
