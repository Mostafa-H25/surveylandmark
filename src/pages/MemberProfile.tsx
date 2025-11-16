// import { memberData } from "@/assets/data";
import { getMemberByIdApi } from "@/api/projects/get-member-by-id.api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { formatCamelCaseToText } from "@/helpers/formatCamelCaseToText";
import { formatDate } from "@/helpers/formatDate";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeft, CircleSlash, ListTodo, User } from "lucide-react";
import { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

const MEMBER_QUERY_KEY = "member";

const MemberProfile = () => {
  const navigate = useNavigate();
  const { projectId, memberId } = useParams();
  const { data: member, isFetching } = useQuery({
    queryKey: [MEMBER_QUERY_KEY, projectId, memberId],
    enabled: !!projectId && !!memberId,
    queryFn: () => getMemberByIdApi(projectId!, memberId!),
    select: useCallback((data: MemberQueryResponse) => {
      return {
        id: data.member.id,
        name: data.member.personalData.fullName,
        // fullName: data.member.personalData.fullName,
        role: data.member.role,
        email: data.member.personalData.email,
        phone: data.member.personalData.phone,
        title: data.member.personalData.title,
        image: data.member.personalData.image,
        joinDate: data.member.joinDate,
        permissions: data.member.permissions,
        responsibilities: data.member.personalData.responsibilities,
        avatar: {
          initials: data.member.avatar.initials,
          url: data.member.avatar.url,
        },
        currentProject: {
          id: data.member.currentProject.id,
          name: data.member.currentProject.name,
          startDate: data.member.currentProject.startDate,
          endDate: data.member.currentProject.endDate,
          description: data.member.currentProject.description,
        },
      };
    }, []),
  });

  if (isFetching && !member) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (!member) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CircleSlash color="#4a5565 " />
          </EmptyMedia>
          <EmptyTitle>No data</EmptyTitle>
          <EmptyDescription>No data found</EmptyDescription>
        </EmptyHeader>
        <EmptyContent>{/* <Button>Add data</Button> */}</EmptyContent>
      </Empty>
    );
  }
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
            <div className="flex size-16 items-center justify-center rounded-full bg-blue-100">
              <span className="font-medium text-blue-600">
                {member?.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold whitespace-nowrap text-gray-900">
                {member?.name}
              </p>
              <p className="text-lg text-gray-500 capitalize">
                {formatCamelCaseToText(member?.role)}
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="size-5 text-blue-600" />
              Personal Data
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm lg:grid-cols-1">
            <div className="space-y-2">
              <p className="text-gray-600">Name</p>
              <p className="font-semibold text-gray-900">{member.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Email</p>
              <p className="font-semibold text-gray-900">{member.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Phone</p>
              <p className="font-semibold text-gray-900">{member.phone}</p>
            </div>
            {/* <div className="space-y-2">
              <p className="text-gray-600">Financial Limit</p>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {member.financialLimit.amount}
                </p>
                <p className="text-sm text-gray-600">
                  Authorized by:&nbsp;
                  <span className="font-semibold">
                    {member.financialLimit.authorizedBy}
                  </span>
                </p>
              </div>
            </div> */}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ListTodo className="size-5 text-blue-600" />
              Current Project
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm lg:grid-cols-1">
            <div className="space-y-2">
              <div className="">
                <p className="font-semibold text-gray-900 capitalize">
                  {member.currentProject.name}
                </p>
                {/* <p className="text-gray-900">
                  {member.currentProject.location}
                </p> */}
                <p className="text-gray-900">
                  {formatDate(member.currentProject.startDate)}&nbsp;-&nbsp;
                  {formatDate(member.currentProject.endDate)}
                </p>
                <p className="text-gray-900">
                  {member.currentProject.description}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Responsibilities</p>
              {member.responsibilities.map((responsibility, index) => (
                <p key={responsibility} className="font-semibold text-gray-900">
                  {index + 1}. {responsibility}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ListTodo className="size-5 text-blue-600" />
              Responsibilities
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm lg:grid-cols-1">
            <div className="space-y-2">
              {member.responsibilities.map((responsibility) => (
                <p key={responsibility} className="font-semibold text-gray-900">
                  {responsibility}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ListTodo className="size-5 text-blue-600" />
              Permissions
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm lg:grid-cols-1">
            <div className="space-y-2">
              {member.permissions.map((permissions) => (
                <p key={permissions} className="font-semibold text-gray-900">
                  {permissions}
                </p>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default MemberProfile;

type MemberQueryResponse = {
  message: string;
  member: {
    id: string;
    name: string;
    role: string;
    avatar: { initials: string; url: string };
    personalData: {
      fullName: string;
      email: string;
      phone: string;
      title: string;
      image: string;
      responsibilities: string[];
    };
    security: { passwordChangedAt: string; lastChangedDays: string };
    currentProject: {
      id: string;
      name: string;
      startDate: string;
      endDate: string;
      description: string;
    };
    permissions: string[];
    joinDate: string;
  };
};
