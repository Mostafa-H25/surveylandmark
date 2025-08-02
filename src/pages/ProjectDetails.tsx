import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
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
  SquarePen,
  Hammer,
  DollarSign,
  Calendar,
  Package,
  HammerIcon,
  Box,
  Settings,
} from "lucide-react";
import { formatCurrency } from "@/helpers/formatCurrency";
import { getProjectStatusColor } from "@/helpers/getStatusColor";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConstructionTab from "@/components/pages/project-details/tabs/ConstructionTab";
import StandardsTab from "@/components/pages/project-details/tabs/StandardsTab";
import StorageTab from "@/components/pages/project-details/tabs/StorageTab";
import SalesTab from "@/components/pages/project-details/tabs/SalesTab";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    building: "",
    floor: "",
    unitName: "",
    unitModel: "",
    unitType: "",
    unitStatus: "",
  });

  const mockProject = {
    id: projectId,
    name: "Downtown Office Complex",
    status: "in_progress",
    progress: 75,
    startDate: "2024-01-15",
    endDate: "2024-12-31",
    revenue: 4398800,
    budget: 93880,
    inventory: 85,
    client: "Robert Anderson",
    company: "Metro Developers",
    description:
      "A modern office complex with sustainable design features and smart building technology integration.",
    departments: [
      {
        id: "d1",
        name: "construction",
        status: "in_progress",
        budget: 3000000,
        progress: 65,
        manager: "John Smith",
        startDate: "2024-02-15",
      },
      {
        id: "d2",
        name: "sales",
        status: "planning",
        budget: 1500000,
        progress: 20,
        manager: "Sarah Johnson",
        startDate: "2024-06-01",
      },
      {
        id: "d3",
        name: "storage",
        status: "completed",
        budget: 500000,
        progress: 100,
        manager: "Mike Davis",
        startDate: "2024-01-20",
      },
    ],
  };

  const mockDepartments = [
    {
      id: 1,
      name: "HVAC Systems",
      building: "Building A",
      floor: "Floor 3",
      units: [
        {
          name: "AC Unit 1",
          model: "Carrier 50TC",
          type: "Rooftop",
          status: "Active",
        },
        {
          name: "Heat Pump 1",
          model: "Trane XR16",
          type: "Split System",
          status: "Maintenance",
        },
      ],
    },
    {
      id: 2,
      name: "Electrical",
      building: "Building B",
      floor: "Floor 1",
      units: [
        {
          name: "Panel A1",
          model: "Square D QO",
          type: "Main Panel",
          status: "Active",
        },
        {
          name: "Generator 1",
          model: "Generac 22kW",
          type: "Standby",
          status: "Standby",
        },
      ],
    },
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters({
      building: "",
      floor: "",
      unitName: "",
      unitModel: "",
      unitType: "",
      unitStatus: "",
    });
  };

  const handleBack = () => {
    navigate("/clients");
  };

  const filteredDepartments = mockDepartments.filter((dept) => {
    if (
      filters.building &&
      !dept.building.toLowerCase().includes(filters.building.toLowerCase())
    )
      return false;
    if (
      filters.floor &&
      !dept.floor.toLowerCase().includes(filters.floor.toLowerCase())
    )
      return false;

    if (
      filters.unitName ||
      filters.unitModel ||
      filters.unitType ||
      filters.unitStatus
    ) {
      const hasMatchingUnit = dept.units.some((unit) => {
        if (
          filters.unitName &&
          !unit.name.toLowerCase().includes(filters.unitName.toLowerCase())
        )
          return false;
        if (
          filters.unitModel &&
          !unit.model.toLowerCase().includes(filters.unitModel.toLowerCase())
        )
          return false;
        if (
          filters.unitType &&
          !unit.type.toLowerCase().includes(filters.unitType.toLowerCase())
        )
          return false;
        if (filters.unitStatus && unit.status !== filters.unitStatus)
          return false;
        return true;
      });
      if (!hasMatchingUnit) return false;
    }

    return true;
  });

  return (
    <div className="container mx-auto space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft />
            Back to Clients
          </Button>
          <div>
            <h1 className="text-3xl font-bold">{mockProject.name}</h1>
            <p className="text-muted-foreground mt-2 capitalize">
              {mockProject.client} • {mockProject.company}
            </p>
          </div>
        </div>
        <Button
          onClick={handleBack}
          className="bg-blue-600 font-semibold text-white hover:bg-blue-700"
        >
          <SquarePen />
          Edit Project
        </Button>
      </div>

      {/* Project Info Cards */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm">Start Date</CardTitle>
            <Calendar className="size-4" />
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{mockProject.startDate}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm">Revenues</CardTitle>
            <DollarSign className="size-4" />
          </CardHeader>
          <CardContent>
            <p className="font-semibold">
              {formatCurrency(mockProject.revenue)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm">Inventory</CardTitle>
            <Package className="size-4" />
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{mockProject.inventory}%</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 pb-2">
            <CardTitle className="text-sm">Progress</CardTitle>
            <Hammer className="size-4" />
          </CardHeader>
          <CardContent>
            <p className="font-semibold">{mockProject.progress}%</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
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
                  {formatCurrency(mockProject.revenue)}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Overall Progress</p>
                <div className="flex max-w-40 items-center gap-2">
                  <div className="h-2 min-w-20 flex-1 rounded-full bg-gray-200">
                    <div
                      className="h-2 rounded-full bg-blue-600 transition-all"
                      style={{
                        width: `${mockProject.progress}%`,
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-900">
                    {mockProject.progress}%
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Start Date</p>
                <p className="font-medium text-gray-900">
                  {mockProject.startDate}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">End Date</p>
                <p className="font-medium text-gray-900">
                  {mockProject.endDate}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Status</p>
                <Badge
                  className={cn(
                    "capitalize",
                    getProjectStatusColor(mockProject.status),
                  )}
                >
                  {mockProject.status.replaceAll("_", " ")}
                </Badge>
              </div>
              <div className="col-span-full space-y-2">
                <p className="text-sm text-gray-600">Description</p>
                <p className="text-gray-900">{mockProject.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Departments Section */}
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
                <Button variant="outline">
                  <Filter className="size-4" />
                  Filters
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-4">
                  <h4 className="font-medium">Filter Departments</h4>

                  <div className="space-y-2">
                    <Label htmlFor="building">Building</Label>
                    <Input
                      id="building"
                      placeholder="Filter by building..."
                      value={filters.building}
                      onChange={(e) =>
                        handleFilterChange("building", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="floor">Floor</Label>
                    <Input
                      id="floor"
                      placeholder="Filter by floor..."
                      value={filters.floor}
                      onChange={(e) =>
                        handleFilterChange("floor", e.target.value)
                      }
                    />
                  </div>

                  <Separator />

                  <h5 className="text-sm font-medium">Unit Filters</h5>

                  <div className="space-y-2">
                    <Label htmlFor="unitName">Unit Name</Label>
                    <Input
                      id="unitName"
                      placeholder="Filter by unit name..."
                      value={filters.unitName}
                      onChange={(e) =>
                        handleFilterChange("unitName", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unitModel">Unit Model</Label>
                    <Input
                      id="unitModel"
                      placeholder="Filter by unit model..."
                      value={filters.unitModel}
                      onChange={(e) =>
                        handleFilterChange("unitModel", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unitType">Unit Type</Label>
                    <Input
                      id="unitType"
                      placeholder="Filter by unit type..."
                      value={filters.unitType}
                      onChange={(e) =>
                        handleFilterChange("unitType", e.target.value)
                      }
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="unitStatus">Unit Status</Label>
                    <Select
                      value={filters.unitStatus}
                      onValueChange={(value) =>
                        handleFilterChange("unitStatus", value)
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select status..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Maintenance">Maintenance</SelectItem>
                        <SelectItem value="Standby">Standby</SelectItem>
                        <SelectItem value="Offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
            {/* <Button onClick={() => navigate("/project/new")}>
              <Plus className="mr-2 size-4" />
              Add Department
            </Button> */}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* <div className="space-y-4">
            {filteredDepartments.map((department) => (
              <Card key={department.id}>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {department.name}
                      </CardTitle>
                      <p className="text-muted-foreground text-sm">
                        {department.building} • {department.floor}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium">
                      Units ({department.units.length})
                    </h4>
                    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
                      {department.units.map((unit, index) => (
                        <div
                          key={index}
                          className="bg-muted flex items-center justify-between rounded p-2"
                        >
                          <div>
                            <p className="text-sm font-medium">{unit.name}</p>
                            <p className="text-muted-foreground text-xs">
                              {unit.model} • {unit.type}
                            </p>
                          </div>
                          <Badge
                            variant={
                              unit.status === "Active"
                                ? "default"
                                : unit.status === "Maintenance"
                                  ? "destructive"
                                  : "secondary"
                            }
                          >
                            {unit.status}
                          </Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div> */}
          <Tabs defaultValue="construction" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="construction">
                <HammerIcon className="mr-2 size-4" />
                Construction
              </TabsTrigger>
              <TabsTrigger value="sales">
                <DollarSign className="mr-2 size-4" />
                Sales
              </TabsTrigger>
              <TabsTrigger value="storage">
                <Box className="mr-2 size-4" />
                Storage
              </TabsTrigger>
              <TabsTrigger value="standards">
                <Settings className="mr-2 size-4" />
                Standards
              </TabsTrigger>
            </TabsList>

            <ConstructionTab />
            <SalesTab />
            <StorageTab />
            <StandardsTab />
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProjectDetails;
