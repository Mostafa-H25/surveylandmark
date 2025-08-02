import { clientsData } from "@/assets/data";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { projectStatus } from "@/constants/defaults";

const ProjectInformation = () => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <h2 className="mb-2 text-2xl font-semibold text-gray-900">
        Project Information
      </h2>
      <p className="mb-6 text-sm text-gray-600">
        Basic details about the project
      </p>

      <div className="space-y-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Client
            </label>
            <Select>
              <SelectTrigger className="capitalize">
                <SelectValue placeholder="Select client" />
              </SelectTrigger>
              <SelectContent>
                {clientsData.map((client) => (
                  <SelectItem
                    key={client.id}
                    value={client.id.toString()}
                    className="capitalize"
                  >
                    {client.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Project Name
            </label>
            <Input placeholder="Enter project name" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              Status
            </label>
            <Select defaultValue="planning">
              <SelectTrigger className="capitalize">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {projectStatus.map((status) => (
                  <SelectItem
                    key={status}
                    value={status}
                    className="capitalize"
                  >
                    {status.replaceAll("-", " ")}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700">
            Description
          </label>
          <Textarea placeholder="Project description..." rows={6} />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Total Budget
            </label>
            <Input type="number" placeholder="0" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Start Date
            </label>
            <Input type="date" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              End Date
            </label>
            <Input type="date" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
