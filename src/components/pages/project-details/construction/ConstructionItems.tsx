// import { constructionItemsData } from "@/assets/data";
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
// import { formatCurrency } from "@/helpers/formatCurrency";
// import { getProjectStatusColor } from "@/helpers/getStatusColor";
// import { cn } from "@/lib/utils";

const ConstructionItems = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Progress</TableHead>
          <TableHead>Start Date</TableHead>
          <TableHead>Contractor</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Site Engineer</TableHead>
          <TableHead>Material</TableHead>
          <TableHead>Cost/m</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {constructionItemsData.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.name}</TableCell>
            <TableCell>{item.type}</TableCell>
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
            <TableCell>
              {new Date(item.startDate).toLocaleDateString()}
            </TableCell>
            <TableCell>{item.contractor}</TableCell>
            <TableCell>
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
            </TableCell>
            <TableCell>{item.siteEngineer}</TableCell>
            <TableCell>{item.material}</TableCell>

            <TableCell>{formatCurrency(item.costPerMeter)}</TableCell>

            <TableCell>
              <Button
                variant="outline"
                size="sm"
                // onClick={() => handleViewMember(member.id)}
              >
                View Item
              </Button>
            </TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
};

export default ConstructionItems;
