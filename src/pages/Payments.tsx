import { useCallback, useEffect, useState } from "react";
import { Search, Check, X } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import { AddPaymentDialog } from "@/components/pages/payments/AddPaymentDialog";
import { formatCurrency } from "@/helpers/formatCurrency";
import { formatDate } from "@/helpers/formatDate";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllPaymentsApi } from "@/api/payments/get-all-payments.api";
import { toast } from "sonner";
import { updatePaymentStatusApi } from "@/api/payments/update-payment-status.api";
import Paginator from "@/components/shared/Paginator";

const PAYMENTS_QUERY_KEY = "payments";
const UPDATE_PAYMENT_MUTATION_SCOPE = "update-payment-status";

const Payments = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [paginator, setPaginator] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });

  const { data, isFetching: isFetchingPayments } = useQuery({
    queryKey: [PAYMENTS_QUERY_KEY, paginator.page],
    queryFn: () =>
      getAllPaymentsApi({
        pagination: { page: paginator.page, limit: paginator.limit },
      }),
    select: useCallback((data: PaymentsQueryResponse) => {
      return {
        meta: { page: data.page, count: data.count, total: data.total },
        payments: data.data.map((payment) => ({
          id: payment.id,
          amount: payment.amount,
          dueDate: payment.dueDate,
          status: payment.statusStored,
          isActive: payment.isActive,
          client: { id: payment.client.id, name: payment.client.name },
          project: { id: payment.project.id, name: payment.project.name },
        })),
      };
    }, []),
  });
  const payments = data?.payments;

  useEffect(() => {
    if (data?.meta.page) {
      setPaginator((prev) => ({
        ...prev,
        page: data?.meta.page ?? 1,
        total: data?.meta.total ?? 0,
      }));
    }
  }, [data]);

  const { mutate, isPending } = useMutation({
    mutationFn: (data: {
      projectId: string;
      paymentId: string;
      status: string;
    }) => updatePaymentStatusApi(data),
    scope: { id: UPDATE_PAYMENT_MUTATION_SCOPE },
    onSuccess: (_, variables) => {
      toast.success("Payment Added", {
        description: `Payment has been ${variables.status} successfully.`,
        richColors: true,
      });
      queryClient.invalidateQueries({ queryKey: [PAYMENTS_QUERY_KEY] });
    },
    onError: (error) => {
      console.error(error);
      toast.error("Error", {
        description: "An error occurred. Please try again!",
        richColors: true,
      });
    },
  });

  const handleUpdatePaymentStatus = (
    projectId: string,
    paymentId: string,
    status: string,
  ) => {
    mutate({ projectId, paymentId, status });
  };

  // const filteredPayments = payments?.filter((payment) => {
  //   const matchesSearch =
  //     payment.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     payment.project.name.toLowerCase().includes(searchTerm.toLowerCase());
  //   const matchesStatus =
  //     statusFilter === "all" || payment.status === statusFilter;
  //   return matchesSearch && matchesStatus;
  // });

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

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="rounded-lg bg-white shadow-sm">
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
            <AddPaymentDialog />
          </div>
        </div>

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
              {isFetchingPayments && !payments && (
                <TableRow>
                  <TableCell colSpan={7} className="text-center">
                    <div className="flex h-full w-full items-center justify-center p-8">
                      <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
                    </div>
                  </TableCell>
                </TableRow>
              )}
              {payments?.map((payment) => (
                <TableRow key={payment.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="flex size-8 items-center justify-center rounded-full bg-blue-100">
                        <span className="text-sm font-medium text-blue-600">
                          {payment.client.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900">
                        {payment.client.name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-gray-700">
                      {payment.project.name}
                    </span>
                    {!payment.isActive && (
                      <Badge variant="secondary" className="ml-2 text-xs">
                        Inactive
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(payment.amount)}
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
                      {payment.status?.toUpperCase()}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={payment.status === "received" || isPending}
                        onClick={() =>
                          handleUpdatePaymentStatus(
                            payment.project.id,
                            payment.id,
                            "received",
                          )
                        }
                        className="w-32 cursor-pointer border-green-200 text-green-600 hover:bg-green-50"
                      >
                        {isPending ? (
                          <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
                        ) : (
                          <>
                            <Check className="mr-1 size-4" />
                            <span>Received</span>
                          </>
                        )}
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        disabled={
                          payment.status === "deactivated" ||
                          !payment.isActive ||
                          isPending
                        }
                        onClick={() =>
                          handleUpdatePaymentStatus(
                            payment.project.id,
                            payment.id,
                            "deactivated",
                          )
                        }
                        className="col-start-2 w-32 cursor-pointer border-red-200 text-red-600 hover:bg-red-50"
                      >
                        {isPending ? (
                          <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
                        ) : (
                          <>
                            <X className="mr-1 size-4" />
                            <span>Deactivate</span>
                          </>
                        )}
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Paginator paginator={paginator} setPaginator={setPaginator} />
        </div>

        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              Showing {data?.meta.count ?? 0} of {paginator.total ?? 0}
              &nbsp;payments
            </span>
            <div className="flex gap-4">
              <span>
                Total Pending:&nbsp;
                {payments &&
                  formatCurrency(
                    payments
                      .filter((p) => p.status === "pending")
                      .reduce((sum, p) => sum + p.amount, 0),
                  )}
              </span>
              <span>
                Total Received:&nbsp;
                {payments &&
                  formatCurrency(
                    payments
                      .filter((p) => p.status === "received")
                      .reduce((sum, p) => sum + p.amount, 0),
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

type PaymentsQueryResponse = {
  message: string;
  filters: { status: string; clientId: string; projectId: string };
  page: number;
  limit: number;
  total: number;
  count: number;
  data: {
    id: string;
    amount: number;
    dueDate: string;
    statusStored: string;
    effectiveStatus: string;
    statusHistory: string[];
    daysOverdue: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    client: {
      id: string;
      name: string;
      email: string;
    };
    project: { id: string; name: string };
  }[];
};
