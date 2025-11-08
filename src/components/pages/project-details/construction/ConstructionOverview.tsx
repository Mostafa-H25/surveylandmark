// import { constructionOverviewData } from "@/assets/data";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ConstructionView, DepartmentType } from "@/types/default";
// import { getProjectStatusColor } from "@/helpers/getStatusColor";
// import { cn } from "@/lib/utils";

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
    // processingImages: {
    //   label: "images",
    //   value: data.data.processingImages,
    // },
    { label: "delivery date", value: data.data.deliveryDate },
  ];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Overviews</TableHead>
          <TableHead>Metrics</TableHead>
          {/* <TableHead>Progress</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead> */}
        </TableRow>
      </TableHeader>
      <TableBody>
        {overview.map((row) => (
          <TableRow key={row.label} className="capitalize">
            <TableCell className="font-medium">{row.label}</TableCell>
            <TableCell>{row.value}</TableCell>
            {/* <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-2 min-w-20 flex-1 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all"
                    style={{
                      width: `${row.progress}%`,
                    }}
                  ></div>
                </div>
                <div className="font-medium">{row.progress}%</div>
              </div>
            </TableCell>
            <TableCell>
              {row.status ? (
                <Badge
                  className={cn(
                    "whitespace-nowrap",
                    getProjectStatusColor(row.status),
                  )}
                >
                  {row.status.replaceAll("_", " ").toUpperCase()}
                </Badge>
              ) : (
                "-"
              )}
            </TableCell>

            <TableCell>
              <Button
                variant="outline"
                size="sm"
                // onClick={() => handleEditRow(row.id)}
              >
                Edit
              </Button>
            </TableCell> */}
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
