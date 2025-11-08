import { useCallback, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Filter,
  Calendar,
  User,
  Building,
  Layers,
  CheckCircle,
  XCircle,
  DollarSign,
  TrendingUp,
  Factory,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ImageGallery from "@/components/ImageGallary";
import EvaluationSection from "@/components/EvaluationSection";
import FilterDialog from "@/components/FilterDialog";
import { useQuery } from "@tanstack/react-query";
import { getItemByIdApi } from "@/api/projects/get-item-by-id.api";

const ITEM_QUERY_KEY = "item";

const ItemPage = () => {
  const { projectId, itemId } = useParams();
  const navigate = useNavigate();
  const [showFilter, setShowFilter] = useState(false);

  const { data } = useQuery({
    queryKey: [ITEM_QUERY_KEY, projectId, itemId],
    queryFn: () => getItemByIdApi(projectId!, itemId!),
    select: useCallback((data) => {
      console.log(data);
    }, []),
  });

  // Mock data - in real app this would come from API
  const itemData = {
    name: "Foundation Work - Tower A",
    siteEngineer: "John Smith",
    contractor: "Elite Construction Co.",
    startDate: "2024-01-15",
    status: "In Progress",
    material: "Reinforced Concrete",
    dimensions: "50m x 30m x 8m",
    type: "Foundation",
    acceptedImages: [
      "/lovable-uploads/6dda9587-fff7-42c0-ad87-4602672660c4.png",
      "/lovable-uploads/6dda9587-fff7-42c0-ad87-4602672660c4.png",
    ],
    dateOfAcceptance: "2024-01-20",
    refusedItems: 3,
    refusedImages: [
      "/lovable-uploads/6dda9587-fff7-42c0-ad87-4602672660c4.png",
    ],
    contractorEvaluation: 4.2,
    confirmations: [
      {
        role: "Project Manager",
        name: "Sarah Johnson",
        date: "2024-01-18",
        time: "10:30 AM",
      },
      {
        role: "Site Engineer",
        name: "John Smith",
        date: "2024-01-19",
        time: "2:15 PM",
      },
      {
        role: "Quality Inspector",
        name: "Mike Davis",
        date: "2024-01-19",
        time: "4:45 PM",
      },
      {
        role: "Safety Officer",
        name: "Lisa Chen",
        date: "2024-01-20",
        time: "9:00 AM",
      },
      {
        role: "Client Representative",
        name: "Robert Wilson",
        date: "2024-01-20",
        time: "11:20 AM",
      },
    ],
    payments: 2500000,
    deductions: 50000,
    achievementPercentage: 65,
    manufacturerCostPerDay: 15000,
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
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
                {itemData.name}
              </h1>
              <p className="text-sm text-gray-500">Item ID: {itemId}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilter(true)}
              className="flex cursor-pointer items-center gap-2"
            >
              <Filter className="size-4" />
              Filter
            </Button>
            <Button
              size="sm"
              className="cursor-pointer bg-blue-600 hover:bg-blue-700"
            >
              Edit Item
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl p-6">
        {/* Quick Stats */}
        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Status</p>
                  <Badge
                    variant="secondary"
                    className="mt-1 bg-yellow-100 text-yellow-800"
                  >
                    {itemData.status}
                  </Badge>
                </div>
                <TrendingUp className="size-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Progress</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {itemData.achievementPercentage}%
                  </p>
                </div>
                <CheckCircle className="size-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Payments</p>
                  <p className="text-2xl font-bold text-gray-900">
                    ${itemData.payments.toLocaleString()}
                  </p>
                </div>
                <DollarSign className="size-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">
                    Confirmations
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {itemData.confirmations.length}
                  </p>
                </div>
                <Users className="size-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="progress">Progress & Images</TabsTrigger>
            <TabsTrigger value="confirmations">Confirmations</TabsTrigger>
            <TabsTrigger value="financials">Financials</TabsTrigger>
            <TabsTrigger value="evaluation">Evaluation</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Basic Information */}
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
                          {itemData.siteEngineer}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Contractor
                      </label>
                      <p className="mt-1 text-gray-900">
                        {itemData.contractor}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Start Date
                      </label>
                      <div className="mt-1 flex items-center gap-2">
                        <Calendar className="size-4 text-gray-400" />
                        <span className="text-gray-900">
                          {itemData.startDate}
                        </span>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-500">
                        Type
                      </label>
                      <p className="mt-1 text-gray-900">{itemData.type}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Technical Specifications */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Layers className="size-5" />
                    Technical Specifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Material
                    </label>
                    <p className="mt-1 text-gray-900">{itemData.material}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Dimensions
                    </label>
                    <p className="mt-1 text-gray-900">{itemData.dimensions}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="confirmations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="size-5" />
                  Project Confirmations ({itemData.confirmations.length})
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {itemData.confirmations.map((confirmation, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-green-200 bg-green-50 p-4"
                    >
                      <div className="flex items-center gap-3">
                        <CheckCircle className="size-5 text-green-600" />
                        <div>
                          <p className="font-semibold text-gray-900">
                            {confirmation.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            {confirmation.role}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {confirmation.date}
                        </p>
                        <p className="text-xs text-gray-500">
                          {confirmation.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Progress Overview */}
              <Card>
                <CardHeader>
                  <CardTitle>Achievement Progress</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="mb-2 flex justify-between text-sm">
                      <span>Overall Progress</span>
                      <span>{itemData.achievementPercentage}%</span>
                    </div>
                    <Progress
                      value={itemData.achievementPercentage}
                      className="h-2"
                    />
                  </div>
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="rounded-lg bg-green-50 p-4 text-center">
                      <CheckCircle className="mx-auto mb-2 size-8 text-green-600" />
                      <p className="text-lg font-semibold text-green-600">
                        {itemData.acceptedImages.length}
                      </p>
                      <p className="text-sm text-gray-600">Accepted Items</p>
                    </div>
                    <div className="rounded-lg bg-red-50 p-4 text-center">
                      <XCircle className="mx-auto mb-2 size-8 text-red-600" />
                      <p className="text-lg font-semibold text-red-600">
                        {itemData.refusedItems}
                      </p>
                      <p className="text-sm text-gray-600">Refused Items</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Acceptance Details */}
              <Card>
                <CardHeader>
                  <CardTitle>Acceptance Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Date of Acceptance
                    </label>
                    <div className="mt-1 flex items-center gap-2">
                      <Calendar className="size-4 text-gray-400" />
                      <span className="text-gray-900">
                        {itemData.dateOfAcceptance}
                      </span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">
                      Manufacturer Cost
                    </label>
                    <div className="mt-1 flex items-center gap-2">
                      <Factory className="size-4 text-gray-400" />
                      <span className="text-gray-900">
                        ${itemData.manufacturerCostPerDay.toLocaleString()}/day
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Image Galleries */}
            <div className="space-y-6">
              <ImageGallery
                title="Accepted Item Images"
                images={itemData.acceptedImages}
                type="accepted"
              />
              <ImageGallery
                title="Refused Item Images"
                images={itemData.refusedImages}
                type="refused"
              />
            </div>
          </TabsContent>

          <TabsContent value="financials" className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-green-600">Payments</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-3xl font-bold text-green-600">
                    ${itemData.payments.toLocaleString()}
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
                    ${itemData.deductions.toLocaleString()}
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
                    $
                    {(itemData.payments - itemData.deductions).toLocaleString()}
                  </p>
                  <p className="mt-2 text-sm text-gray-500">After deductions</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="evaluation">
            <EvaluationSection
              rating={itemData.contractorEvaluation}
              contractor={itemData.contractor}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Filter Dialog */}
      <FilterDialog open={showFilter} onOpenChange={setShowFilter} />
    </div>
  );
};

export default ItemPage;
