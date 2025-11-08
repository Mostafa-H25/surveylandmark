// import { constructionMaterialsData } from "@/assets/data";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
type Props = {
  data: MaterialsQueryResponse;
};
const ConstructionMaterials = ({ data }: Props) => {
  const materials = data.data.map((material) => ({
    id: material.id,
    name: material.name,
    totalQuantity: material.totalQuantity,
    availableQuantity: material.availableQuantity,
    unit: material.unit,
  }));
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
        {materials.map((material) => (
          <TableRow key={material.id}>
            <TableCell className="font-medium capitalize">
              {material.name}
            </TableCell>
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

type MaterialsQueryResponse = {
  message: string;
  section: string;
  kind: string;
  page: number;
  limit: number;
  total: number;
  count: number;
  data: [
    {
      id: string;
      name: string;
      totalQuantity: number;
      availableQuantity: number;
      unit: string;
    },
  ];
};
