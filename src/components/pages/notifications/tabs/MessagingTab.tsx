import { useState } from "react";

import { CheckCircle, Search, Send } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { internalMessages } from "@/assets/data";
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

import ViewMessageDialog from "../dialogs/ViewMessageDialog";

const MessagingTab = () => {
  const { toast } = useToast();

  const [searchTerm, setSearchTerm] = useState("");
  const [newMessage, setNewMessage] = useState({
    to: "",
    subject: "",
    message: "",
    priority: "normal",
  });

  const handleSendMessage = () => {
    if (!newMessage.to || !newMessage.subject || !newMessage.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully.",
    });

    setNewMessage({
      to: "",
      subject: "",
      message: "",
      priority: "normal",
    });
  };

  const handleMarkAsRead = (messageId: number) => {
    toast({
      title: "Message Updated",
      description: "Message marked as read.",
    });
  };

  return (
    <TabsContent value="messaging" className="space-y-6">
      {/* New Message Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Send className="size-5 text-blue-600" />
            Send New Message
          </CardTitle>
          <CardDescription>
            Send message to individuals or teams
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="text-sm font-medium">To:</label>
              <Input
                placeholder="Select recipient..."
                value={newMessage.to}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, to: e.target.value })
                }
              />
            </div>
            <div>
              <label className="text-sm font-medium">Priority:</label>
              <select
                className="w-full rounded-md border border-gray-300 p-2"
                value={newMessage.priority}
                onChange={(e) =>
                  setNewMessage({ ...newMessage, priority: e.target.value })
                }
              >
                <option value="normal">Normal</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>
          </div>
          <div>
            <label className="text-sm font-medium">Subject:</label>
            <Input
              placeholder="Message subject..."
              value={newMessage.subject}
              onChange={(e) =>
                setNewMessage({ ...newMessage, subject: e.target.value })
              }
            />
          </div>
          <div>
            <label className="text-sm font-medium">Message:</label>
            <textarea
              className="h-32 w-full rounded-md border border-gray-300 p-3"
              placeholder="Type your message here..."
              value={newMessage.message}
              onChange={(e) =>
                setNewMessage({ ...newMessage, message: e.target.value })
              }
            />
          </div>
          <Button
            onClick={handleSendMessage}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Send className="mr-2 size-4" />
            Send Message
          </Button>
        </CardContent>
      </Card>

      {/* Messages List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Messages</CardTitle>
              <CardDescription>Internal team communications</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  placeholder="Search messages..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-64 pl-10"
                />
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>From</TableHead>
                <TableHead>To</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {internalMessages.map((message) => (
                <TableRow
                  key={message.id}
                  className={message.status === "unread" ? "bg-blue-50" : ""}
                >
                  <TableCell className="font-medium">{message.from}</TableCell>
                  <TableCell>{message.to}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{message.subject}</div>
                      <div className="max-w-xs truncate text-sm text-gray-500">
                        {message.message}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(message.priority)}>
                      {message.priority.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {message.timestamp}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        message.status === "read" ? "default" : "secondary"
                      }
                    >
                      {message.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <ViewMessageDialog message={message} />
                      {message.status === "unread" && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleMarkAsRead(message.id)}
                        >
                          <CheckCircle className="mr-1 size-4" />
                          Mark Read
                        </Button>
                      )}
                    </div>
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

export default MessagingTab;
