// import { constructionPaymentsData } from "@/assets/data";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";

import {
  Table,
  // TableBody,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { formatCurrency } from "@/helpers/formatCurrency";
// import { cn } from "@/lib/utils";

const ConstructionPayments = () => {
  // const filteredPaymentData = constructionPaymentsData.filter(
  //   (payment) => payment.type === type,
  // );
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
      {/* <TableBody>
        {filteredPaymentData.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">{payment.contractor}</TableCell>
            <TableCell>{new Date(payment.date).toLocaleDateString()}</TableCell>
            <TableCell>{payment.item}</TableCell>
            <TableCell>{formatCurrency(payment.amount)}</TableCell>
            <TableCell>
              {payment.status ? (
                <Badge
                  className={cn(
                    "whitespace-nowrap",
                    // getProjectStatusColor(payment.status),
                  )}
                >
                  {payment.status.replaceAll("_", " ").toUpperCase()}
                </Badge>
              ) : (
                "-"
              )}
            </TableCell>
            <TableCell>
              {new Date(payment.batchMonth).toLocaleDateString()}
            </TableCell>

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
                  // onClick={() => handleViewMember(member.id)}
                >
                  View Document
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody> */}
    </Table>
  );
};

export default ConstructionPayments;
