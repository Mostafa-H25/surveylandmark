// import { AlertTriangle, CheckCircle } from "lucide-react";

// import { alerts as notifications } from "@/assets/data";
// import { toast } from "sonner";
// import { Badge } from "@/components/ui/badge";
// import { Alerts } from "@/constants/defaults";
// import { Button } from "@/components/ui/button";
// import { TabsContent } from "@/components/ui/tabs";
// import { getPriorityColor } from "@/helpers/getPriorityColor";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useQuery } from "@tanstack/react-query";
// import { getAllNotificationsApi } from "@/api/notifications/get-all-notifications.api";
// import { useCallback } from "react";

// import ViewNotificationDialog from "../dialogs/ViewNotificationDialog";

// const NOTIFICATIONS_QUERY_KEY = "notifications";

// const NotificationsTab = () => {
//   const { data: notifications, isFetching: isFetchingNotifications } = useQuery(
//     {
//       queryKey: [NOTIFICATIONS_QUERY_KEY],
//       queryFn: () => getAllNotificationsApi(),
//       select: useCallback((data: NotificationsQueryResponse) => {
//         console.log(data);
//         return data.data.map((notification) => ({
//           id: notification.id,
//           type: notification.type,
//           project: notification.project,
//           status: notification.actionStatus,

//         }));
//       }, []),
//     },
//   );
//   const handleResolveAlert = (alertId: number) => {
//     toast.success("Alert Resolved", {
//       description: "Alert has been marked as resolved.",
//       richColors: true,
//     });
//   };

//   return (
//     <TabsContent value="alerts" className="space-y-6">
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2">
//             <AlertTriangle className="size-5 text-red-600" />
//             System Alerts
//           </CardTitle>
//           <CardDescription>
//             Deadlines, payment approvals, and inventory shortage notifications
//           </CardDescription>
//         </CardHeader>
//         <CardContent>
//           <Table>
//             <TableHeader>
//               <TableRow>
//                 <TableHead>Type</TableHead>
//                 <TableHead>Alert</TableHead>
//                 <TableHead>Project</TableHead>
//                 <TableHead>Priority</TableHead>
//                 <TableHead>Timestamp</TableHead>
//                 <TableHead>Status</TableHead>
//                 <TableHead>Actions</TableHead>
//               </TableRow>
//             </TableHeader>
//             <TableBody>
//               {notifications?.map((notification) => {
//                 const Icon =
//                   Alerts.find((a) => a.value === notification.type)?.icon ||
//                   AlertTriangle;
//                 return (
//                   <TableRow key={notification.id}>
//                     <TableCell>
//                       <div className="flex items-center gap-2">
//                         <Icon className="size-4" />
//                         <span className="capitalize">{notification.type}</span>
//                       </div>
//                     </TableCell>
//                     <TableCell>
//                       <div>
//                         <div className="font-medium">{notification.title}</div>
//                         <div className="text-sm text-gray-500">
//                           {notification.message}
//                         </div>
//                       </div>
//                     </TableCell>
//                     <TableCell>{notification.project.name}</TableCell>
//                     <TableCell>
//                       <Badge
//                         className={getPriorityColor(notification.priority)}
//                       >
//                         {notification.priority.toUpperCase()}
//                       </Badge>
//                     </TableCell>
//                     <TableCell className="text-sm text-gray-500">
//                       {notification.timestamp}
//                     </TableCell>
//                     <TableCell>
//                       <Badge
//                         variant={
//                           notification.status === "active"
//                             ? "default"
//                             : "secondary"
//                         }
//                       >
//                         {notification.status.toUpperCase()}
//                       </Badge>
//                     </TableCell>
//                     <TableCell>
//                       <div className="flex gap-2">
//                         <ViewNotificationDialog alert={notification} />
//                         <Button
//                           variant="outline"
//                           size="sm"
//                           onClick={() => handleResolveAlert(notification.id)}
//                         >
//                           <CheckCircle className="mr-1 size-4" />
//                           Resolve
//                         </Button>
//                       </div>
//                     </TableCell>
//                   </TableRow>
//                 );
//               })}
//             </TableBody>
//           </Table>
//         </CardContent>
//       </Card>
//     </TabsContent>
//   );
// };

// export default NotificationsTab;

// type NotificationsQueryResponse = {
//   message: string;
//   page: number;
//   limit: number;
//   total: number;
//   count: number;
//   data: {
//     id: string;
//     title: string;
//     message: string;
//     type: string;
//     actionStatus: null;
//     isRead: false;
//     createdAt: string;
//     updatedAt: string;
//     user: {
//       id: string;
//       name: string;
//       email: string;
//       title: string;
//     };
//     project: {
//       id: string;
//       name: string;
//     };
//     meta: {
//       projectId: string;
//       role: string;
//       units: {
//         building: string;
//         floor: string;
//         unit: string;
//       }[];
//     };
//   }[];
// };
