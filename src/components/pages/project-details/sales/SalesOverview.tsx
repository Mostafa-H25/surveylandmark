import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {
  data: OverviewQueryResponse;
};

const SalesOverview = ({ data }: Props) => {
  const overview = [
    { label: "Total sales", value: data.data.totalSales },
    {
      label: "Construction Ratio",
      value: data.data.constructionRatio.overallProgress,
    },
    {
      label: "Total Area",
      value: data.data.totalArea,
    },
    {
      label: "Service Facilities Area",
      value: data.data.serviceFacilitiesArea,
    },
    { label: "Green Area Percentage", value: data.data.greenAreasPercentage },
    { label: "Delivery Date", value: data.data.deliveryDate },
    {
      label: "No. Of Residential Units",
      value: data.data.counts.residentialUnits,
    },
    {
      label: "No. Of Commercial Units",
      value: data.data.counts.commercialUnits,
    },
    {
      label: "No. Of Administrative Units",
      value: data.data.counts.administrativeUnits,
    },
    {
      label: "No. Of Floors",
      value: data.data.counts.floors,
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
          <TableRow key={row.label}>
            <TableCell className="font-medium">{row.label}</TableCell>
            <TableCell>{row.value}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default SalesOverview;

type OverviewQueryResponse = {
  message: string;
  section: string;
  kind: string;
  sub: string;
  range: { from: string | null; to: string | null };
  data: {
    totalSales: number;
    breakdown: { cash: number; installmentsIncome: number; rentIncome: number };
    constructionRatio: {
      overallProgress: number;
      processings: {
        id: string;
        name: string;
        quantity: number;
        executedQuantity: number;
        progressPercentage: number;
        status: string;
        workItem: { id: string; name: string };
      }[];
      workItemImpacts: [
        {
          id: string;
          name: string;
          percentage: number;
          averageProgress: number;
          workItems: { id: string; name: string }[];
        },
      ];
    };
    totalArea: string;
    serviceFacilitiesArea: string;
    greenAreasPercentage: string;
    deliveryDate: string;
    counts: {
      residentialUnits: number;
      commercialUnits: number;
      administrativeUnits: number;
      floors: number;
    };
  };
};
