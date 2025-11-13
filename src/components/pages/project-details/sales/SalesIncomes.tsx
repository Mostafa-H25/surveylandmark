// import { salesIncomesData } from "@/assets/data";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/helpers/formatCurrency";
import { CircleSlash } from "lucide-react";

type Props = {
  data: IncomesQueryResponse;
  isFetching: boolean;
};

const SalesIncomes = ({ data, isFetching }: Props) => {
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
        {isFetching && !data && (
          <TableRow>
            <TableCell colSpan={2} className="text-center">
              <div className="flex h-full w-full items-center justify-center p-8">
                <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
              </div>
            </TableCell>
          </TableRow>
        )}
        {!isFetching && !data && (
          <TableRow>
            <TableCell colSpan={2} className="text-center">
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
