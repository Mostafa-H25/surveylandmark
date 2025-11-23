import { CircleSlash, Expand } from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  CategoriesEnum,
  constructionSections,
  ConstructionSectionsEnum,
  PaymentsSectionsEnum,
} from "@/constants/defaults";
import ConstructionOverview from "../construction/ConstructionOverview";
import { useEffect, useMemo, useState } from "react";
import type {
  ConstructionView,
  DepartmentType,
  PaymentType,
} from "@/types/default";
import ConstructionMembers from "../construction/ConstructionMembers";
import ConstructionPayments from "../construction/ConstructionPayments";
import ConstructionItems from "../construction/ConstructionItems";
import ConstructionMaterials from "../construction/ConstructionMaterials";
import ConstructionContractors from "../construction/ConstructionContractors";
import { useQuery } from "@tanstack/react-query";
import { getDepartmentSectionByProjectIdApi } from "@/api/projects/get-department-section-by-Project-id.api";
import { useParams, useSearchParams } from "react-router-dom";
import { formatCamelCaseToText } from "@/helpers/formatCamelCaseToText";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {} from "@radix-ui/react-dialog";
import Paginator from "@/components/shared/Paginator";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const DEPARTMENTS_QUERY_KEY = "department-section";

type Props = { selectedDepartment: DepartmentType };

const ConstructionTab = ({ selectedDepartment }: Props) => {
  const { projectId } = useParams();
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const urlSection = URLSearchParams.get("section") as ConstructionView | null;
  const urlSubSection = URLSearchParams.get(
    "sub-section",
  ) as PaymentType | null;

  const [expand, setExpand] = useState(false);
  const [paginator, setPaginator] = useState({ page: 1, limit: 10, total: 0 });

  const [selectedSection, setSelectedSection] = useState<ConstructionView>(
    urlSection ?? ConstructionSectionsEnum.OVERVIEW,
  );
  const [selectedPaymentType, setSelectedPaymentType] = useState<PaymentType>(
    urlSubSection ?? PaymentsSectionsEnum.PAYMENT,
  );

  const isPaymentsView = ConstructionSectionsEnum.PAYMENTS === selectedSection;

  const isConstructionSelected =
    selectedDepartment === CategoriesEnum.CONSTRUCTION;

  const { data, isFetching } = useQuery({
    queryKey: [
      DEPARTMENTS_QUERY_KEY,
      selectedDepartment,
      selectedSection,
      selectedPaymentType,
      paginator.page,
    ],
    enabled: isConstructionSelected && !!selectedSection,
    queryFn: () =>
      getDepartmentSectionByProjectIdApi(
        projectId!,
        selectedDepartment,
        selectedSection,
        selectedPaymentType,
        { pagination: { page: paginator.page, limit: paginator.limit } },
      ),
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
    switch (selectedSection) {
      case ConstructionSectionsEnum.OVERVIEW:
        return <ConstructionOverview data={data as OverviewQueryResponse} />;
      case ConstructionSectionsEnum.TEAM:
        return <ConstructionMembers data={data as TeamQueryResponse} />;
      case ConstructionSectionsEnum.ITEMS:
        return <ConstructionItems data={data as ItemsQueryResponse} />;
      case ConstructionSectionsEnum.MATERIALS:
        return <ConstructionMaterials data={data as MaterialsQueryResponse} />;
      case ConstructionSectionsEnum.PAYMENTS:
        return (
          <ConstructionPayments
            data={data as PaymentsQueryResponse}
            type={selectedPaymentType}
          />
        );
      case ConstructionSectionsEnum.VENDORS:
        return <ConstructionContractors data={data as VendorsQueryResponse} />;
      default:
        return <></>;
    }
  }, [selectedSection, data, selectedPaymentType]);

  return (
    <TabsContent
      key={CategoriesEnum.CONSTRUCTION}
      value={CategoriesEnum.CONSTRUCTION}
    >
      <div className="space-y-4 rounded-lg border bg-white p-4">
        <div className="flex w-full items-center justify-between gap-4">
          <Select
            value={selectedSection}
            onValueChange={(value) => {
              setSelectedSection(value as ConstructionView);
              setURLSearchParams((prev) => {
                prev.set("section", value);
                prev.delete("sub-section");
                return prev;
              });
            }}
          >
            <SelectTrigger className="w-64 capitalize">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {constructionSections.map((section) => (
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
          {isPaymentsView && (
            <Tabs
              value={selectedPaymentType}
              onValueChange={(value) => {
                setSelectedPaymentType(value as PaymentType);
                setURLSearchParams((prev) => {
                  prev.set("sub-section", value);
                  return prev;
                });
              }}
            >
              <TabsList className="grid grid-cols-3 capitalize">
                <TabsTrigger value={PaymentsSectionsEnum.PAYMENT}>
                  Payments
                </TabsTrigger>
                <TabsTrigger value={PaymentsSectionsEnum.DEDUCTION}>
                  Deduction
                </TabsTrigger>
                <TabsTrigger value={PaymentsSectionsEnum.SUNDRIES}>
                  Sundries
                </TabsTrigger>
              </TabsList>
            </Tabs>
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
                      {selectedDepartment} - {selectedSection}
                      {selectedPaymentType ? " - " + selectedPaymentType : ""}
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

export default ConstructionTab;

// type ConstructionSectionResponse =
//   | OverviewQueryResponse
//   | TeamQueryResponse
//   | ItemsQueryResponse
//   | MaterialsQueryResponse
//   | PaymentsQueryResponse
//   | VendorsQueryResponse;

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
type TeamQueryResponse = {
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
      email: string;
      phone: string;
      position: string;
      projectName: string;
      salary: string;
    },
  ];
};
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
type MaterialsQueryResponse = {
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
      totalQuantity: number;
      availableQuantity: number;
      unit: string;
    },
  ];
};
type VendorsQueryResponse = {
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
      email: string;
      phone: string;
      title: string;
      specialty: string;
      position: string;
      projectName: string;
    },
  ];
};
type PaymentsQueryResponse = {
  message: string;
  section: string;
  kind: string;
  sub: string;
  page: number;
  limit: number;
  total: number;
  count: number;
  sum: number;
  data: [
    {
      id: string;
      typeOfPayment: string;
      item: string;
      amount: number;
      date: string;
      createdAt: string;
      document: null;
      dateRecived: string;
      contractorOrSupplier: {
        id: string;
        name: string;
        role: string;
        title: string;
        position: string;
      };
      status: string;
      batchMonth: string;
    },
  ];
};
