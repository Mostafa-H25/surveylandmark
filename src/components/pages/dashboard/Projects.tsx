import { CircleSlash, TrendingUp } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

type Props = {
  initialProjects?: {
    id: string;
    name: string;
    status: string;
    client: string;
    company: string;
    progressPercentage: number;
  }[];
};

const Projects = ({ initialProjects }: Props) => {
  const projects = initialProjects?.slice(0, 3);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-normal">
          <TrendingUp className="size-5 text-blue-600" />
          Recent Projects
        </CardTitle>
        <CardDescription>Latest project activities and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {!initialProjects?.length && (
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
          {projects?.map((project) => (
            <div
              key={project.id}
              className="flex items-end justify-between rounded-lg border p-4"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 capitalize">
                  {project.name}
                </h4>
                <p className="text-sm text-gray-600 capitalize">
                  {project.client} - {project.company}
                </p>
                <div className="mt-2 flex items-center gap-2">
                  {/* <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                    {project.company}
                  </span> */}
                  <span
                    className={`rounded px-2 py-1 text-xs ${
                      project.status === "Completed"
                        ? "bg-green-100 text-green-700"
                        : project.status === "In Progress"
                          ? "bg-orange-100 text-orange-700"
                          : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">
                  {project.progressPercentage}%
                </div>
                <div className="mt-1 h-2 w-16 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all"
                    style={{ width: `${project.progressPercentage}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default Projects;
