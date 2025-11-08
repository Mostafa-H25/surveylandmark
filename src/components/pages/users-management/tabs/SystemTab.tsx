import type { Dispatch, SetStateAction } from "react";

import { SettingsIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserManagementTabsEnum } from "@/constants/defaults";

type Props = {
  setSelectedSettingId: Dispatch<SetStateAction<number>>;
  setIsSystemSettingsOpen: Dispatch<SetStateAction<boolean>>;
};

const systemSettings = [
  {
    id: 1,
    setting: "Default Language",
    value: "English",
    category: "Localization",
  },
  {
    id: 2,
    setting: "Default Currency",
    value: "USD",
    category: "Localization",
  },
  {
    id: 3,
    setting: "Session Timeout",
    value: "30 minutes",
    category: "Security",
  },
  {
    id: 4,
    setting: "Password Policy",
    value: "Strong",
    category: "Security",
  },
  {
    id: 5,
    setting: "Email Notifications",
    value: "Enabled",
    category: "Communication",
  },
  { id: 6, setting: "Backup Frequency", value: "Daily", category: "System" },
];

const SystemTab = ({
  setSelectedSettingId,
  setIsSystemSettingsOpen,
}: Props) => {
  const handleUpdateSetting = (settingId: number) => {
    setSelectedSettingId(settingId);
    setIsSystemSettingsOpen(true);
  };
  return (
    <TabsContent value={UserManagementTabsEnum.SYSTEM} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <SettingsIcon className="size-5 text-blue-600" />
            System Settings
          </CardTitle>
          <CardDescription>
            Configure system-wide settings and integrations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Setting</TableHead>
                <TableHead>Current Value</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {systemSettings.map((setting) => (
                <TableRow key={setting.id}>
                  <TableCell className="font-medium">
                    {setting.setting}
                  </TableCell>
                  <TableCell>{setting.value}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{setting.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      className="cursor-pointer"
                      onClick={() => handleUpdateSetting(setting.id)}
                    >
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default SystemTab;
