// import { salesUnitsData } from "@/assets/data";
import { Button } from "@/components/ui/button";
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
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  data: UnitsQueryResponse;
  isFetching: boolean;
};

const SalesUnits = ({ data, isFetching }: Props) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const salesUnits = data.data.map((unit) => ({
    id: unit.id,
    category: unit.unitStatus,
    name: unit.name,
    methodOfSale: unit.paymentMethod,
    type: unit.type,
  }));

  const handleViewUnit = (unitId: string) => {
    navigate(`/project/${projectId}/units/${unitId}`);
  };

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
        {isFetching && !salesUnits && (
          <TableRow>
            <TableCell colSpan={4} className="text-center">
              <div className="flex h-full w-full items-center justify-center p-8">
                <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
              </div>
            </TableCell>
          </TableRow>
        )}
        {!isFetching && !salesUnits?.length && (
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
        {salesUnits.map((unit) => (
          <TableRow key={unit.id}>
            <TableCell className="font-medium">{unit.category}</TableCell>
            <TableCell>{unit.name}</TableCell>
            <TableCell>{unit.type}</TableCell>
            <TableCell>{unit.methodOfSale}</TableCell>
            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewUnit(unit.id)}
              >
                View Details
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SalesUnits;

type UnitsQueryResponse = {
  message: string;
  section: string;
  kind: string;
  sub: string;
  page: number;
  limit: number;
  total: number;
  count: number;
  data: [
    {
      id: string;
      name: string;
      type: string;
      unitStatus: string;
      paymentMethod: string;
    },
  ];
};
