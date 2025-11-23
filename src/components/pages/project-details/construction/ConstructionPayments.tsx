import { Badge } from "@/components/ui/badge";

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

type Props = {
  data: PaymentsQueryResponse;
  type: PaymentType;
};

const ConstructionPayments = ({ data, type }: Props) => {
  const Section = useMemo(() => {
    if (!data) return <></>;
    switch (type) {
      case PaymentsSectionsEnum.PAYMENT:
        return <Payments data={data as PaymentsQueryResponse} />;
      case PaymentsSectionsEnum.DEDUCTION:
        return <Deductions data={data as PaymentsQueryResponse} />;
      case PaymentsSectionsEnum.SUNDRIES:
        return <Sundries data={data as PaymentsQueryResponse} />;

      default:
        return <></>;
    }
  }, [data, type]);
  return Section;
};

export default ConstructionPayments;

type PaymentProps = { data: PaymentsQueryResponse };

const Payments = ({ data }: PaymentProps) => {
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
        </TableRow>
      </TableHeader>
      <TableBody>
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
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
const Deductions = ({ data }: PaymentProps) => {
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
        </TableRow>
      </TableHeader>
      <TableBody>
        {deductions.map((deduction) => (
          <TableRow key={deduction.id}>
            <TableCell className="font-medium capitalize">
              {deduction.contractor.name}
            </TableCell>
            <TableCell>{formatDate(deduction.date)}</TableCell>
            <TableCell className="capitalize">{deduction.item}</TableCell>
            <TableCell>{formatCurrency(deduction.amount)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
const Sundries = ({ data }: PaymentProps) => {
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
