// import { constructionMaterialsData } from "@/assets/data";

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
import { CircleSlash } from "lucide-react";

type Props = {
  data: MaterialsQueryResponse;
  isFetching: boolean;
};

const ConstructionMaterials = ({ data, isFetching }: Props) => {
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
        {isFetching && !materials && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              <div className="flex h-full w-full items-center justify-center p-8">
                <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
              </div>
            </TableCell>
          </TableRow>
        )}
        {!isFetching && !materials.length && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
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
