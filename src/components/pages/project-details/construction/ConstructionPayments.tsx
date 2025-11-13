import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { PaymentType } from "@/types/default";
import { formatCurrency } from "@/helpers/formatCurrency";
import { cn } from "@/lib/utils";
import { useMemo } from "react";
import { PaymentsSectionsEnum } from "@/constants/defaults";
import { getProjectStatusColor } from "@/helpers/getStatusColor";
import { formatCamelCaseToText } from "@/helpers/formatCamelCaseToText";
import { formatDate } from "@/helpers/formatDate";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CircleSlash } from "lucide-react";

type Props = {
  data: PaymentsQueryResponse;
  type: PaymentType;
  isFetching: boolean;
};

const ConstructionPayments = ({ data, type, isFetching }: Props) => {
  const Section = useMemo(() => {
    if (!data) return <></>;
    switch (type) {
      case PaymentsSectionsEnum.PAYMENT:
        return (
          <Payments
            data={data as PaymentsQueryResponse}
            isFetching={isFetching}
          />
        );
      case PaymentsSectionsEnum.DEDUCTION:
        return (
          <Deductions
            data={data as PaymentsQueryResponse}
            isFetching={isFetching}
          />
        );
      case PaymentsSectionsEnum.SUNDRIES:
        return (
          <Sundries
            data={data as PaymentsQueryResponse}
            isFetching={isFetching}
          />
        );

      default:
        return <></>;
    }
  }, [data, type]);
  return Section;
};

export default ConstructionPayments;

type PaymentProps = { data: PaymentsQueryResponse; isFetching: boolean };

const Payments = ({ data, isFetching }: PaymentProps) => {
  const payments = data.data.map((payment) => ({
    id: payment.id,
    typeOfPayment: payment.typeOfPayment,
    item: payment.item,
    amount: payment.amount,
    date: payment.date,
    createdAt: payment.createdAt,
    document: payment.document,
    dateReceived: payment.dateRecived,
    status: payment.status,
    batchMonth: payment.batchMonth,
    contractor: {
      id: payment.contractorOrSupplier.id,
      name: payment.contractorOrSupplier.name,
      role: payment.contractorOrSupplier.role,
      title: payment.contractorOrSupplier.title,
      position: payment.contractorOrSupplier.position,
    },
  }));
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contractor</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Batch Month</TableHead>
          <TableHead>Documents</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isFetching && !payments && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              <div className="flex h-full w-full items-center justify-center p-8">
                <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
              </div>
            </TableCell>
          </TableRow>
        )}
        {!isFetching && !payments.length && (
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
                <EmptyContent>{/* <Button>Add data</Button> */}</EmptyContent>
              </Empty>
            </TableCell>
          </TableRow>
        )}
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">
              {payment.contractor.name}
            </TableCell>
            <TableCell>{formatDate(payment.date)}</TableCell>
            <TableCell className="capitalize">{payment.item}</TableCell>
            <TableCell>{formatCurrency(payment.amount)}</TableCell>
            <TableCell>
              {payment.status ? (
                <Badge
                  className={cn(
                    "whitespace-nowrap capitalize",
                    getProjectStatusColor(payment.status),
                  )}
                >
                  {formatCamelCaseToText(payment.status).toUpperCase()}
                </Badge>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell className="capitalize">{payment.batchMonth}</TableCell>

            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  // onClick={() => handleViewMember(member.id)}
                >
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  // onClick={() => handleViewMember(member.id)}
                >
                  View Document
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
const Deductions = ({ data, isFetching }: PaymentProps) => {
  const deductions = data.data.map((payment) => ({
    id: payment.id,
    typeOfPayment: payment.typeOfPayment,
    item: payment.item,
    amount: payment.amount,
    date: payment.date,
    createdAt: payment.createdAt,
    document: payment.document,
    dateReceived: payment.dateRecived,
    status: payment.status,
    batchMonth: payment.batchMonth,
    contractor: {
      id: payment.contractorOrSupplier.id,
      name: payment.contractorOrSupplier.name,
      role: payment.contractorOrSupplier.role,
      title: payment.contractorOrSupplier.title,
      position: payment.contractorOrSupplier.position,
    },
  }));
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Contractor</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Documents</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isFetching && !deductions && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              <div className="flex h-full w-full items-center justify-center p-8">
                <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
              </div>
            </TableCell>
          </TableRow>
        )}
        {!isFetching && !deductions.length && (
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
                <EmptyContent>{/* <Button>Add data</Button> */}</EmptyContent>
              </Empty>
            </TableCell>
          </TableRow>
        )}
        {deductions.map((deduction) => (
          <TableRow key={deduction.id}>
            <TableCell className="font-medium capitalize">
              {deduction.contractor.name}
            </TableCell>
            <TableCell>{formatDate(deduction.date)}</TableCell>
            <TableCell className="capitalize">{deduction.item}</TableCell>
            <TableCell>{formatCurrency(deduction.amount)}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  // onClick={() => handleViewMember(member.id)}
                >
                  Download
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="cursor-pointer"
                  // onClick={() => handleViewMember(member.id)}
                >
                  View Document
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
const Sundries = ({ data, isFetching }: PaymentProps) => {
  const sundries = data.data.map((payment) => ({
    id: payment.id,
    typeOfPayment: payment.typeOfPayment,
    item: payment.item,
    amount: payment.amount,
    date: payment.date,
    createdAt: payment.createdAt,
    document: payment.document,
    dateReceived: payment.dateRecived,
    status: payment.status,
    batchMonth: payment.batchMonth,
    contractor: {
      id: payment.contractorOrSupplier.id,
      name: payment.contractorOrSupplier.name,
      role: payment.contractorOrSupplier.role,
      title: payment.contractorOrSupplier.title,
      position: payment.contractorOrSupplier.position,
    },
  }));
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Item</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isFetching && !sundries && (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              <div className="flex h-full w-full items-center justify-center p-8">
                <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
              </div>
            </TableCell>
          </TableRow>
        )}
        {!isFetching && !sundries.length && (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
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
            </TableCell>
          </TableRow>
        )}
        {sundries.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>{formatDate(payment.date)}</TableCell>
            <TableCell className="capitalize">{payment.item}</TableCell>
            <TableCell>{formatCurrency(payment.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

type PaymentsQueryResponse = {
  message: string;
  section: string;
  kind: string;
  sub: string;
  page: number;
  limit: number;
  total: number;
  count: number;
  sum: number;
  data: [
    {
      id: string;
      typeOfPayment: string;
      item: string;
      amount: number;
      date: string;
      createdAt: string;
      document: null;
      dateRecived: string;
      contractorOrSupplier: {
        id: string;
        name: string;
        role: string;
        title: string;
        position: string;
      };
      status: string;
      batchMonth: string;
    },
  ];
};
