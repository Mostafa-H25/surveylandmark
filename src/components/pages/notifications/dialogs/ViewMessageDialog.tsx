import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Eye } from "lucide-react";
import { useState } from "react";

type Props = { message: any };

const ViewMessageDialog = ({ message }: Props) => {
  const [setSelectedMessage] = useState<any>(null);

  const handleViewMessage = (message: any) => {
    setSelectedMessage(message);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleViewMessage(message)}
        >
          <Eye className="mr-1 size-4" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{message.subject}</DialogTitle>
          <DialogDescription>
            From: {message.from} | To: {message.to} | {message.timestamp}
          </DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <p className="text-gray-700">{message.message}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMessageDialog;
