import { useCallback, useState } from "react";

import { CheckCircle, CircleSlash, Search, Send } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
// import { internalMessages } from "@/assets/data";
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

import { toast } from "sonner";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { getAllMessagesApi } from "@/api/messages/get-all-messages.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { sendMessageApi } from "@/api/messages/send-message.api";
import { getAllUsersApi } from "@/api/user/get-all-users.api";
import { Badge } from "@/components/ui/badge";
import { getPriorityColor } from "@/helpers/getPriorityColor";
import ViewMessageDialog from "../dialogs/ViewMessageDialog";
import { Label } from "@/components/ui/label";
import { validateEmptyAfterTrim } from "@/helpers/formValidators";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { messagePriority } from "@/constants/defaults";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/lib/store/use-auth-store";
import type { Priority } from "@/types/default";
import { markMessageAsReadApi } from "@/api/messages/mark-message-as-read.api";
import { formatDate } from "@/helpers/formatDate";
import { defaultErrorToast } from "@/helpers/defaultErrorToast";
import { useDebounce } from "@/hooks/use-debounce";
import Paginator from "@/components/shared/Paginator";

const USERS_QUERY_KEY = "users";
const MESSAGES_QUERY_KEY = "messages";
const SEND_MESSAGE_MUTATION_KEY = "message_send";
const MARK_AS_READ_MESSAGE_MUTATION_KEY = "message_mark_as_read";

const MessagingTab = () => {
  const queryClient = useQueryClient();
  const user = useAuthStore((state) => state.user);
  const [paginator, setPaginator] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm);
  const { data: messages, isFetching: isFetchingMessages } = useQuery({
    queryKey: [MESSAGES_QUERY_KEY, paginator.page, debouncedSearchTerm],
    queryFn: () =>
      getAllMessagesApi({
        pagination: { page: paginator.page, limit: paginator.limit },
        filters: { search: debouncedSearchTerm },
      }),
    select: useCallback((data: MessagesQueryResponse) => {
      return data.messages.map((message) => ({
        id: message._id,
        from: message.from.name,
        // to: message.toUsers[0],
        subject: message.subject,
        body: message.body,
        priority: message.priority,
        createdAt: message.createdAt,
        status: message.status,
        isRead: message.isRead,
      }));
    }, []),
  });
  const { data: users, isFetching: isFetchingUsers } = useQuery({
    queryKey: [USERS_QUERY_KEY],
    queryFn: () => getAllUsersApi(),
    select: useCallback((data: UsersQueryResponse) => {
      return data.users
        .filter((option) => option.email !== user?.email)
        .map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
        }));
    }, []),
  });

  const defaultValues = {
    to: "",
    subject: "",
    body: "",
    priority: "normal",
  };

  const form = useForm({ defaultValues, mode: "onBlur" });
  const { control, handleSubmit, reset } = form;

  const { mutate: sendMessage, isPending: IsPendingSubmit } = useMutation({
    mutationFn: (data: typeof defaultValues) => sendMessageApi(data),
    scope: { id: SEND_MESSAGE_MUTATION_KEY },
    onSuccess: (data) => {
      toast.success("Message Sent", {
        description: `${data.subject} to ${data.to} has been sent successfully.`,
        richColors: true,
      });
      queryClient.invalidateQueries({ queryKey: [MESSAGES_QUERY_KEY] });
      reset();
    },
    onError: (error) => {
      console.error(error);
      defaultErrorToast(error.message);
    },
  });
  const { mutate: markAsRead } = useMutation({
    mutationFn: (data: { id: string; isRead: boolean }) =>
      markMessageAsReadApi(data),
    scope: { id: MARK_AS_READ_MESSAGE_MUTATION_KEY },
    onSuccess: () => {
      toast("Message Updated", {
        description: "Message marked as read.",
        richColors: true,
      });
      queryClient.invalidateQueries({ queryKey: [MESSAGES_QUERY_KEY] });
    },
    onError: (error) => {
      console.error(error);
      defaultErrorToast(error.message);
    },
  });

  const onSubmit: SubmitHandler<typeof defaultValues> = async (data) => {
    sendMessage(data);
  };

  const handleMarkAsRead = (messageId: string) => {
    markAsRead({ id: messageId, isRead: true });
  };
  return (
    <TabsContent value="messages" className="space-y-6">
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
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <Controller
                name="to"
                control={control}
                rules={{
                  required: "Recipient field is required.",
                  validate: {
                    isEmpty: (value) =>
                      validateEmptyAfterTrim(value, "Recipient"),
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Recipient
                      </Label>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id={field.name} className="capitalize">
                          <SelectValue placeholder="Select recipient..." />
                        </SelectTrigger>
                        <SelectContent>
                          {isFetchingUsers && users && (
                            <div className="flex h-full w-full items-center justify-center">
                              <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
                            </div>
                          )}
                          {users?.map((user) => (
                            <SelectItem
                              key={user.id}
                              value={user.id.toString()}
                              className="flex items-center gap-2 capitalize"
                            >
                              <span className="px-2">{user.name}</span>
                              <span className="text-xs text-gray-500 lowercase">
                                &lt;{user.email}&gt;
                              </span>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {error && (
                      <span className="text-xs text-red-500">
                        {error?.message}
                      </span>
                    )}
                  </div>
                )}
              />
              <Controller
                name="priority"
                control={control}
                rules={{
                  required: "Priority field is required.",
                  validate: {
                    isEmpty: (value) =>
                      validateEmptyAfterTrim(value, "Priority"),
                  },
                }}
                render={({ field, fieldState: { error } }) => (
                  <div>
                    <div className="flex flex-col gap-2">
                      <Label
                        htmlFor={field.name}
                        className="block text-sm font-medium text-gray-700"
                      >
                        Priority
                      </Label>
                      <Select
                        name={field.name}
                        value={field.value}
                        onValueChange={field.onChange}
                      >
                        <SelectTrigger id={field.name} className="capitalize">
                          <SelectValue placeholder="Select recipient..." />
                        </SelectTrigger>
                        <SelectContent>
                          {messagePriority?.map((priority) => (
                            <SelectItem
                              key={priority}
                              value={priority}
                              className="capitalize"
                            >
                              {priority}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    {error && (
                      <span className="text-xs text-red-500">
                        {error?.message}
                      </span>
                    )}
                  </div>
                )}
              />
            </div>
            <Controller
              name="subject"
              control={control}
              rules={{
                required: "Subject field is required.",
                validate: {
                  isEmpty: (value) => validateEmptyAfterTrim(value, "Subject"),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={field.name} className="text-sm font-medium">
                      Subject
                    </Label>
                    <Input
                      {...field}
                      id={field.name}
                      type="text"
                      placeholder="Message subject..."
                      className={cn("m-0 border", { "border-red-500": error })}
                      required
                    />
                  </div>
                  {error && (
                    <span className="text-xs text-red-500">
                      {error?.message}
                    </span>
                  )}
                </div>
              )}
            />
            <Controller
              name="body"
              control={control}
              rules={{
                required: "Message field is required.",
                validate: {
                  isEmpty: (value) => validateEmptyAfterTrim(value, "Message"),
                },
              }}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor={field.name} className="text-sm font-medium">
                      Message
                    </Label>
                    <Textarea
                      {...field}
                      id={field.name}
                      placeholder="Type your message here..."
                      className={cn(
                        "m-0 w-full rounded-md border border-gray-300 p-3",
                        { "border-red-500": error },
                      )}
                      required
                    />
                  </div>
                  {error && (
                    <span className="text-xs text-red-500">
                      {error?.message}
                    </span>
                  )}
                </div>
              )}
            />

            <Button className="w-40 cursor-pointer bg-blue-600 hover:bg-blue-700">
              {IsPendingSubmit ? (
                <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
              ) : (
                <>
                  <Send className="mr-2 size-4" />
                  <span>Send Message</span>
                </>
              )}
            </Button>
          </form>
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
                {/* <TableHead>To</TableHead> */}
                <TableHead>Subject</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetchingMessages && !messages && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    <div className="flex h-full w-full items-center justify-center p-8">
                      <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {!isFetchingMessages && !messages?.length && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    <Empty>
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <CircleSlash color="#4a5565 " />
                        </EmptyMedia>
                        <EmptyTitle>No data</EmptyTitle>
                        <EmptyDescription>No data found</EmptyDescription>
                      </EmptyHeader>
                      <EmptyContent>
                        {/* <Button>Add data</Button> */}
                      </EmptyContent>
                    </Empty>
                  </TableCell>
                </TableRow>
              )}
              {messages?.map((message) => (
                <TableRow
                  key={message.id}
                  className={message.status === "unread" ? "bg-blue-50" : ""}
                >
                  <TableCell className="font-medium">{message.from}</TableCell>
                  {/* <TableCell>{message.to}</TableCell> */}
                  <TableCell>
                    <div>
                      <div className="font-medium">{message.subject}</div>
                      <div className="max-w-xs truncate text-sm text-gray-500">
                        {message.body}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getPriorityColor(message.priority)}>
                      {message.priority?.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-gray-500">
                    {formatDate(message.createdAt)}
                  </TableCell>
                  <TableCell>
                    <Badge variant={message.isRead ? "default" : "secondary"}>
                      {message.isRead ? "Read" : "Unread"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <ViewMessageDialog message={message} />
                      {!message.isRead && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="cursor-pointer"
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
          <Paginator paginator={paginator} setPaginator={setPaginator} />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default MessagingTab;

type MessagesQueryResponse = {
  message: string;
  success: boolean;
  count: 0;
  messages: {
    _id: string;
    from: { name: string; title: string; id: string };
    toUsers: string[];
    subject: string;
    body: string;
    priority: Priority;
    createdAt: string;
    status: string;
    isRead: boolean;
  }[];
};

type UsersQueryResponse = {
  message: string;
  success: boolean;
  total: number;
  users: {
    id: string;
    name: string;
    email: string;
    // phone: string;
    // role: string;
    // permmisions: string;
    // canEdit: true;
    // status: string;
    // title: string;
    // createdAt: string;
    // projects: [];
  }[];
};
