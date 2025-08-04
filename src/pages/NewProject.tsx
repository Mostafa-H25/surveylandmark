import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import FileUploadSection from "@/components/pages/new-project/FileUploadSection";
import ProjectInformation from "@/components/pages/new-project/ProjectInformation";

const NewProject = () => {
  const navigate = useNavigate();
  return (
    <main className="space-y-6">
      <header className="rounded-md border border-gray-200 bg-white px-6 py-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-md p-1 hover:bg-gray-100"
          >
            <ArrowLeft className="size-5 text-gray-600" />
          </button>
          <h1 className="text-xl font-semibold text-gray-900">
            Create New Project
          </h1>
        </div>
      </header>
      <FileUploadSection />
      <ProjectInformation />
      {/* <DepartmentConfiguration /> */}

      <div className="flex justify-end space-x-3">
        <Button onClick={() => navigate("/dashboard")} variant="outline">
          Cancel
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">
          Create Project
        </Button>
      </div>
    </main>
  );
};

export default NewProject;
