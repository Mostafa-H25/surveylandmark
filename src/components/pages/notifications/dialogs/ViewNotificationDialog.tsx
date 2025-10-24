import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Alerts } from "@/constants/defaults";
import { getPriorityColor } from "@/helpers/getPriorityColor";
import { AlertTriangle, Eye } from "lucide-react";
import { useState } from "react";

type Props = { alert: any };

const ViewNotificationDialog = ({ alert }: Props) => {
  const [, setSelectedAlert] = useState<any>(null);
  const Icon =
    Alerts.find((a) => a.value === alert.type)?.icon || AlertTriangle;
  const handleViewAlert = (alert: any) => {
    setSelectedAlert(alert);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleViewAlert(alert)}
        >
          <Eye className="mr-1 size-4" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Icon className="size-4" />
            {alert.title}
          </DialogTitle>
          <DialogDescription>
            Project: {alert.project} | {alert.timestamp}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p className="mb-4 text-gray-700">{alert.message}</p>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">Priority:</span>
            <Badge className={getPriorityColor(alert.priority)}>
              {alert.priority.toUpperCase()}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewNotificationDialog;
