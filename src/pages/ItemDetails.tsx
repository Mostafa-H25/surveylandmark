import { useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  User,
  Building,
  CheckCircle,
  DollarSign,
  TrendingUp,
  CircleSlash,
  Users,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import FilterDialog from "@/components/pages/project-details/FilterDialog";
import { useQuery } from "@tanstack/react-query";
import { getItemByIdApi } from "@/api/projects/get-item-by-id.api";
import { formatCurrency } from "@/helpers/formatCurrency";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ItemTabsEnum } from "@/constants/defaults";
import { Progress } from "@/components/ui/progress";
import ImageGallery from "@/components/ImageGallary";
import { formatDate } from "@/helpers/formatDate";
import { formatTime } from "@/helpers/formatTime";

const ITEM_QUERY_KEY = "item";

const ItemDetails = () => {
  const { projectId, itemId } = useParams();
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);
  const [section, setSection] = useState(ItemTabsEnum.OVERVIEW);

  const { data: item, isFetching } = useQuery({
    queryKey: [ITEM_QUERY_KEY, projectId, itemId, section],
    queryFn: () => getItemByIdApi(projectId!, itemId!, section),
    select: useCallback((data: ItemQueryResponse) => {
      return {
        name: data?.name,
        status: data?.status,
        totalQuantity: data?.quantity,
        executedQuantity: data?.progress?.executedQuantity,
        implementedQuantity: data?.executedQuantity,
        contractor: data?.contractor?.name,
        siteEngineer: data?.assignedTo?.name,
        netCosts: data?.netCosts ?? data?.financial?.totalFinancial,
        payments: data?.payments ?? data?.financial?.totalPayments,
        deductions: data?.deductions ?? data?.financial?.totalDeductions,
        sundries: data?.sundries ?? data?.financial?.totalSundries,
        achievementPercentage: data?.progress?.progressPercentage,
        acceptedImages: data?.progress?.acceptedSubmissions,
        refusedImages: data?.progress?.rejectedSubmissions,
        confirmations: [
          ...(data?.confirmation?.accepted ?? []),
          ...(data?.confirmation?.rejected ?? []),
        ].sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
        ),
      };
    }, []),
  });

  const handleBack = () => {
    navigate(-1);
  };

  if (isFetching && !item) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (!item) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyMedia variant="icon">
            <CircleSlash color="#4a5565 " />
          </EmptyMedia>
          <EmptyTitle>No data</EmptyTitle>
          <EmptyDescription>No data found</EmptyDescription>
        </EmptyHeader>
        <EmptyContent></EmptyContent>
      </Empty>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBack}
              className="flex cursor-pointer items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ArrowLeft className="size-4" />
              Back to Projects
            </Button>
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">
                {item?.name}
              </h1>
              <p className="text-sm text-gray-500">Item ID: {itemId}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="h-full w-full p-6">
              <div className="flex h-full items-center justify-between">
                <div className="flex h-full flex-col justify-between">
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge
                    variant="secondary"
                    className="mt-1 bg-yellow-100 text-yellow-800"
                  >
                    {item?.status}
                  </Badge>
                </div>
                <TrendingUp className="size-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="h-full w-full p-6">
              <div className="flex h-full items-center justify-between">
                <div className="flex h-full flex-col justify-between">
                  <p className="text-sm font-medium text-gray-500">
                    Total Quantity
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {item?.totalQuantity}
                  </p>
                </div>
                <CheckCircle className="size-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="h-full w-full p-6">
              <div className="flex h-full items-center justify-between">
                <div className="flex h-full flex-col justify-between">
                  <p className="text-sm font-medium text-gray-500">
                    Implemented Quantity
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {item?.implementedQuantity}
                  </p>
                </div>
                <CheckCircle className="size-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="h-full w-full p-6">
              <div className="flex h-full items-center justify-between">
                <div className="flex h-full flex-col justify-between">
                  <p className="text-sm font-medium text-gray-500">
                    Costs till now
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {formatCurrency(item?.payments)}
                  </p>
                </div>
                <DollarSign className="size-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs
          defaultValue={section}
          onValueChange={(value) => setSection(value)}
          className="space-y-6"
        >
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value={ItemTabsEnum.OVERVIEW}>Overview</TabsTrigger>
            <TabsTrigger value={ItemTabsEnum.PROGRESS}>
              Progress & Images
            </TabsTrigger>
            <TabsTrigger value={ItemTabsEnum.CONFIRMATION}>
              Confirmations
            </TabsTrigger>
            <TabsTrigger value={ItemTabsEnum.FINANCIAL}>Financial</TabsTrigger>
          </TabsList>

          <TabsContent value={ItemTabsEnum.OVERVIEW} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Building className="size-5" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Site Engineer
                      </label>
                      <div className="mt-1 flex items-center gap-2">
                        <User className="size-4 text-gray-400" />
                        <span className="text-gray-900">
                          {item?.siteEngineer}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Contractor
                      </label>
                      <p className="mt-1 text-gray-900">{item?.contractor}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value={ItemTabsEnum.FINANCIAL} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">
                    {formatCurrency(item?.payments)}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Total payments made
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-red-600">Deductions</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-red-600">
                    {formatCurrency(item?.deductions)}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">Total deductions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-blue-600">Net Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-blue-600">
                    {formatCurrency(item?.netCosts)}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">After deductions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-yellow-600">Sundries</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-yellow-600">
                    {formatCurrency(item?.sundries)}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">Total Sundries</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value={ItemTabsEnum.PROGRESS} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Achievement Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{item?.achievementPercentage}%</span>
                    </div>
                    <Progress
                      value={item?.achievementPercentage}
                      className="h-2"
                    />
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-green-50 p-4 text-center">
                      <CheckCircle className="mx-auto mb-2 size-8 text-green-600" />
                      <p className="text-lg font-semibold text-green-600">
                        {item?.acceptedImages?.length}
                      </p>
                      <p className="text-sm text-gray-600">Accepted Items</p>
                    </div>
                    <div className="rounded-lg bg-red-50 p-4 text-center">
                      <XCircle className="mx-auto mb-2 size-8 text-red-600" />
                      <p className="text-lg font-semibold text-red-600">
                        {item?.refusedImages?.length}
                      </p>
                      <p className="text-sm text-gray-600">Refused Items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Accepted Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-2 flex flex-col justify-between text-sm">
                      <span>Total Quantity</span>
                      <span>{item?.totalQuantity}</span>
                    </div>
                    <div className="mb-2 flex flex-col justify-between text-sm">
                      <span>Executed Quantity</span>
                      <span>{item?.executedQuantity}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="space-y-6">
              <ImageGallery
                title="Accepted Item Images"
                images={item?.acceptedImages?.flatMap(
                  (images) => images.attachments,
                )}
                type="accepted"
              />
              <ImageGallery
                title="Refused Item Images"
                images={item?.refusedImages?.flatMap(
                  (images) => images.attachments,
                )}
                type="refused"
              />
            </div>
          </TabsContent>

          <TabsContent value={ItemTabsEnum.CONFIRMATION} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="size-5" />
                  Project Confirmations ({item?.confirmations?.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {!isFetching && item?.confirmations?.length === 0 && (
                    <Empty>
                      <EmptyHeader>
                        <EmptyMedia variant="icon">
                          <CircleSlash color="#4a5565 " />
                        </EmptyMedia>
                        <EmptyTitle>No data</EmptyTitle>
                        <EmptyDescription>No data found</EmptyDescription>
                      </EmptyHeader>
                      <EmptyContent></EmptyContent>
                    </Empty>
                  )}
                  {item?.confirmations?.map((confirmation, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="size-5 text-green-600" />
                        <div>
                          <p className="font-semibold text-gray-900 capitalize">
                            {confirmation?.recipients[0].name}
                          </p>
                          <p className="text-sm text-gray-600 capitalize">
                            {confirmation?.recipients[0].title}
                          </p>
                        </div>
                      </div>
                      {confirmation?.date && (
                        <div className="text-right">
                          <p className="text-sm font-medium text-gray-900">
                            {formatDate(confirmation.date)}
                          </p>
                          <p className="text-xs text-gray-500">
                            {formatTime(confirmation.date)}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <FilterDialog open={showFilter} onOpenChange={setShowFilter} />
    </div>
  );
};

export default ItemDetails;

type ItemQueryResponse = {
  message: string;
  id: string;
  name: string;
  quantity: number;
  executedQuantity: number;
  status: string;
  netCosts: number;
  payments: number;
  deductions: number;
  sundries: number;
  workItem: { id: string; name: string };
  contractor: {
    id: string;
    name: string;
    email: string;
    title: string;
  };
  assignedTo: {
    id: string;
    name: string;
    email: string;
    title: string;
  };
  financial: {
    totalPayments: number;
    totalDeductions: number;
    totalSundries: number;
    totalFinancial: number;
  };
  confirmation: {
    accepted: {
      recipients: {
        email: string;
        id: string;
        name: string;
        title: string;
      }[];
      // name: string;
      // role: string;
      date: string;
      // time: string;
    }[];
    rejected: {
      recipients: {
        email: string;
        id: string;
        name: string;
        title: string;
      }[];
      // name: string;
      // role: string;
      date: string;
      // time: string;
    }[];
  };
  progress: {
    totalQuantity: number;
    executedQuantity: number;
    progressPercentage: number;
    acceptedSubmissions: {
      attachments: [];
      date: string;
      rating: number;
    }[];
    rejectedSubmissions: {
      attachments: [];
      date: string;
      rating: number;
    }[];
  };
};
