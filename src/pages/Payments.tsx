import { useState } from "react";
import { Search, MoreHorizontal, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { AddPaymentDialog } from "@/components/pages/payments/AddPaymentDialog";
import { paymentData } from "@/assets/data";
import { formatCurrency } from "@/helpers/formatCurrency";

interface PaymentData {
  id: number;
  client: string;
  project: string;
  paymentAmount: number;
  dueDate: string;
  status: "pending" | "received" | "overdue";
  isActive: boolean;
}

const Payments = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [payments, setPayments] = useState<PaymentData[]>(paymentData);

  const handleAddPayment = (
    newPayment: Omit<PaymentData, "id" | "isActive">,
  ) => {
    const payment: PaymentData = {
      ...newPayment,
      id: Math.max(...payments.map((p) => p.id)) + 1,
      isActive: true,
    };
    setPayments((prev) => [...prev, payment]);
  };

  const handleMarkReceived = (id: number) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id
          ? { ...payment, status: "received" as const }
          : payment,
      ),
    );
  };

  const handleDeactivateProject = (id: number) => {
    setPayments((prev) =>
      prev.map((payment) =>
        payment.id === id ? { ...payment, isActive: false } : payment,
      ),
    );
  };

  const filteredPayments = payments.filter((payment) => {
    const matchesSearch =
      payment.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      payment.project.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || payment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "received":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "overdue":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="rounded-lg bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 p-6">
          <div className="mb-2 flex items-start justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                Payment Management
              </h1>
              <p className="mt-1 text-gray-600">
                Track payments, due dates, and project status.
              </p>
            </div>
            <AddPaymentDialog onAddPayment={handleAddPayment} />
          </div>
        </div>

        {/* Filters */}
        <div className="border-b border-gray-200 p-6">
          <div className="flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 transform text-gray-400" />
              <Input
                placeholder="Search by client or project..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="received">Received</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="font-semibold text-gray-900">
                  Client
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Project
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Payment Amount
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Due Date
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-900">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPayments.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                        <span className="text-sm font-medium text-blue-600">
                          {payment.client
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {payment.client}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-700">{payment.project}</span>
                    {!payment.isActive && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(payment.paymentAmount)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-700">
                      {formatDate(payment.dueDate)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={`${getPaymentStatusColor(payment.status)} border-0`}
                    >
                      {payment.status.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-between gap-2">
                      <div className="grid grid-cols-2 items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          disabled={payment.status === "received"}
                          onClick={() => handleMarkReceived(payment.id)}
                          className="border-green-200 text-green-600 hover:bg-green-50"
                        >
                          <Check className="mr-1 size-4" />
                          Received
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          disabled={!payment.isActive}
                          onClick={() => handleDeactivateProject(payment.id)}
                          className="col-start-2 border-red-200 text-red-600 hover:bg-red-50"
                        >
                          <X className="mr-1 size-4" />
                          Deactivate
                        </Button>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreHorizontal className="size-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Edit Payment</DropdownMenuItem>
                          <DropdownMenuItem>Send Reminder</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {filteredPayments.length} of {payments.length} payments
            </span>
            <div className="flex gap-4">
              <span>
                Total Pending:{" "}
                {formatCurrency(
                  filteredPayments
                    .filter((p) => p.status === "pending")
                    .reduce((sum, p) => sum + p.paymentAmount, 0),
                )}
              </span>
              <span>
                Total Received:{" "}
                {formatCurrency(
                  filteredPayments
                    .filter((p) => p.status === "received")
                    .reduce((sum, p) => sum + p.paymentAmount, 0),
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;
