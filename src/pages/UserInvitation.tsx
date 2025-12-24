import { getAllInvitedUsersApi } from "@/api/user/get-all-invited-users.api";
import UserForm from "@/components/shared/forms/UserForm";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { roleHierarchy } from "@/constants/defaults";
import { formatCamelCaseToText } from "@/helpers/formatCamelCaseToText";
import { formatDate } from "@/helpers/formatDate";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, Check, CircleSlash, FileText, Mail } from "lucide-react";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";

const INVITED_USERS_QUERY_KEY = "invited-Users";

const UserInvitation = () => {
  const navigate = useNavigate();

  const { data: users, isFetching: isFetchingUsers } = useQuery({
    queryKey: [INVITED_USERS_QUERY_KEY],
    queryFn: () => getAllInvitedUsersApi(),
    select: useCallback((data: InvitedUsersQueryResponse) => {
      return data;
    }, []),
  });

  return (
    <main className="space-y-6">
      <header className="space-y-2 py-4">
        <button
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-2 rounded-md px-2 py-1 hover:bg-gray-100"
        >
          <ArrowLeft className="size-5 text-gray-600" />
          <span className="text-sm font-semibold">back</span>
        </button>
        <div className="flex items-center gap-4 rounded-md border border-gray-200 bg-white px-6">
          <div className="flex h-auto w-full items-center justify-start space-x-3 p-2">
            <FileText className="size-12 rounded-full bg-blue-600 p-3 text-white" />

            <div>
              <p className="text-2xl font-bold whitespace-nowrap text-gray-900">
                Invite Team Members
              </p>
              <p className="text-gray-500 capitalize">LANDMARK Projects</p>
            </div>
          </div>
        </div>
      </header>
      <div className="flex w-full gap-8">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
              <Mail className="size-5 text-blue-600" />
              Send Invitation
            </CardTitle>
            <CardDescription className="text-sm">
              Invite new team members to join your organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <UserForm />
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl font-semibold">
              <Check className="size-5 text-green-600" />
              Recent Invitation
            </CardTitle>
            <CardDescription className="text-sm">
              Users you've recently invited to the organization
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isFetchingUsers && !users && (
              <div className="flex h-full w-full items-center justify-center">
                <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
              </div>
            )}
            {!isFetchingUsers && !users?.length && (
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
            )}
            {users?.map((user) => (
              <div
                key={user.date}
                className="w-full space-y-1 rounded-md border border-[#E2E8F0] px-6 py-4 shadow-md"
              >
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-semibold capitalize">
                    {user.name}
                  </span>
                  <Badge
                    className={cn(
                      "text-sm font-semibold capitalize",
                      user?.role
                        ? roleHierarchy[user?.role]?.color
                        : "bg-gray-500 text-gray-700",
                    )}
                  >
                    {user?.role &&
                      formatCamelCaseToText(user.role).toUpperCase()}
                  </Badge>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="lowercase">{user.email}</span>
                  <span className="px-3 capitalize">{user.status}</span>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <span className="text-xs">
                    {user?.date && formatDate(user.date)}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default UserInvitation;

type InvitedUsersQueryResponse = [
  {
    name: string;
    role: string;
    status: string;
    date: string;
    email: string;
  },
];
