import { ChevronDownIcon, CircleSlash, Expand } from "lucide-react";

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
import { useParams, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import type { DepartmentType, SalesView } from "@/types/default";
import { getSalesByProjectIdApi } from "@/api/projects/get-sales-by-project-id.api";
import { formatCamelCaseToText } from "@/helpers/formatCamelCaseToText";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Paginator from "@/components/shared/Paginator";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { formatDate } from "@/helpers/formatDate";
import type { DateRange } from "react-day-picker";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const DEPARTMENTS_QUERY_KEY = "sales-section";

type Props = { selectedDepartment: DepartmentType };

const SalesTab = ({ selectedDepartment }: Props) => {
  const { projectId } = useParams();
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const urlSection = URLSearchParams.get("section") as SalesView | null;

  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false);
  const [paginator, setPaginator] = useState({
    page: 1,
    limit: 10,
    total: 0,
  });
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(Date.now()),
    to: undefined,
  });

  const [selectedOption, setSelectedOption] = useState<SalesView>(
    urlSection ?? SalesSectionsEnum.OVERVIEW,
  );
  const isSalesSelected = selectedDepartment === CategoriesEnum.SALES;
  const isIncomesView = SalesSectionsEnum.INCOMES === selectedOption;

  const { data, isFetching } = useQuery({
    queryKey: [
      DEPARTMENTS_QUERY_KEY,
      selectedDepartment,
      selectedOption,
      paginator.page,
      range?.from && range?.to ? range : undefined,
    ],
    enabled: isSalesSelected && !!selectedOption,
    queryFn: () =>
      getSalesByProjectIdApi(projectId!, selectedDepartment, selectedOption, {
        pagination: { page: paginator.page, limit: paginator.limit },
        range,
      }),
  });

  useEffect(() => {
    if (data?.page) {
      setPaginator((prev) => ({
        ...prev,
        page: data.page ?? 1,
        total: data.total ?? 0,
      }));
    }
  }, [data]);

  const Section = useMemo(() => {
    if (!data) return <></>;
    switch (selectedOption) {
      case SalesSectionsEnum.OVERVIEW:
        return <SalesOverview data={data as OverviewQueryResponse} />;
      case SalesSectionsEnum.MEMBERS:
        return <SalesMembers data={data as MembersQueryResponse} />;
      case SalesSectionsEnum.INCOMES:
        return <SalesIncomes data={data as IncomesQueryResponse} />;
      case SalesSectionsEnum.UNITS:
        return <SalesUnits data={data as UnitsQueryResponse} />;

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
            onValueChange={(value) => {
              setSelectedOption(value as SalesView);
              setURLSearchParams((prev) => {
                prev.set("section", value);
                return prev;
              });
            }}
          >
            <SelectTrigger className="w-64 capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {salesSections.map((section) => (
                <SelectItem
                  key={section}
                  value={section}
                  className="capitalize"
                >
                  {formatCamelCaseToText(section)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {isIncomesView && (
            <div className="flex gap-4">
              <div className="flex flex-col gap-3">
                <Label htmlFor="date-picker" className="px-1">
                  Date Range
                </Label>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      id="date-picker"
                      className="w-32 justify-between font-normal"
                    >
                      {range?.from
                        ? formatDate(range.from.toString())
                        : "Select date"}
                      <ChevronDownIcon />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-auto overflow-hidden p-0"
                    align="start"
                  >
                    <Calendar
                      mode="range"
                      defaultMonth={range?.from}
                      selected={range}
                      onSelect={setRange}
                      numberOfMonths={2}
                      className="rounded-lg border shadow-sm"
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          )}
          <div>
            <div className="flex items-center gap-2">
              <Dialog open={expand} onOpenChange={setExpand}>
                <DialogTrigger asChild>
                  <Button className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200">
                    <Expand />
                  </Button>
                </DialogTrigger>
                <DialogContent className="!w-4xl max-w-screen px-4">
                  <DialogHeader>
                    <DialogTitle className="capitalize">
                      {selectedDepartment} - {selectedOption}
                    </DialogTitle>
                  </DialogHeader>
                  {Section}
                  <Paginator
                    paginator={paginator}
                    setPaginator={setPaginator}
                  />
                </DialogContent>
              </Dialog>
              {/* <div>
                <Button className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200">
                  <Download />
                  Export
                </Button>
                <Button className="cursor-pointer rounded-l-none bg-blue-100 text-blue-700 hover:bg-blue-200">
                  <ChevronDown />
                </Button>
              </div> */}
            </div>
          </div>
        </div>
        {isFetching && !data && (
          <div className="flex h-full w-full items-center justify-center p-8">
            <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        )}
        {!isFetching && !data && (
          <Empty>
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CircleSlash color="#4a5565 " />
              </EmptyMedia>
              <EmptyTitle>No data</EmptyTitle>
              <EmptyDescription>No data found</EmptyDescription>
            </EmptyHeader>
            <EmptyContent>{/* <Button>Add data</Button> */}</EmptyContent>
          </Empty>
        )}
        {Section}
        <Paginator paginator={paginator} setPaginator={setPaginator} />
      </div>
    </TabsContent>
  );
};

export default SalesTab;

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

type MembersQueryResponse = {
  message: string;
  section: string;
  kind: string;
  sub: string;
  page: number;
  limit: number;
  total: number;
  count: number;
  data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    projectName: string;
    salary: string;
    commission: number;
  }[];
};

type IncomesQueryResponse = {
  message: string;
  section: string;
  kind: string;
  sub: string;
  range: {
    from: string | null;
    to: string | null;
  };
  table: [
    {
      type: string;
      incomeTillNow: number;
      no: number;
    },
  ];
  totals: {
    totalIncome: number;
    cashIncome: number;
    installmentsIncome: number;
    rentIncome: number;
    downpayment: number;
  };
};

type UnitsQueryResponse = {
  message: string;
  section: string;
  kind: string;
  sub: string;
  page: number;
  limit: number;
  total: number;
  count: number;
  data: [
    {
      id: string;
      name: string;
      type: string;
      unitStatus: string;
      paymentMethod: string;
    },
  ];
};
