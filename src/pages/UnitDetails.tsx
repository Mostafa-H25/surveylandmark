import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Building,
  MapPin,
  FileText,
  CreditCard,
  TrendingUp,
  User,
  UserCog,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";
import { getUnitById } from "@/api/projects/get-unit-by-id.api";
import { formatCurrency } from "@/helpers/formatCurrency";
import { formatPhoneNumber } from "@/helpers/formatPhoneNumber";
import { formatDate } from "@/helpers/formatDate";

const getCategoryColor = (category: string) => {
  switch (category.toLowerCase()) {
    case "available":
      return "bg-green-100 text-green-800 border-green-200";
    case "sold":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "rent":
      return "bg-orange-100 text-orange-800 border-orange-200";
    case "reserved":
      return "bg-purple-100 text-purple-800 border-purple-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "residential":
      return "bg-emerald-100 text-emerald-800 border-emerald-200";
    case "commercial":
      return "bg-amber-100 text-amber-800 border-amber-200";
    case "administrative":
      return "bg-indigo-100 text-indigo-800 border-indigo-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getInstallmentStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "paid":
      return "bg-green-100 text-green-800 border-green-200";
    case "pending":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "overdue":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const UNIT_QUERY_KEY = "unit";

const UnitDetails = () => {
  const { projectId, unitId } = useParams();
  const navigate = useNavigate();

  const { data: unit, isFetching } = useQuery({
    queryKey: [UNIT_QUERY_KEY, projectId, unitId],
    queryFn: () => getUnitById(projectId!, unitId!),
    select: useCallback((data: UnitQueryResponse) => {
      return {
        id: data.unitInfo.id,
        name: data.unitInfo.name,
        type: data.unitInfo.type,
        status: data.unitInfo.status,
        building: data.unitInfo.building,
        floor: data.unitInfo.floor,
        income: data.paymentInfo.totalPrice,
        paymentMethod: data.paymentInfo.paymentMethod,
        downPayment: data.paymentInfo.downPayment,
        salesTeam: data.sellers,
        client: data.clientInfo,
        installments: data.schedule,
      };
    }, []),
  });

  if (isFetching && !unit) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (!unit) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Unit Not Found
          </h1>
          <Button
            onClick={() => navigate(-1)}
            className="flex cursor-pointer items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate(-1)}
            className="mb-4 cursor-pointer hover:bg-white hover:shadow-sm"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back
          </Button>

          <div className="mb-2 flex items-center gap-3">
            <Building className="size-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">{unit.name}</h1>
          </div>
          <p className="text-lg text-gray-600">
            {unit.building} - {unit.floor}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50/50">
                <CardTitle className="flex items-center gap-2">
                  <Building className="size-5 text-gray-600" />
                  Unit Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Building
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        {unit.building}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Floor
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        Floor {unit.floor}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Unit Name
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        {unit.name}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Type
                      </label>
                      <div className="mt-1">
                        <Badge className={getTypeColor(unit.type)}>
                          {unit.type}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Status
                      </label>
                      <div className="mt-1">
                        <Badge className={getCategoryColor(unit.status)}>
                          {unit.status}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Income
                      </label>
                      <p className="text-lg font-bold text-green-600">
                        {unit?.income ? formatCurrency(unit.income) : ""}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50/50">
                <CardTitle className="flex items-center gap-2">
                  <User className="size-5 text-gray-600" />
                  Sales Team
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  {unit.salesTeam.map((member) => (
                    <div key={member.id} className="space-y-2">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-full bg-blue-100">
                          <User className="size-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-semibold text-gray-900">
                            {member.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {member.email}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50/50">
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="size-5 text-gray-600" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Payment Method
                    </label>
                    <div className="mt-1">
                      <Badge
                        className={
                          unit.paymentMethod === "cash"
                            ? "border-green-200 bg-green-100 text-green-800"
                            : "border-blue-200 bg-blue-100 text-blue-800"
                        }
                      >
                        {unit.paymentMethod}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Down Payment
                    </label>
                    <p className="text-lg font-bold text-blue-600">
                      {unit?.downPayment
                        ? formatCurrency(unit.downPayment)
                        : ""}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50/50">
                <CardTitle className="flex items-center gap-2">
                  <UserCog className="size-5 text-gray-600" />
                  Client Details
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Name
                    </label>
                    <p>{unit.client.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Email
                    </label>
                    <p>{unit.client.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Phone
                    </label>
                    <p>{formatPhoneNumber(unit.client.phone)}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50/50">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="size-5 text-gray-600" />
                  Quick Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 p-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Floor Level</span>
                  <span className="font-semibold">{unit.floor}</span>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Property Type</span>
                  <Badge className={getTypeColor(unit.type)}>{unit.type}</Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Current Status</span>
                  <Badge className={getCategoryColor(unit.status)}>
                    {unit.status}
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Value</span>
                  <span className="font-bold text-green-600">
                    {unit?.income ? formatCurrency(unit.income) : ""}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 bg-white shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50/50">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="size-5 text-gray-600" />
                  Location Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 p-6">
                <div>
                  <label className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Building
                  </label>
                  <p className="text-sm font-semibold text-gray-900">
                    {unit.building}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Floor
                  </label>
                  <p className="text-sm font-semibold text-gray-900">
                    Level {unit.floor}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium tracking-wider text-gray-500 uppercase">
                    Unit
                  </label>
                  <p className="text-sm font-semibold text-gray-900">
                    {unit.name}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {unit.paymentMethod === "installments" &&
          unit?.installments.length > 0 && (
            <Card className="mt-6 border-0 bg-white shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50/50">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="size-5 text-gray-600" />
                  Installment Schedule
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="border-b border-gray-200 bg-gray-50">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                          Month
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                          Amount
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                          Due Date
                        </th>
                        <th className="px-6 py-4 text-left text-xs font-semibold tracking-wider text-gray-600 uppercase">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {unit?.installments?.map((installment) => (
                        <tr
                          key={installment.month}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                            Month {installment.month}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-gray-900">
                            {formatCurrency(installment.amount)}
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                            {formatDate(installment.dueDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <Badge
                              className={getInstallmentStatusColor(
                                installment.status,
                              )}
                            >
                              {installment.status}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          )}
      </div>
    </div>
  );
};

export default UnitDetails;

type UnitQueryResponse = {
  message: string;
  projectId: string;
  unitId: string;
  unitInfo: {
    id: string;
    name: string;
    type: string;
    status: string;
    building: string;
    floor: string;
  };
  clientInfo: { name: string; phone: string; email: string };
  sellers: { id: string; name: string; email: string }[];
  paymentInfo: {
    paymentMethod: string;
    totalPrice: number;
    downPayment: number;
    maintenanceDeposit: number;
    installmentsCount: number;
    installmentValue: number;
  };
  schedule: {
    month: number;
    amount: number;
    dueDate: string;
    status: string;
  }[];
};
