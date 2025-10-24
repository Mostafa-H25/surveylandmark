// import { salesIncomesData } from "@/assets/data";
import {
  Table,
  TableBody,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { formatCurrency } from "@/helpers/formatCurrency";

const SalesIncomes = () => {
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
        {/* {salesIncomesData.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.type}</TableCell>

            <TableCell>{formatCurrency(row.incomeTillNow)}</TableCell>
            <TableCell>{row.no}</TableCell>
            <TableCell>
              {row.installmentsIncome
                ? formatCurrency(row.installmentsIncome)
                : "-"}
            </TableCell>
            <TableCell>
              {row.downPayment ? formatCurrency(row.downPayment) : "-"}
            </TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
};

export default SalesIncomes;
