import { useCallback, useEffect, useState } from "react";
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

import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

import {
  Building2,
  Plus,
  Search,
  Eye,
  ArrowRight,
  CircleSlash,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getProjectStatusColor } from "@/helpers/getStatusColor";
import { cn } from "@/lib/utils";
import AddClientDialog from "@/components/pages/clients/dialogs/add-client/AddClientDialog";
import { useQuery } from "@tanstack/react-query";
import { getAllClientsApi } from "@/api/clients/get-all-clients.api";
import { formatDate } from "@/helpers/formatDate";
import { formatCamelCaseToText } from "@/helpers/formatCamelCaseToText";
import { formatCurrency } from "@/helpers/formatCurrency";
import Paginator from "@/components/shared/Paginator";
import { useDebounce } from "@/hooks/use-debounce";

const CLIENTS_QUERY_KEY = "clients";

const ClientsManagement = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [paginator, setPaginator] = useState({ page: 1, limit: 10, total: 0 });
  const [selectedClient, setSelectedClient] = useState<string | null>(null);
  const debouncedSearchTerm = useDebounce(searchTerm);

  const { data, isFetching } = useQuery({
    queryKey: [CLIENTS_QUERY_KEY, paginator.page, debouncedSearchTerm],
    queryFn: () =>
      getAllClientsApi({
        pagination: { page: paginator.page, limit: paginator.limit },
        filters: { search: debouncedSearchTerm },
      }),
    select: useCallback((data: ClientQueryResponse) => {
      return {
        meta: { page: data.data.currentPage, total: data.data.totalClients },
        clients: data.data.clients.map((option) => ({
          id: option.client.id,
          name: option.client.name,
          email: option.client.email,
          phone: option.client.phone,
          company: option.client.company,
          joinDate: option.client.joinDate,

          projectsCount: option.projects.count,
          totalBudget: option.projects.totalBudget,

          projects: option.projects.details.map((project) => ({
            id: project.id,
            name: project.name,
            budget: project.budget,
            status: project.status,
            startDate: project.startDate,
            endDate: project.endDate,
            manager: project.projectManager.name,
            progress: project.progressPercentage,
          })),
        })),
      };
    }, []),
  });

  const clients = data?.clients;
  useEffect(() => {
    if (data?.meta.page) {
      setPaginator((prev) => ({
        ...prev,
        page: data?.meta.page ?? 1,
        total: data?.meta.total ?? 0,
      }));
    }
  }, [data]);

  const handleViewProjects = (clientId: string) => {
    setSelectedClient(selectedClient === clientId ? null : clientId);
  };

  const handleAddNewProject = (clientId: string) => {
    navigate(`/project/new?client=${clientId}`);
  };

  const handleExploreProject = (projectId: string) => {
    navigate(`/project/${projectId}`);
  };

  // const calculateTotalBudget = (projects: Project[]) => {
  //   return projects.reduce((total, project) => total + project.totalBudget, 0);
  // };

  return (
    <div className="flex h-full flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900">
            Clients & Projects
          </h1>
          <p className="text-gray-600">
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
      <div className="h-full flex-1 space-y-4">
        {isFetching && !clients && (
          <div className="flex h-full w-full items-center justify-center p-8">
            <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
          </div>
        )}
        {!isFetching && !clients?.length && (
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

        {clients?.map((client) => (
          <Card key={client.id} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex size-12 items-center justify-center rounded-full bg-blue-100">
                    <Building2 className="size-6 text-blue-600" />
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
                        Total Budget: {formatCurrency(client.totalBudget)}
                      </span>
                      {client.joinDate && (
                        <span className="text-sm text-gray-600">
                          Joined:&nbsp; formatDate(client.joinDate)
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => handleAddNewProject(client.id)}
                    size="sm"
                    className="cursor-pointer bg-green-600 hover:bg-green-700"
                  >
                    <Plus className="mr-2 size-4" />
                    Add New Project
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={!client.projectsCount}
                    className="cursor-pointer"
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
                      <div className="flex items-stretch justify-between gap-16">
                        <div className="flex flex-1 flex-col gap-4">
                          <div>
                            <h5 className="text-lg font-medium text-gray-900">
                              {project.name}
                            </h5>
                            <p className="flex items-center gap-4 text-xs text-gray-600">
                              <span>
                                Started:&nbsp;
                                {project.startDate
                                  ? formatDate(project.startDate)
                                  : "-"}
                              </span>
                              <span>
                                Ends:&nbsp;
                                {project.endDate
                                  ? formatDate(project.endDate)
                                  : "-"}
                              </span>
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Manager</p>
                            <p className="font-medium text-gray-900">
                              {project.manager}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">Progress</p>
                            <div className="flex items-center gap-2">
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
                        </div>
                        <div className="flex flex-col justify-between gap-4">
                          <div className="space-y-2 text-right">
                            <p className="font-medium text-gray-900">
                              {formatCurrency(project.budget)}
                            </p>
                            <Badge
                              className={cn(
                                "capitalize",
                                getProjectStatusColor(project.status),
                              )}
                            >
                              {formatCamelCaseToText(project.status)}
                            </Badge>
                          </div>
                          <div>
                            <Button
                              onClick={() => handleExploreProject(project.id)}
                              size="sm"
                              className="cursor-pointer bg-blue-600 hover:bg-blue-700"
                            >
                              Explore Project
                              <ArrowRight className="ml-1 size-4" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      {/* <Tabs defaultValue="construction" className="w-full">
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
                                      className: "size-5 text-gray-600",
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
                                    {formatCurrency(department.budget)}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-sm text-gray-600">
                                    Start Date
                                  </p>
                                  <p className="font-medium text-gray-900">
                                    {formatDate(
                                      department.startDate,
                                    )}
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
                        </Tabs> */}
                    </div>
                  ))}
                </div>
              </CardContent>
            )}
          </Card>
        ))}
        <Paginator paginator={paginator} setPaginator={setPaginator} />
      </div>
    </div>
  );
};

export default ClientsManagement;

type ClientQueryResponse = {
  message: string;
  success: boolean;
  data: {
    totalClients: number;
    currentPage: number;
    totalPages: number;
    pageLimit: number;
    count: number;
    clients: {
      client: {
        id: string;
        name: string;
        email: string;
        phone: string;
        company: string;
        joinDate: string | null;
      };
      projects: {
        count: number;
        totalBudget: number;
        details: {
          id: string;
          name: string;
          budget: number;
          status: string;
          startDate: string | null;
          endDate: string | null;
          projectManager: {
            id: string;
            name: string;
            title: string;
          };
          progressPercentage: number;
        }[];
      };
    }[];
  };
};
