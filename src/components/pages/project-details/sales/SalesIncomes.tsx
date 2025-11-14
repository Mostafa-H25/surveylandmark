import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/helpers/formatCurrency";

type Props = {
  data: IncomesQueryResponse;
};

const SalesIncomes = ({ data }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Income Till Now</TableHead>
          <TableHead>No.</TableHead>
          <TableHead>Installments Income</TableHead>
          <TableHead>Down Payment</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.table.map((row, index) => (
          <TableRow key={index}>
            <TableCell className="font-medium">{row.type}</TableCell>

            <TableCell>{formatCurrency(row.incomeTillNow)}</TableCell>
            <TableCell>{row.no}</TableCell>
            <TableCell>
              {row?.details?.installmentsOnly
                ? formatCurrency(row.details.installmentsOnly)
                : "-"}
            </TableCell>
            <TableCell>
              {row?.details?.downpayment
                ? formatCurrency(row.details.downpayment)
                : "-"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SalesIncomes;

type IncomesQueryResponse = {
  message: string;
  section: string;
  kind: string;
  sub: string;
  range: {
    from: string | null;
    to: string | null;
  };
  table: {
    type: string;
    incomeTillNow: number;
    no: number;
    installments?: number;
    cash?: number;
    rent?: number;
    details?: {
      downpayment: number;
      installmentsOnly: number;
      maintenance: number;
    };
  }[];
  totals: {
    totalIncome: number;
    cashIncome: number;
    installmentsIncome: number;
    rentIncome: number;
    downpayment: number;
  };
};
