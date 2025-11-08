import { TabsContent } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";

// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { storageData } from "@/assets/data";
// import { ChevronDown, Download, Expand } from "lucide-react";

const StorageTab = () => {
  const department = {
    id: "d3",
    name: "storage",
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
          <div>
            <div className="flex items-center gap-2">
              <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer ">
                <Expand />
              </Button>
              <div>
                <Button className="rounded-r-none bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer ">
                  <Download />
                  Export
                </Button>
                <Button className="rounded-l-none bg-blue-100 text-blue-700 hover:bg-blue-200 cursor-pointer ">
                  <ChevronDown />
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Type</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Total Quantity</TableHead>
              <TableHead>Batch No.</TableHead>
              <TableHead>Date of Supply</TableHead>
              <TableHead>Supplier</TableHead>
              <TableHead>Unit</TableHead>
              <TableHead>Recipient</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {storageData.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">{item.type}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.totalQuantity}</TableCell>
                <TableCell>{item.batchNo}</TableCell>
                <TableCell>
                  {new Date(item.dateOfSupply).toLocaleDateString()}
                </TableCell>
                <TableCell>{item.supplier}</TableCell>
                <TableCell>{item.unit}</TableCell>
                <TableCell>{item.recipient}</TableCell>

                <TableCell>
                  <Button
                    variant="outline"
                    size="sm"
                    className="cursor-pointer "
                    // onClick={() => handleViewMember(member.id)}
                  >
                    View Item
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div> */}
    </TabsContent>
  );
};

export default StorageTab;
