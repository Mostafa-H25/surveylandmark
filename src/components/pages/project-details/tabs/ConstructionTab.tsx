import { ChevronDown, Download, Expand } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  constructionSections,
  ConstructionSectionsEnum,
} from "@/constants/defaults";
import ConstructionOverview from "../construction/ConstructionOverview";
import ConstructionMembers from "../construction/ConstructionMembers";
import ConstructionPayments from "../construction/ConstructionPayments";
import ConstructionItems from "../construction/ConstructionItems";
import ConstructionMaterials from "../construction/ConstructionMaterials";
import ConstructionContractors from "../construction/ConstructionContractors";

const ConstructionTab = () => {
  const department = {
    id: "d1",
    name: "construction",
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
          <Select defaultValue={ConstructionSectionsEnum.OVERVIEW}>
            <SelectTrigger className="w-64 capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {constructionSections.map((section) => (
                <SelectItem value={section} className="capitalize">
                  {section.replaceAll("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {false ? (
            <TabsList className="grid grid-cols-3">
              <TabsTrigger value="payment">Payments</TabsTrigger>
              <TabsTrigger value="deduction">Deduction</TabsTrigger>
              <TabsTrigger value="sundries">Sundries</TabsTrigger>
            </TabsList>
          ) : null}
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
        <ConstructionOverview />
        {/* <ConstructionMembers /> */}
        {/* <ConstructionPayments type={"payment"} /> */}
        {/* <ConstructionItems /> */}
        {/* <ConstructionMaterials /> */}
        {/* <ConstructionContractors /> */}
      </div>
    </TabsContent>
  );
};

export default ConstructionTab;
