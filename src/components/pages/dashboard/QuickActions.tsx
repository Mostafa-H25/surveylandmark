import { useState } from "react";

import { Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { isRequiredRoleOrHigher } from "@/helpers/isRequiredRoleOrHigher";
import { ReportTypesEnum, UserRolesEnum } from "@/constants/defaults";
import GenerateReportDialog from "@/components/shared/dialogs/GenerateReportDialog";

const QuickActions = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isMember = user?.role === UserRolesEnum.MEMBER;

  const [currentReportType, setCurrentReportType] = useState<string>(
    ReportTypesEnum.PROJECTS.value,
  );
  const [isNewClientDialogOpen, setIsNewClientDialogOpen] = useState(false);
  const [openGenerateDialog, setOpenGenerateDialog] = useState(false);

  const handleNewProject = () => {
    navigate("/project/new");
  };

  const handleRegisterClient = () => {
    setIsNewClientDialogOpen(false);
    toast({
      title: "Client Registered",
      description: "New client has been registered successfully.",
    });
  };

  const handleManageUsers = () => {
    navigate("/users");
  };

  if (isMember) return null;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl font-normal">
          <Calendar className="size-5 text-blue-600" />
          Quick Actions
        </CardTitle>
        <CardDescription>Frequently used actions and shortcuts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Button
            onClick={handleNewProject}
            className="h-auto w-full justify-start p-4 text-left"
            variant="outline"
          >
            <div>
              <div className="font-medium text-gray-900">Add New Project</div>
              <div className="text-sm text-gray-600">
                Create a new construction or sales project
              </div>
            </div>
          </Button>
          <Dialog
            open={isNewClientDialogOpen}
            onOpenChange={setIsNewClientDialogOpen}
          >
            <DialogTrigger asChild>
              <Button
                className="h-auto w-full justify-start p-4 text-left"
                variant="outline"
              >
                <div>
                  <div className="font-medium text-gray-900">
                    Register New Client
                  </div>
                  <div className="text-sm text-gray-600">
                    Add a new client to the system
                  </div>
                </div>
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Register New Client</DialogTitle>
                <DialogDescription>
                  Add a new client to your construction management system.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="clientName">Client Name</label>
                  <Input id="clientName" placeholder="Enter client name" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="clientEmail">Email</label>
                  <Input
                    id="clientEmail"
                    type="email"
                    placeholder="Enter email address"
                  />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="clientPhone">Phone</label>
                  <Input id="clientPhone" placeholder="Enter phone number" />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="clientCompany">Company</label>
                  <Input id="clientCompany" placeholder="Enter company name" />
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsNewClientDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleRegisterClient}>Register Client</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            onClick={() => setOpenGenerateDialog(true)}
            className="h-auto w-full justify-start p-4 text-left"
          >
            <div>
              <div className="font-medium text-gray-900">Generate Report</div>
              <div className="text-sm text-gray-600">
                Create project progress reports
              </div>
            </div>
          </Button>

          {isRequiredRoleOrHigher(UserRolesEnum.ADMIN, user?.role) && (
            <Button
              onClick={handleManageUsers}
              className="h-auto w-full justify-start p-4 text-left"
              variant="outline"
            >
              <div>
                <div className="font-medium text-gray-900">Manage Users</div>
                <div className="text-sm text-gray-600">
                  Add or edit user accounts
                </div>
              </div>
            </Button>
          )}
        </div>
      </CardContent>

      <GenerateReportDialog
        currentReportType={currentReportType}
        setCurrentReportType={setCurrentReportType}
        openGenerateDialog={openGenerateDialog}
        setOpenGenerateDialog={setOpenGenerateDialog}
      />
    </Card>
  );
};

export default QuickActions;
