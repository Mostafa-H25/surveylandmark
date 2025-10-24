// import { constructionOverviewData } from "@/assets/data";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { getProjectStatusColor } from "@/helpers/getStatusColor";
// import { cn } from "@/lib/utils";

const ConstructionOverview = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Overviews</TableHead>
          <TableHead>Metrics</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {constructionOverviewData.map((row) => (
          <TableRow key={row.id}>
            <TableCell className="font-medium">{row.overview}</TableCell>
            <TableCell>{row.metrics}</TableCell>
            <TableCell>
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
            </TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
};

export default ConstructionOverview;
