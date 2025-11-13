import { TabsContent } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { standardsData } from "@/assets/data";
// import { Download, Eye, SquarePen, Trash2, Upload } from "lucide-react";

const StandardsTab = () => {
  const department = {
    id: "d4",
    name: "standards",
    status: "in_progress",
    budget: 3000000,
    progress: 65,
    manager: "John Smith",
    startDate: "2024-02-15",
  };
  return (
    <TabsContent key={department.id} value={department.name}>
      {/* <div className="space-y-4 rounded-lg border bg-white p-4">
        <div className="flex w-full items-center justify-end gap-4">
          <Button className="bg-blue-600 font-semibold text-white hover:bg-blue-700">
            Add Standard
          </Button>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Contractor</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Item</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Batch Month</TableHead>
              <TableHead>Documents</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {standardsData.map((standard) => (
              <TableRow key={standard.id}>
                <TableCell className="font-medium">{standard.title}</TableCell>
                <TableCell>{standard.category}</TableCell>
                <TableCell>{standard.version}</TableCell>
                <TableCell>
                  {formatDate(standard.lastUpdated)}
                </TableCell>
                <TableCell>
                  {standard.status ? (
                    <Badge
                      // className={getProjectStatusColor(payment.status)}
                      className="whitespace-nowrap"
                    >
                      {standard.status.replaceAll("_", " ").toUpperCase()}
                    </Badge>
                  ) : (
                    "-"
                  )}
                </TableCell>
                <TableCell>{standard.document}</TableCell>

                <TableCell>
                  {standard.document === "no document" ? (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleViewMember(member.id)}
                      >
                        <SquarePen />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleViewMember(member.id)}
                      >
                        <Eye />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleViewMember(member.id)}
                      >
                        <Download />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleViewMember(member.id)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleViewMember(member.id)}
                      >
                        <SquarePen />
                      </Button>

                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleViewMember(member.id)}
                      >
                        <Upload />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        // onClick={() => handleViewMember(member.id)}
                      >
                        <Trash2 />
                      </Button>
                    </div>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div> */}
    </TabsContent>
  );
};

export default StandardsTab;
