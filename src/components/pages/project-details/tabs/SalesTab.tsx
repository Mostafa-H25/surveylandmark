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

import {
  salesSections,
  SalesSectionsEnum,
  CategoriesEnum,
} from "@/constants/defaults";
import SalesOverview from "../sales/SalesOverview";
import SalesMembers from "../sales/SalesMembers";
import SalesIncomes from "../sales/SalesIncomes";
import SalesUnits from "../sales/SalesUnits";
import { useParams } from "react-router-dom";
import { getDepartmentSectionByProjectIdApi } from "@/api/projects/get-department-section-by-Project-id.api";
import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import type { SalesView } from "@/types/default";

const DEPARTMENTS_QUERY_KEY = "department-section";

type Props = { selectedDepartment: DepartmentType };

const SalesTab = ({ selectedDepartment }: Props) => {
  const { projectId } = useParams();
  const [selectedOption, setSelectedOption] = useState<SalesView>(
    SalesSectionsEnum.OVERVIEW,
  );

  const isSalesSelected = selectedDepartment === CategoriesEnum.SALES;

  const { data } = useQuery({
    queryKey: [DEPARTMENTS_QUERY_KEY, selectedDepartment],
    enabled: isSalesSelected && !!selectedOption,
    queryFn: () =>
      getDepartmentSectionByProjectIdApi(
        projectId!,
        selectedDepartment,
        // selectedOption,
      ),
  });
  // console.log(data);
  const Section = useMemo(() => {
    if (!data) return <></>;
    switch (selectedOption) {
      case SalesSectionsEnum.OVERVIEW:
        return <SalesOverview data={data as OverviewQueryResponse} />;
      case SalesSectionsEnum.MEMBERS:
        return <SalesMembers data={data as TeamQueryResponse} />;
      case SalesSectionsEnum.INCOMES:
        return <SalesIncomes data={data as ItemsQueryResponse} />;
      case SalesSectionsEnum.UNITS:
        return <SalesUnits data={data as ItemsQueryResponse} />;

      default:
        return <></>;
    }
  }, [selectedOption, data]);

  return (
    <TabsContent key={CategoriesEnum.SALES} value={CategoriesEnum.SALES}>
      <div className="space-y-4 rounded-lg border bg-white p-4">
        <div className="flex w-full items-center justify-between gap-4">
          <Select
            value={selectedOption}
            onValueChange={(value) => setSelectedOption(value as SalesView)}
          >
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
              <Button className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200">
                <Expand />
              </Button>
              <div>
                <Button className="cursor-pointer rounded-r-none bg-blue-100 text-blue-700 hover:bg-blue-200">
                  <Download />
                  Export
                </Button>
                <Button className="cursor-pointer rounded-l-none bg-blue-100 text-blue-700 hover:bg-blue-200">
                  <ChevronDown />
                </Button>
              </div>
            </div>
          </div>
        </div>
        {Section}
      </div>
    </TabsContent>
  );
};

export default SalesTab;
