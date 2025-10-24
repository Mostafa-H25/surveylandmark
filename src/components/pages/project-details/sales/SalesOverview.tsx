// import { salesOverviewData } from "@/assets/data";
// import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SalesOverview = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Overviews</TableHead>
          <TableHead>Metrics</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {salesOverviewData.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.overview}</TableCell>
            <TableCell>{row.metrics}</TableCell>

            <TableCell>
              <Button
                variant="outline"
                size="sm"
                // onClick={() => handleEditRow(row.id)}
              >
                Edit
              </Button>
            </TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
};

export default SalesOverview;
