import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  data: ItemsQueryResponse;
};
const ConstructionItems = ({ data }: Props) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const items = data.data.map((item) => ({
    id: item.id,
    name: item.name,
    type: item.workItems[0].name,
    progress: item.progress.percentage,
    workItem: {
      id: item.workItems[0].id,
    },
    processes: item.processings.map((process) => ({
      id: process.id,
      name: process.name,
      // status: process.status,
      // quantity: process.quantity,
      // executedQuantity: process.executedQuantity,
    })),
  }));

  const handleViewItem = (unitId: string) => {
    navigate(ROUTES.UNIT(projectId, unitId));
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Progress</TableHead>
          {/* <TableHead>Start Date</TableHead> */}
          {/* <TableHead>Contractor</TableHead> */}
          {/* <TableHead>Status</TableHead> */}
          {/* <TableHead>Site Engineer</TableHead> */}
          {/* <TableHead>Material</TableHead> */}
          {/* <TableHead>Cost/m</TableHead> */}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium capitalize">
              {item.name}
            </TableCell>
            <TableCell className="capitalize">{item.type}</TableCell>
            <TableCell>
              <div className="flex items-center gap-2">
                <div className="h-2 min-w-20 flex-1 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all"
                    style={{
                      width: `${item.progress}%`,
                    }}
                  ></div>
                </div>
                <div className="font-medium">{item.progress}%</div>
              </div>
            </TableCell>
            {/* <TableCell>
              {formatDate(item.startDate)}
            </TableCell>
            <TableCell>{item.contractor}</TableCell> */}
            {/* <TableCell>
              {item.status ? (
                <Badge
                  className={cn(
                    "whitespace-nowrap",
                    getProjectStatusColor(item.status),
                  )}
                >
                  {item.status.replaceAll("_", " ").toUpperCase()}
                </Badge>
              ) : (
                "-"
              )}
            </TableCell> */}
            {/* <TableCell>{item.siteEngineer}</TableCell> */}
            {/* <TableCell>{item.material}</TableCell> */}

            {/* <TableCell>{formatCurrency(item.costPerMeter)}</TableCell> */}

            <TableCell>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer"
                  >
                    View Item
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {item.processes.map((process) => (
                    <DropdownMenuItem
                      key={process.id}
                      onClick={() => handleViewItem(process.id)}
                      className="capitalize"
                    >
                      {process.name}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ConstructionItems;

type ItemsQueryResponse = {
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
      workItems: [{ id: string; name: string }];
      processings: [
        {
          id: string;
          name: string;
          status: string;
          quantity: number;
          executedQuantity: number;
        },
      ];
      progress: {
        totalQuantity: number;
        executedQuantity: number;
        percentage: number;
      };
    },
  ];
};
