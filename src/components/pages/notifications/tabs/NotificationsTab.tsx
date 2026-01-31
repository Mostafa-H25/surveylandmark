import { AlertTriangle, CircleSlash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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
import { useQuery } from "@tanstack/react-query";
import { getAllNotificationsApi } from "@/api/notifications/get-all-notifications.api";
import { useCallback, useEffect, useState } from "react";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import Paginator from "@/components/shared/Paginator";
import { formatDate } from "@/helpers/formatDate";
import { useDebounce } from "@/hooks/use-debounce";

const NOTIFICATIONS_QUERY_KEY = "notifications";

const NotificationsTab = () => {
  const [paginator, setPaginator] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [searchTerm] = useState("");

  const debouncedSearchTerm = useDebounce(searchTerm);

  const { data, isFetching: isFetchingNotifications } = useQuery({
    queryKey: [NOTIFICATIONS_QUERY_KEY, paginator.page, debouncedSearchTerm],
    queryFn: () =>
      getAllNotificationsApi({
        pagination: { page: paginator.page, limit: paginator.limit },
        filters: { search: debouncedSearchTerm },
      }),
    select: useCallback((data: NotificationsQueryResponse) => {
      return {
        meta: { page: data.page, total: data.total },
        notifications: data.data.map((notification) => ({
          id: notification.id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          project: notification.project,
          status: notification.actionStatus,
          createdAt: notification.createdAt,
          updatedAt: notification.updatedAt,
        })),
      };
    }, []),
  });
  const notifications = data?.notifications;

  useEffect(() => {
    if (data?.meta.page) {
      setPaginator((prev) => ({
        ...prev,
        page: data?.meta.page ?? 1,
        total: data?.meta.total ?? 0,
      }));
    }
  }, [data]);

  return (
    <TabsContent value="notifications" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="size-5 text-red-600" />
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
                <TableHead>Timestamp</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isFetchingNotifications && !notifications && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <div className="flex h-full w-full items-center justify-center p-8">
                      <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {!isFetchingNotifications && !notifications?.length && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">
                    <Empty>
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <CircleSlash color="#4a5565 " />
                        </EmptyMedia>
                        <EmptyTitle>No data</EmptyTitle>
                        <EmptyDescription>No data found</EmptyDescription>
                      </EmptyHeader>
                      <EmptyContent></EmptyContent>
                    </Empty>
                  </TableCell>
                </TableRow>
              )}
              {notifications?.map((notification) => {
                const Icon = AlertTriangle;
                return (
                  <TableRow key={notification.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Icon className="size-4" />
                        <span className="capitalize">
                          {notification.type.replaceAll("_", " ")}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{notification.title}</div>
                        <div className="text-sm text-gray-500">
                          {notification.message}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{notification?.project?.name}</TableCell>
                    <TableCell className="text-sm text-gray-500">
                      {formatDate(notification.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          notification.status === "active"
                            ? "default"
                            : "secondary"
                        }
                        className="capitalize"
                      >
                        {notification.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          <Paginator paginator={paginator} setPaginator={setPaginator} />
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default NotificationsTab;

type NotificationsQueryResponse = {
  message: string;
  page: number;
  limit: number;
  total: number;
  count: number;
  data: {
    id: string;
    title: string;
    message: string;
    type: string;
    actionStatus: null;
    isRead: false;
    createdAt: string;
    updatedAt: string;
    user: {
      id: string;
      name: string;
      email: string;
      title: string;
    };
    project: {
      id: string;
      name: string;
    };
    meta: {
      projectId: string;
      role: string;
      units: {
        building: string;
        floor: string;
        unit: string;
      }[];
    };
  }[];
};
