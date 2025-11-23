import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ProfileTab from "@/components/pages/settings/tabs/ProfileTab";
import CompanyTab from "@/components/pages/settings/tabs/CompanyTab";
import SecurityTab from "@/components/pages/settings/tabs/SecurityTab";
import { useSearchParams } from "react-router-dom";

const Settings = () => {
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const tab = URLSearchParams.get("tab") || "profile";
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600">
          Manage your account settings, company information, and system
          configurations.
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
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="company">Company Info</TabsTrigger>
        </TabsList>

        <ProfileTab />
        <SecurityTab />
        <CompanyTab />
      </Tabs>
    </div>
  );
};

export default Settings;
