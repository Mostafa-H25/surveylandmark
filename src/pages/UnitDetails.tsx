import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  Building,
  MapPin,
  User,
  FileText,
  CreditCard,
  TrendingUp,
} from "lucide-react";

// Extended sample data with detailed unit information
const unitsData: { [key: string]: any } = {
  "1": {
    id: 1,
    name: "Sunset Plaza A-101",
    building: "Sunset Plaza",
    floor: 1,
    model: "Studio Deluxe",
    type: "Residential",
    category: "Sold",
    salesManager: "Sarah Johnson",
    salesAgent: "Mike Chen",
    income: 85000,
    paymentMethod: "Installments",
    downpayment: 25500,
    installments: [
      { month: 1, amount: 4958.33, dueDate: "2024-01-15", status: "Paid" },
      { month: 2, amount: 4958.33, dueDate: "2024-02-15", status: "Paid" },
      { month: 3, amount: 4958.33, dueDate: "2024-03-15", status: "Paid" },
      { month: 4, amount: 4958.33, dueDate: "2024-04-15", status: "Pending" },
      { month: 5, amount: 4958.33, dueDate: "2024-05-15", status: "Pending" },
      { month: 6, amount: 4958.33, dueDate: "2024-06-15", status: "Pending" },
      { month: 7, amount: 4958.33, dueDate: "2024-07-15", status: "Pending" },
      { month: 8, amount: 4958.33, dueDate: "2024-08-15", status: "Pending" },
      { month: 9, amount: 4958.33, dueDate: "2024-09-15", status: "Pending" },
      { month: 10, amount: 4958.33, dueDate: "2024-10-15", status: "Pending" },
      { month: 11, amount: 4958.33, dueDate: "2024-11-15", status: "Pending" },
      { month: 12, amount: 4958.33, dueDate: "2024-12-15", status: "Pending" },
    ],
  },
  "2": {
    id: 2,
    name: "Ocean View B-205",
    building: "Ocean View Tower",
    floor: 2,
    model: "Two Bedroom",
    type: "Residential",
    category: "Sold",
    salesManager: "David Wilson",
    salesAgent: "Lisa Park",
    income: 125000,
    paymentMethod: "Installments",
    downpayment: 37500,
    installments: [
      { month: 1, amount: 7291.67, dueDate: "2024-01-15", status: "Paid" },
      { month: 2, amount: 7291.67, dueDate: "2024-02-15", status: "Paid" },
      { month: 3, amount: 7291.67, dueDate: "2024-03-15", status: "Paid" },
      { month: 4, amount: 7291.67, dueDate: "2024-04-15", status: "Pending" },
      { month: 5, amount: 7291.67, dueDate: "2024-05-15", status: "Pending" },
      { month: 6, amount: 7291.67, dueDate: "2024-06-15", status: "Pending" },
      { month: 7, amount: 7291.67, dueDate: "2024-07-15", status: "Pending" },
      { month: 8, amount: 7291.67, dueDate: "2024-08-15", status: "Pending" },
      { month: 9, amount: 7291.67, dueDate: "2024-09-15", status: "Pending" },
      { month: 10, amount: 7291.67, dueDate: "2024-10-15", status: "Pending" },
      { month: 11, amount: 7291.67, dueDate: "2024-11-15", status: "Pending" },
      { month: 12, amount: 7291.67, dueDate: "2024-12-15", status: "Pending" },
    ],
  },
  "3": {
    id: 3,
    name: "Commerce Hub C-301",
    building: "Commerce Hub",
    floor: 3,
    model: "Office Suite",
    type: "Commercial",
    category: "Rent",
    salesManager: "Robert Brown",
    salesAgent: "Emma Davis",
    income: 95000,
    paymentMethod: null,
    downpayment: null,
    installments: [],
  },
  "4": {
    id: 4,
    name: "Admin Center D-102",
    building: "Admin Center",
    floor: 1,
    model: "Executive Office",
    type: "Administrative",
    category: "Reserved",
    salesManager: "Jennifer Lee",
    salesAgent: "Alex Thompson",
    income: 110000,
    paymentMethod: null,
    downpayment: null,
    installments: [],
  },
  "5": {
    id: 5,
    name: "Sunset Plaza A-205",
    building: "Sunset Plaza",
    floor: 2,
    model: "One Bedroom",
    type: "Residential",
    category: "Sold",
    salesManager: "Sarah Johnson",
    salesAgent: "Kevin Rodriguez",
    income: 75000,
    paymentMethod: "Cash",
    downpayment: null,
    installments: [],
  },
};

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

const UnitDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const unit = id ? unitsData[id] : null;

  if (!unit) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-6">
        <div className="text-center">
          <h1 className="mb-4 text-2xl font-bold text-gray-900">
            Unit Not Found
          </h1>
          <Button
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="size-4" />
            Back to Properties
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="mb-4 hover:bg-white hover:shadow-sm"
          >
            <ArrowLeft className="mr-2 size-4" />
            Back to Properties
          </Button>

          <div className="mb-2 flex items-center gap-3">
            <Building className="h-8 w-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">{unit.name}</h1>
          </div>
          <p className="text-lg text-gray-600">
            {unit.building} - {unit.model}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Details */}
          <div className="space-y-6 lg:col-span-2">
            {/* Basic Information */}
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50/50">
                <CardTitle className="flex items-center gap-2">
                  <Building className="h-5 w-5 text-gray-600" />
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
                        Model
                      </label>
                      <p className="text-lg font-semibold text-gray-900">
                        {unit.model}
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
                        <Badge className={getCategoryColor(unit.category)}>
                          {unit.category}
                        </Badge>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Income
                      </label>
                      <p className="text-lg font-bold text-green-600">
                        ${unit.income.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Sales Team */}
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50/50">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-gray-600" />
                  Sales Team
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">
                      Sales Manager
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {unit.salesManager}
                        </p>
                        <p className="text-sm text-gray-500">Manager</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-500">
                      Sales Agent
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                        <User className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">
                          {unit.salesAgent}
                        </p>
                        <p className="text-sm text-gray-500">Agent</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Payment Information */}
            {unit.category === "Sold" && (
              <Card className="border-0 bg-white shadow-lg">
                <CardHeader className="border-b border-gray-200 bg-gray-50/50">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5 text-gray-600" />
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
                            unit.paymentMethod === "Cash"
                              ? "border-green-200 bg-green-100 text-green-800"
                              : "border-blue-200 bg-blue-100 text-blue-800"
                          }
                        >
                          {unit.paymentMethod}
                        </Badge>
                      </div>
                    </div>

                    {unit.paymentMethod === "Installments" &&
                      unit.downpayment && (
                        <div>
                          <label className="text-sm font-medium text-gray-500">
                            Down Payment
                          </label>
                          <p className="text-lg font-bold text-blue-600">
                            ${unit.downpayment.toLocaleString()}
                          </p>
                        </div>
                      )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50/50">
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-gray-600" />
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
                  <Badge className={getCategoryColor(unit.category)}>
                    {unit.category}
                  </Badge>
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Value</span>
                  <span className="font-bold text-green-600">
                    ${unit.income.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Location Info */}
            <Card className="border-0 bg-white shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50/50">
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-gray-600" />
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

        {/* Installments Table */}
        {unit.category === "Sold" &&
          unit.paymentMethod === "Installments" &&
          unit.installments.length > 0 && (
            <Card className="mt-6 border-0 bg-white shadow-lg">
              <CardHeader className="border-b border-gray-200 bg-gray-50/50">
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-gray-600" />
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
                      {unit.installments.map((installment: any) => (
                        <tr
                          key={installment.month}
                          className="hover:bg-gray-50"
                        >
                          <td className="px-6 py-4 text-sm font-medium whitespace-nowrap text-gray-900">
                            Month {installment.month}
                          </td>
                          <td className="px-6 py-4 text-sm font-semibold whitespace-nowrap text-gray-900">
                            ${installment.amount.toLocaleString()}
                          </td>
                          <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                            {installment.dueDate}
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
