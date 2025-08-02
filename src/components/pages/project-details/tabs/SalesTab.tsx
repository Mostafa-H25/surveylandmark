import { ChevronDown, Download, Expand } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";

import { salesSections, SalesSectionsEnum } from "@/constants/defaults";
import SalesOverview from "../sales/SalesOverview";
import SalesMembers from "../sales/SalesMembers";
import SalesIncomes from "../sales/SalesIncomes";
import SalesUnits from "../sales/SalesUnits";

const SalesTab = () => {
  const department = {
    id: "d2",
    name: "sales",
    status: "in_progress",
    budget: 3000000,
    progress: 65,
    manager: "John Smith",
    startDate: "2024-02-15",
  };

  return (
    <TabsContent key={department.id} value={department.name}>
      <div className="space-y-4 rounded-lg border bg-white p-4">
        <div className="flex w-full items-center justify-between gap-4">
          <Select defaultValue={SalesSectionsEnum.OVERVIEW}>
            <SelectTrigger className="w-64 capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {salesSections.map((section) => (
                <SelectItem value={section} className="capitalize">
                  {section.replaceAll("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div>
            <div className="flex items-center gap-2">
              <Button className="bg-blue-100 text-blue-700 hover:bg-blue-200">
                <Expand />
              </Button>
              <div>
                <Button className="rounded-r-none bg-blue-100 text-blue-700 hover:bg-blue-200">
                  <Download />
                  Export
                </Button>
                <Button className="rounded-l-none bg-blue-100 text-blue-700 hover:bg-blue-200">
                  <ChevronDown />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* <SalesOverview /> */}
        {/* <SalesMembers /> */}
        {/* <SalesIncomes /> */}
        <SalesUnits />
      </div>
    </TabsContent>
  );
};

export default SalesTab;
