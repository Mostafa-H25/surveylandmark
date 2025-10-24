// import { salesUnitsData } from "@/assets/data";
// import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const SalesUnits = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Category</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>method of Sale</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {salesUnitsData.map((unit) => (
          <TableRow key={unit.id}>
            <TableCell className="font-medium">{unit.category}</TableCell>
            <TableCell>{unit.name}</TableCell>
            <TableCell>{unit.type}</TableCell>
            <TableCell>{unit.methodOfSale}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                // onClick={() => handleEditRow(row.id)}
              >
                View Unit
              </Button>
            </TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
};

export default SalesUnits;
