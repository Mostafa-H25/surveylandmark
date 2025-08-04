import { memberData } from "@/assets/data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, ListTodo, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const MemberProfile = () => {
  const navigate = useNavigate();

  return (
    <main className="space-y-6">
      <header className="rounded-md border border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate(-1)}
            className="rounded-md p-1 hover:bg-gray-100"
          >
            <ArrowLeft className="size-5 text-gray-600" />
          </button>
          <div className="flex h-auto w-full items-center justify-start space-x-3 p-2">
            <div className="flex size-16 items-center justify-center rounded-full bg-blue-100">
              <span className="font-medium text-blue-600">
                {memberData?.name.charAt(0)}
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold whitespace-nowrap text-gray-900">
                {memberData?.name}
              </p>
              <p className="text-lg text-gray-500 capitalize">
                {memberData?.position.replaceAll("_", " ")}
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <User className="size-5 text-blue-600" />
              Personal Data
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm lg:grid-cols-2">
            <div className="space-y-2">
              <p className="text-gray-600">Name</p>
              <p className="font-semibold text-gray-900">{memberData.name}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Email</p>
              <p className="font-semibold text-gray-900">{memberData.email}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Phone</p>
              <p className="font-semibold text-gray-900">{memberData.phone}</p>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Financial Limit</p>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {memberData.financialLimit.amount}
                </p>
                <p className="text-sm text-gray-600">
                  Authorized by:&nbsp;
                  <span className="font-semibold">
                    {memberData.financialLimit.authorizedBy}
                  </span>
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <ListTodo className="size-5 text-blue-600" />
              Current Project
            </CardTitle>
          </CardHeader>
          <CardContent className="grid gap-4 text-sm lg:grid-cols-2">
            <div className="space-y-2">
              <div className="">
                <p className="font-semibold text-gray-900">
                  {memberData.currentProject.title}
                </p>
                <p className="text-gray-900">
                  {memberData.currentProject.location}
                </p>
                <p className="text-gray-900">
                  {memberData.currentProject.duration}
                </p>
                <p className="text-gray-900">
                  {memberData.currentProject.description}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-gray-600">Responsibilities</p>
              {memberData.responsibilities.map((responsibility, index) => (
                <p key={responsibility} className="font-semibold text-gray-900">
                  {index + 1}. {responsibility}
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
