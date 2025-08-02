import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Building2,
  Plus,
  Search,
  Eye,
  Hammer,
  DollarSign,
  Package,
  ArrowRight,
  HammerIcon,
  Settings,
  Box,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import AddClientDialog from "@/components/pages/clients/dialogs/AddClientDialog";
import { clientsData } from "@/assets/data";
import { getProjectStatusColor } from "@/helpers/getStatusColor";
import { cn } from "@/lib/utils";

interface Department {
  id: string;
  name: "construction" | "sales" | "storage";
  status: "planning" | "in_progress" | "completed" | "on_hold";
  budget: number;
  progress: number;
  manager: string;
  startDate: string;
}

interface Project {
  id: string;
  name: string;
  totalBudget: number;
  startDate: string;
  endDate?: string;
  status: "planning" | "in_progress" | "completed" | "on_hold";
  departments: Department[];
}

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  projects: Project[];
  joinDate: string;
}

const ClientsManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedClient, setSelectedClient] = useState<string | null>(null);

  const [clients] = useState<Client[]>(clientsData);

  const filteredClients = clients.filter(
    (client) =>
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const getDepartmentIcon = (department: string) => {
    switch (department) {
      case "construction":
        return Hammer;
      case "sales":
        return DollarSign;
      case "storage":
        return Package;
      case "standards":
        return Settings;
      default:
        return Building2;
    }
  };

  const getDepartmentColor = (department: string) => {
    switch (department) {
      case "construction":
        return "bg-blue-100 text-blue-700";
      case "sales":
        return "bg-green-100 text-green-700";
      case "storage":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const handleViewProjects = (clientId: string) => {
    setSelectedClient(selectedClient === clientId ? null : clientId);
  };

  const handleAddNewProject = (clientId: string, clientName: string) => {
    navigate(
      `/project/new?clientId=${clientId}&clientName=${encodeURIComponent(
        clientName,
      )}`,
    );
  };

  const handleExploreProject = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  const calculateTotalBudget = (projects: Project[]) => {
    return projects.reduce((total, project) => total + project.totalBudget, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Clients & Projects
          </h1>
          <p className="mt-2 text-gray-600">
            Manage clients and their projects with construction, sales, and
            storage departments.
          </p>
        </div>

        <AddClientDialog />
      </div>

      {/* Search */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 size-4 -translate-y-1/2 transform text-gray-400" />
            <Input
              placeholder="Search clients by name, company, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Clients List */}
      <div className="space-y-4">
        {filteredClients.map((client) => (
          <Card key={client.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <Building2 className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <CardTitle className="text-xl">{client.name}</CardTitle>
                    <CardDescription>
                      {client.company} • {client.email} • {client.phone}
                    </CardDescription>
                    <div className="mt-2 flex items-center gap-4">
                      <span className="text-sm text-gray-600">
                        {client.projects.length} Project
                        {client.projects.length !== 1 ? "s" : ""}
                      </span>
                      <span className="text-sm text-gray-600">
                        Total Budget: $
                        {calculateTotalBudget(client.projects).toLocaleString()}
                      </span>
                      <span className="text-sm text-gray-600">
                        Joined: {new Date(client.joinDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAddNewProject(client.id, client.name)}
                    size="sm"
                    className="bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="mr-2 size-4" />
                    Add New Project
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewProjects(client.id)}
                  >
                    <Eye className="mr-2 size-4" />
                    {selectedClient === client.id ? "Hide" : "View"} Projects
                  </Button>
                </div>
              </div>
            </CardHeader>

            {selectedClient === client.id && (
              <CardContent>
                <div className="space-y-6">
                  <h4 className="font-semibold text-gray-900">Projects</h4>
                  {client.projects.map((project) => (
                    <div
                      key={project.id}
                      className="space-y-4 rounded-lg border bg-gray-50 p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <h5 className="text-lg font-medium text-gray-900">
                            {project.name}
                          </h5>
                          <p className="text-sm text-gray-600">
                            Started:&nbsp;
                            {new Date(project.startDate).toLocaleDateString()}
                            {project.endDate &&
                              ` • Ends: ${new Date(
                                project.endDate,
                              ).toLocaleDateString()}`}
                          </p>
                        </div>
                        <div className="space-y-2 text-right">
                          <p className="font-medium text-gray-900">
                            ${project.totalBudget.toLocaleString()}
                          </p>
                          <Badge
                            className={cn(
                              "capitalize",
                              getProjectStatusColor(project.status),
                            )}
                          >
                            {project.status.replaceAll("_", " ")}
                          </Badge>
                          <div>
                            <Button
                              onClick={() => handleExploreProject(project.id)}
                              size="sm"
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Explore Project
                              <ArrowRight className="ml-1 size-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

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

                        {project.departments.map((department) => (
                          <TabsContent
                            key={department.id}
                            value={department.name}
                            className="mt-4"
                          >
                            <div className="rounded-lg border bg-white p-4">
                              <div className="mb-3 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  {React.createElement(
                                    getDepartmentIcon(department.name),
                                    {
                                      className: "h-5 w-5 text-gray-600",
                                    },
                                  )}
                                  <h6 className="font-medium text-gray-900">
                                    {department.name.charAt(0).toUpperCase() +
                                      department.name.slice(1)}
                                    &nbsp;Department
                                  </h6>
                                </div>
                                <Badge
                                  className={getDepartmentColor(
                                    department.name,
                                  )}
                                >
                                  {department.name.charAt(0).toUpperCase() +
                                    department.name.slice(1)}
                                </Badge>
                              </div>

                              <div className="mb-3 grid grid-cols-2 gap-4">
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Manager
                                  </p>
                                  <p className="font-medium text-gray-900">
                                    {department.manager}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Budget
                                  </p>
                                  <p className="font-medium text-gray-900">
                                    ${department.budget.toLocaleString()}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Start Date
                                  </p>
                                  <p className="font-medium text-gray-900">
                                    {new Date(
                                      department.startDate,
                                    ).toLocaleDateString()}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Progress
                                  </p>
                                  <div className="flex items-center gap-2">
                                    <div className="h-2 min-w-20 flex-1 rounded-full bg-gray-200">
                                      <div
                                        className="h-2 rounded-full bg-blue-600 transition-all"
                                        style={{
                                          width: `${department.progress}%`,
                                        }}
                                      ></div>
                                    </div>
                                    <span className="text-sm font-medium text-gray-900">
                                      {department.progress}%
                                    </span>
                                  </div>
                                </div>
                              </div>

                              <Badge
                                className={cn(
                                  "capitalize",
                                  getProjectStatusColor(department.status),
                                )}
                              >
                                {department.status.replaceAll("_", " ")}
                              </Badge>
                            </div>
                          </TabsContent>
                        ))}
                      </Tabs>
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ClientsManagement;
