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
import { formatDate } from "@/helpers/formatDate";
import { getPriorityColor } from "@/helpers/getPriorityColor";
import type { Message } from "@/types/interfaces";
import { Eye } from "lucide-react";
import { useState } from "react";

type Props = { message: Message };

const ViewMessageDialog = ({ message }: Props) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);

  const handleViewMessage = (message: Message) => {
    setSelectedMessage(message);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="cursor-pointer"
          onClick={() => handleViewMessage(message)}
        >
          <Eye className="mr-1 size-4" />
          View
        </Button>
      </DialogTrigger>
      <DialogContent className="flex max-w-2xl flex-col gap-8">
        <DialogHeader>
          <DialogTitle>{selectedMessage?.subject}</DialogTitle>
          <DialogDescription>
            From: {selectedMessage?.from}
            &nbsp;|&nbsp;
            {selectedMessage?.createdAt
              ? formatDate(selectedMessage?.createdAt)
              : "-"}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          <p className="text-gray-700">{selectedMessage?.body}</p>
          <div className="flex items-center gap-4">
            <span>Priority</span>
            <Badge className={getPriorityColor(message.priority)}>
              {message.priority?.toUpperCase()}
            </Badge>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ViewMessageDialog;
