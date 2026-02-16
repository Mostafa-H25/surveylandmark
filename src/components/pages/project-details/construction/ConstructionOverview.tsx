import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatDate } from "@/helpers/formatDate";
import type { ConstructionView, DepartmentType } from "@/types/default";

type Props = {
  data: OverviewQueryResponse;
};
const ConstructionOverview = ({ data }: Props) => {
  const overview = [
    { label: "cost till now", value: data.data.costTillNow },
    {
      label: "no. of residential units",
      value: data.data.residentialUnitsCount,
    },
    {
      label: "no. of commercial units",
      value: data.data.commercialUnitsCount,
    },
    {
      label: "no. of administrative units",
      value: data.data.administrativeUnitsCount,
    },
    { label: "no. of floors", value: data.data.floorsCount },
    { label: "total area", value: data.data.totalArea },
    { label: "actual area", value: data.data.actualArea },
    { label: "green area", value: data.data.greenArea },
    {
      label: "progress",
      value: data.data.progressPercent,
    },
    {
      label: "delivery date",
      value: data.data?.deliveryDate && formatDate(data.data.deliveryDate),
    },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Overviews</TableHead>
          <TableHead>Metrics</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {overview.map((row) => (
          <TableRow key={row.label} className="capitalize">
            <TableCell className="font-medium">{row.label}</TableCell>
            <TableCell>{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ConstructionOverview;

type OverviewQueryResponse = {
  message: string;
  section: DepartmentType;
  kind: ConstructionView;
  data: {
    costTillNow: number;
    residentialUnitsCount: number;
    commercialUnitsCount: number;
    administrativeUnitsCount: number;
    floorsCount: number;
    totalArea: string;
    actualArea: string;
    greenArea: string;
    progressPercent: number;
    processingImages: [];
    deliveryDate: string;
  };
};
