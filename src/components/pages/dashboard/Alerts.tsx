import { AlertTriangle } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import { alertsData } from "@/assets/data";
// import { cn } from "@/lib/utils";

const Alerts = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-normal">
          <AlertTriangle className="size-5 text-red-600" />
          Recent Alerts
        </CardTitle>
        <CardDescription>Important notifications and deadlines</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {/* {alertsData.map((alert) => {
            const Icon = alert.icon;
            return (
              <div
                key={alert.id}
                className={cn(
                  "flex items-center gap-3 rounded-lg p-3",
                  alert.background,
                )}
              >
                <Icon className={cn("size-4", alert.secondary)} />
                <div>
                  <p
                    className={cn(
                      "text-sm font-medium capitalize",
                      alert.primary,
                    )}
                  >
                    {alert.title}
                  </p>
                  <p className={cn("text-xs", alert.secondary)}>
                    {alert.description}
                  </p>
                </div>
              </div>
            );
          })} */}
        </div>
      </CardContent>
    </Card>
  );
};

export default Alerts;
