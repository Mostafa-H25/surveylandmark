import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTES } from "@/constants/routes";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  data: UnitsQueryResponse;
};

const SalesUnits = ({ data }: Props) => {
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
    navigate(ROUTES.UNIT(projectId, unitId));
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
