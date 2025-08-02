import { constructionMaterialsData } from "@/assets/data";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ConstructionMaterials = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Total Quantity</TableHead>
          <TableHead>Available Quantity</TableHead>
          <TableHead>Units</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {constructionMaterialsData.map((material) => (
          <TableRow key={material.id}>
            <TableCell className="font-medium">{material.name}</TableCell>
            <TableCell>{material.totalQuantity}</TableCell>
            <TableCell>{material.availableQuantity}</TableCell>
            <TableCell>{material.unit}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ConstructionMaterials;
