import { useCallback, useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Filter,
  ArrowLeft,
  Hammer,
  DollarSign,
  Calendar,
  Package,
  HammerIcon,
  Box,
  CircleSlash,
  DollarSignIcon,
  BoxIcon,
} from "lucide-react";
import { formatCurrency } from "@/helpers/formatCurrency";
import { getProjectStatusColor } from "@/helpers/getStatusColor";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConstructionTab from "@/components/pages/project-details/tabs/ConstructionTab";
import StorageTab from "@/components/pages/project-details/tabs/StorageTab";
import SalesTab from "@/components/pages/project-details/tabs/SalesTab";
import { useQuery } from "@tanstack/react-query";
import { getProjectByIdApi } from "@/api/projects/get-project-by-id.api";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { formatDate } from "@/helpers/formatDate";
import { formatCamelCaseToText } from "@/helpers/formatCamelCaseToText";
import { getDepartmentsByProjectIdApi } from "@/api/projects/get-departments-by-project-id.api";
import type { DepartmentType } from "@/types/default";
import { CategoriesEnum } from "@/constants/defaults";
import EmptyDepartmentCard from "@/components/pages/project-details/EmptyDepartmentCard";
import { getBuildingsByProjectIdApi } from "@/api/projects/get-buildings-by-project-id.api";
import { getFloorsByBuildingIdApi } from "@/api/projects/get-floors-by-building-id.api";
import { getUnitsByFloorIdApi } from "@/api/projects/get-units-by-floors-id.api";
import { ROUTES } from "@/constants/routes";

const PROJECT_QUERY_KEY = "project";
const DEPARTMENTS_QUERY_KEY = "departments";
const BUILDINGS_QUERY_KEY = "buildings";
const FLOORS_QUERY_KEY = "floors";
const UNITS_QUERY_KEY = "units";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();
  const [URLSearchParams, setURLSearchParams] = useSearchParams();
  const urlMain = URLSearchParams.get("main") as DepartmentType | null;

  const [selectedDepartment, setSelectedDepartment] = useState<DepartmentType>(
    urlMain ?? CategoriesEnum.CONSTRUCTION,
  );

  const [selectedBuilding, setSelectedBuilding] = useState<string>("");
  const [selectedFloor, setSelectedFloor] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>("");

  const { data: project, isFetching } = useQuery({
    queryKey: [PROJECT_QUERY_KEY, projectId],
    enabled: !!projectId,
    queryFn: () => getProjectByIdApi(projectId!),
    select: useCallback((data: ProjectQueryResponse) => {
      return {
        id: data.project.id,
        name: data.project.name,
        startDate: data.project.startDate,
        endDate: data.project.endDate,
        status: data.project.status,
        description: data.project.description,
        itemsCount: data.cards.itemsCount,
        revenue: data.cards.revenues,
        inventory: {
          stockLevelPct: data.cards.inventory.stockLevelPct,
          consumedPct: data.cards.inventory.consumedPct,
          remainingQty: data.cards.inventory.remainingQty,
          consumedQty: data.cards.inventory.consumedQty,
          totalQty: data.cards.inventory.totalQty,
        },
        progress: data.cards.progressPct,
        totalCost: data.totals.totalSpent,
        costsBreakdown: {
          paymentsPaid: data.totals.breakdown.paymentsPaid,
          pettyCash: data.totals.breakdown.pettyCash,
          inventory: data.totals.breakdown.inventory,
        },
        totalBudget: data.overview.totalBudget,
        processCount: {
          total: data.processCounts.total,
          completed: data.processCounts.completed,
        },
      };
    }, []),
  });

  const { data: buildings, isFetching: isFetchingBuildings } = useQuery({
    queryKey: [BUILDINGS_QUERY_KEY, projectId],
    enabled: !!project,
    queryFn: () => getBuildingsByProjectIdApi(projectId!),
    select: useCallback(
      (data: FilterQueryResponse) =>
        data.map((building) => ({
          id: building._id,
          name: building.name,
        })),
      [],
    ),
  });

  const { data: floors, isFetching: isFetchingFloors } = useQuery({
    queryKey: [FLOORS_QUERY_KEY, projectId, selectedBuilding],
    enabled: !!project && !!selectedBuilding.length,
    queryFn: () => getFloorsByBuildingIdApi(projectId!, selectedBuilding!),
    select: useCallback(
      (data: FilterQueryResponse) =>
        data.map((floor) => ({
          id: floor._id,
          name: floor.name,
        })),
      [],
    ),
  });

  const { data: units, isFetching: isFetchingUnits } = useQuery({
    queryKey: [UNITS_QUERY_KEY, projectId, selectedBuilding, selectedFloor],
    enabled: !!project && !!selectedBuilding.length && !!selectedFloor.length,
    queryFn: () =>
      getUnitsByFloorIdApi(projectId!, selectedBuilding!, selectedFloor!),
    select: useCallback(
      (data: UnitsQueryResponse) =>
        data.units.map((unit) => ({
          id: unit._id,
          name: unit.name,
        })),
      [],
    ),
  });

  const filters = {
    buildingId: selectedBuilding,
    floorId: selectedFloor,
    unitId: selectedUnit,
  };

  const { data: departments, isFetching: isFetchingDepartments } = useQuery({
    queryKey: [
      DEPARTMENTS_QUERY_KEY,
      projectId,
      selectedBuilding,
      selectedFloor,
      selectedUnit,
    ],
    enabled:
      !!projectId &&
      !!selectedBuilding.length &&
      !!selectedFloor.length &&
      !!selectedUnit.length,
    queryFn: () => getDepartmentsByProjectIdApi(projectId!, filters),
    select: useCallback((data: DepartmentQueryResponse) => {
      return data.departments;
    }, []),
  });

  const clearFilters = () => {
    setSelectedBuilding("");
    setSelectedFloor("");
    setSelectedUnit("");
  };

  const handleBack = () => {
    navigate(ROUTES.CLIENTS);
  };

  // const handleEdit = () => {};
  if (isFetching && !project) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="aspect-square h-full max-h-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
      </div>
    );
  }
  if (!project) {
    return (
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
    );
  }
  return (
    <div className="container mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <Button
            variant="outline"
            onClick={handleBack}
            className="cursor-pointer"
          >
            <ArrowLeft />
            Back to Clients
          </Button>
          <div>
            <h1 className="text-3xl font-bold capitalize">{project.name}</h1>
            {/* <p className="text-muted-foreground mt-2 capitalize">
              {project.client} • {project.company}
            </p> */}
          </div>
        </div>
        {/* <Button
          onClick={handleEdit}
          className="bg-blue-600 font-semibold text-white hover:bg-blue-700"
        >
          <SquarePen />
          Edit Project
        </Button> */}
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm">Start Date</CardTitle>
            <Calendar className="size-4" />
          </CardHeader>
          <CardContent>
            <p className="font-semibold">
              {project.startDate ? formatDate(project.startDate) : "-"}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm">Revenues</CardTitle>
            <DollarSign className="size-4" />
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{formatCurrency(project.revenue)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm">Inventory</CardTitle>
            <Package className="size-4" />
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{project.inventory.stockLevelPct}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm">Progress</CardTitle>
            <Hammer className="size-4" />
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{project.progress}%</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold">
            Project Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <div className="grid grid-cols-4 justify-between gap-4">
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Budget</p>
                <p className="font-medium text-gray-900">
                  {formatCurrency(project.totalBudget)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Overall Progress</p>
                <div className="flex max-w-40 items-center gap-2">
                  <div className="h-2 min-w-20 flex-1 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600 transition-all"
                      style={{
                        width: `${project.progress}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {project.progress}%
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="font-medium text-gray-900">
                  {project.startDate ? formatDate(project.startDate) : "-"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">End Date</p>
                <p className="font-medium text-gray-900">
                  {project.endDate ? formatDate(project.endDate) : "-"}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Status</p>
                <Badge
                  className={cn(
                    "capitalize",
                    getProjectStatusColor(project.status),
                  )}
                >
                  {formatCamelCaseToText(project.status)}
                </Badge>
              </div>
              <div className="col-span-full space-y-2">
                <p className="text-sm text-gray-600">Description</p>
                <p className="text-gray-900">{project.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-2xl">Departments</CardTitle>
            <CardDescription>
              Detailed view of all project departments
            </CardDescription>
          </div>
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="cursor-pointer">
                  <Filter className="size-4" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter Departments</h4>
                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="buildingId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Building
                    </Label>
                    <Select
                      name="buildingId"
                      value={selectedBuilding}
                      onValueChange={(value) => setSelectedBuilding(value)}
                    >
                      <SelectTrigger id="buildingId" className="capitalize">
                        <SelectValue placeholder="Filter by building..." />
                      </SelectTrigger>
                      <SelectContent>
                        {isFetchingBuildings && !buildings && (
                          <div className="flex h-full w-full items-center justify-center">
                            <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
                          </div>
                        )}
                        {buildings?.map((building) => (
                          <SelectItem
                            key={building.id}
                            value={building.id}
                            className="capitalize"
                          >
                            <span className="px-2">{building.name}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="floorId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Floor
                    </Label>
                    <Select
                      name="floorId"
                      value={selectedFloor}
                      onValueChange={(value) => setSelectedFloor(value)}
                    >
                      <SelectTrigger id="floorId" className="capitalize">
                        <SelectValue placeholder="Filter by floor..." />
                      </SelectTrigger>
                      <SelectContent>
                        {isFetchingFloors && !floors && (
                          <div className="flex h-full w-full items-center justify-center">
                            <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
                          </div>
                        )}
                        {!selectedBuilding && (
                          <p className="flex h-8 items-center justify-center text-xs text-gray-600">
                            Please select building to display floor options.
                          </p>
                        )}
                        {floors?.map((floor) => (
                          <SelectItem
                            key={floor.id}
                            value={floor.id}
                            className="capitalize"
                          >
                            <span className="px-2">{floor.name}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Label
                      htmlFor="unitId"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Unit
                    </Label>
                    <Select
                      name="unitId"
                      value={selectedUnit}
                      onValueChange={(value) => setSelectedUnit(value)}
                    >
                      <SelectTrigger id="unitId" className="capitalize">
                        <SelectValue placeholder="Filter by unit..." />
                      </SelectTrigger>
                      <SelectContent>
                        {isFetchingUnits && !units && (
                          <div className="flex h-full w-full items-center justify-center">
                            <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
                          </div>
                        )}
                        {!selectedFloor && (
                          <p className="flex h-8 items-center justify-center text-xs text-gray-600">
                            Please select floor to display unit options.
                          </p>
                        )}
                        {units?.map((unit) => (
                          <SelectItem
                            key={unit.id}
                            value={unit.id}
                            className="capitalize"
                          >
                            <span className="px-2">{unit.name}</span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                      className="w-full cursor-pointer"
                    >
                      Clear Filters
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-stretch gap-4">
            <Card className="flex-1">
              <CardHeader>
                <div className="space-y-2">
                  <div className="flex w-full items-center justify-between gap-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <Hammer className="text-blue-600" />
                      <span>Construction</span>
                    </CardTitle>
                    <Badge
                      className={cn(
                        "capitalize",
                        getProjectStatusColor(project.status),
                      )}
                    >
                      {formatCamelCaseToText(project.status)}
                    </Badge>
                  </div>
                  <div className="text-sm text-[##64748B]">
                    Main construction activities including foundation,
                    structure, and finishing work.
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isFetchingDepartments ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
                  </div>
                ) : !departments?.construction ? (
                  <EmptyDepartmentCard />
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-sm capitalize">
                      <span className="text[#4B5563]">Cost till now</span>
                      <span className="font-semibold text-[#020817]">
                        {departments?.construction.costTillNow}
                      </span>
                    </div>
                    {/* <div className="flex items-center justify-between gap-2 text-sm capitalize">
                      <span className="text[#4B5563]">Manager</span>
                      <span className="font-semibold text-[#020817]">
                        { }
                      </span>
                    </div> */}
                    <div className="flex items-center justify-between gap-2 text-sm capitalize">
                      <span className="text[#4B5563]">Building</span>
                      <span className="font-semibold text-[#020817]">
                        {buildings?.find(
                          (building) => building.id === selectedBuilding,
                        )?.name || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-sm capitalize">
                      <span className="text[#4B5563]">Floor</span>
                      <span className="font-semibold text-[#020817]">
                        {floors?.find((floor) => floor.id === selectedFloor)
                          ?.name || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-sm capitalize">
                      <span className="text[#4B5563]">Unit Type</span>
                      <span className="font-semibold text-[#020817]">
                        {units?.find((unit) => unit.id === selectedUnit)
                          ?.name || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-sm capitalize">
                      <span className="text[#4B5563]">Progress</span>
                      <span className="font-semibold text-[#020817]">
                        {departments?.construction.progressPct}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader>
                <div className="space-y-2">
                  <div className="flex w-full items-center justify-between gap-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <DollarSignIcon className="text-green-600" />
                      <span>Sales</span>
                    </CardTitle>
                    <Badge
                      className={cn(
                        "capitalize",
                        getProjectStatusColor(project.status),
                      )}
                    >
                      {formatCamelCaseToText(project.status)}
                    </Badge>
                  </div>
                  <div className="text-sm text-[##64748B]">
                    Marketing and sales activities for residential and
                    commercial units.
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isFetchingDepartments ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
                  </div>
                ) : !departments?.sales ? (
                  <EmptyDepartmentCard />
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 text-sm capitalize">
                      <span className="text[#4B5563]">Revenue till now</span>
                      <span className="font-semibold text-[#020817]">
                        {departments?.sales.revenues}
                      </span>
                    </div>
                    {/* <div className="flex items-center justify-between gap-2 text-sm capitalize">
                      <span className="text[#4B5563]">Manager</span>
                      <span className="font-semibold text-[#020817]">
                        {}
                      </span>
                    </div> */}
                    <div className="flex items-center justify-between gap-2 text-sm capitalize">
                      <span className="text[#4B5563]">Building</span>
                      <span className="font-semibold text-[#020817]">
                        {buildings?.find(
                          (building) => building.id === selectedBuilding,
                        )?.name || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-sm capitalize">
                      <span className="text[#4B5563]">Floor</span>
                      <span className="font-semibold text-[#020817]">
                        {floors?.find((floor) => floor.id === selectedFloor)
                          ?.name || "N/A"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2 text-sm capitalize">
                      <span className="text[#4B5563]">Unit Type</span>
                      <span className="font-semibold text-[#020817]">
                        {units?.find((unit) => unit.id === selectedUnit)
                          ?.name || "N/A"}
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="flex-1">
              <CardHeader>
                <div className="space-y-2">
                  <div className="flex w-full items-center justify-between gap-4">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <BoxIcon className="text-purple-600" />
                      <span>Storage</span>
                    </CardTitle>
                    <Badge
                      className={cn(
                        "capitalize",
                        getProjectStatusColor(project.status),
                      )}
                    >
                      {formatCamelCaseToText(project.status)}
                    </Badge>
                  </div>
                  <div className="text-sm text-[##64748B]">
                    Materials procurement and inventory management.
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {isFetchingDepartments ? (
                  <div className="flex h-full w-full items-center justify-center">
                    <div className="size-4 animate-spin rounded-full border-r-2 border-blue-300" />
                  </div>
                ) : !departments?.sales ? (
                  <EmptyDepartmentCard />
                ) : (
                  <div className="space-y-3 capitalize">
                    <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="text[#4B5563]">Cost till now</span>
                      <span className="font-semibold text-[#020817]">
                        {departments?.storage.costTillNow}
                      </span>
                    </div>
                    {/* <div className="flex items-center justify-between gap-2 text-sm">
                      <span className="text[#4B5563]">Manager</span>
                      <span className="font-semibold text-[#020817]">
                        {departments?.construction.progressPct}
                      </span>
                    </div> */}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
          <Tabs
            value={selectedDepartment}
            onValueChange={(value) => {
              setSelectedDepartment(value as DepartmentType);
              setURLSearchParams((prev) => {
                prev.set("main", value);
                prev.delete("section");
                prev.delete("sub-section");
                return prev;
              });
            }}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value={CategoriesEnum.CONSTRUCTION}
                className="capitalize"
              >
                <HammerIcon className="mr-2 size-4" />
                {CategoriesEnum.CONSTRUCTION}
              </TabsTrigger>
              <TabsTrigger value={CategoriesEnum.SALES} className="capitalize">
                <DollarSign className="mr-2 size-4" />
                {CategoriesEnum.SALES}
              </TabsTrigger>
              <TabsTrigger
                value={CategoriesEnum.STORAGE}
                className="capitalize"
              >
                <Box className="mr-2 size-4" />
                {CategoriesEnum.STORAGE}
              </TabsTrigger>
              {/* <TabsTrigger value="standards">
                <Settings className="mr-2 size-4" />
                Standards
              </TabsTrigger> */}
            </TabsList>

            <ConstructionTab selectedDepartment={selectedDepartment} />
            <SalesTab selectedDepartment={selectedDepartment} />
            <StorageTab selectedDepartment={selectedDepartment} />
            {/* <StandardsTab /> */}
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetails;

type ProjectQueryResponse = {
  message: string;
  success: boolean;
  project: {
    id: string;
    name: string;
    startDate: string | null;
    endDate: string | null;
    status: string;
    description: string;
  };
  cards: {
    itemsCount: number;
    revenues: number;
    inventory: {
      stockLevelPct: number;
      consumedPct: number;
      remainingQty: number;
      consumedQty: number;
      totalQty: number;
    };
    progressPct: number;
  };
  totals: {
    totalSpent: number;
    breakdown: {
      paymentsPaid: number;
      pettyCash: number;
      inventory: number;
    };
  };
  overview: {
    totalBudget: number;
  };
  processCounts: {
    total: number;
    completed: number;
  };
};

type DepartmentQueryResponse = {
  message: string;
  success: boolean;
  project: {
    id: string;
    name: string;
    startDate: null;
    endDate: null;
    status: string;
    description: string;
  };
  scope: {
    projectId: string;
    buildingId: string;
    floorId: string;
    unitId: string;
  };
  departments: {
    construction: {
      status: string;
      progressPct: number;
      costTillNow: number;
    };
    sales: {
      revenues: number;
    };
    storage: {
      costTillNow: number;
    };
  };
};

type FilterQueryResponse = { _id: string; name: string }[];
type UnitsQueryResponse = {
  message: string;
  units: { _id: string; name: string }[];
};
