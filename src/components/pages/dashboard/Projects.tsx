import { TrendingUp } from "lucide-react";

import { recentProjects } from "@/assets/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Projects = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-normal">
          <TrendingUp className="h-5 w-5 text-blue-600" />
          Recent Projects
        </CardTitle>
        <CardDescription>Latest project activities and updates</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recentProjects.map((project) => (
            <div
              key={project.id}
              className="flex items-center justify-between rounded-lg border p-4"
            >
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{project.name}</h4>
                <p className="text-sm text-gray-600">{project.client}</p>
                <div className="mt-2 flex items-center gap-2">
                  <span className="rounded bg-blue-100 px-2 py-1 text-xs text-blue-700">
                    {project.type}
                  </span>
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
                  {project.progress}%
                </div>
                <div className="mt-1 h-2 w-16 rounded-full bg-gray-200">
                  <div
                    className="h-2 rounded-full bg-blue-600 transition-all"
                    style={{ width: `${project.progress}%` }}
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
