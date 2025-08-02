import { AlertTriangle, CheckCircle } from "lucide-react";

import { alerts } from "@/assets/data";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Alerts } from "@/constants/defaults";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import { getPriorityColor } from "@/helpers/getPriorityColor";
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

import ViewNotificationDialog from "../dialogs/ViewNotificationDialog";

const NotificationsTab = () => {
  const { toast } = useToast();

  const handleResolveAlert = (alertId: number) => {
    toast({
      title: "Alert Resolved",
      description: "Alert has been marked as resolved.",
    });
  };

  return (
    <TabsContent value="alerts" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            System Alerts
          </CardTitle>
          <CardDescription>
            Deadlines, payment approvals, and inventory shortage notifications
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Alert</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {alerts.map((alert) => {
                const Icon =
                  Alerts.find((a) => a.value === alert.type)?.icon ||
                  AlertTriangle;
                return (
                  <TableRow key={alert.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon className="size-4" />
                        <span className="capitalize">{alert.type}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{alert.title}</div>
                        <div className="text-sm text-gray-500">
                          {alert.message}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{alert.project}</TableCell>
                    <TableCell>
                      <Badge className={getPriorityColor(alert.priority)}>
                        {alert.priority.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {alert.timestamp}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          alert.status === "active" ? "default" : "secondary"
                        }
                      >
                        {alert.status.toUpperCase()}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <ViewNotificationDialog alert={alert} />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleResolveAlert(alert.id)}
                        >
                          <CheckCircle className="mr-1 size-4" />
                          Resolve
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default NotificationsTab;
