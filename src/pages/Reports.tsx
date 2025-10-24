import { useState } from "react";

import { toast } from "sonner";
import SalesTab from "@/components/pages/reports/tabs/SalesTab";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  reportTypes,
  ReportTypesEnum,
  type TReportTypes,
} from "@/constants/defaults";
import ProjectsTab from "@/components/pages/reports/tabs/ProjectsTab";
import FinancialTab from "@/components/pages/reports/tabs/FinancialTab";
import InventoryTab from "@/components/pages/reports/tabs/InventoryTab";
import ViewReportDialog from "@/components/pages/reports/dialogs/ViewReportDialog";
import GenerateReportDialog from "@/components/shared/dialogs/GenerateReportDialog";

const Reports = () => {
  const [openGenerateDialog, setOpenGenerateDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [currentReportType, setCurrentReportType] = useState<string>(
    ReportTypesEnum.PROJECTS.value,
  );
  const [selectedReport, setSelectedReport] = useState<any>(null);

  const handleOpenGenerateDialog = (type: TReportTypes) => {
    setCurrentReportType(type);
    setOpenGenerateDialog(true);
  };

  const handleDownloadReport = (reportName: string) => {
    console.log("Downloading report:", reportName);
    toast.success("Download Started", {
      description: `Downloading ${reportName}...`,
      richColors: true,
    });
  };

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setOpenViewDialog(true);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Reports</h1>
        <p className="mt-2 text-gray-600">
          Generate and manage various types of reports for projects, finances,
          sales, and inventory.
        </p>
      </div>

      <Tabs defaultValue={ReportTypesEnum.PROJECTS.value} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          {reportTypes.map((tab) => {
            const Icon = tab.icon;
            return (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 capitalize"
              >
                <Icon className="size-4" />
                {tab.label}
              </TabsTrigger>
            );
          })}
        </TabsList>

        <ProjectsTab
          handleOpenGenerateDialog={handleOpenGenerateDialog}
          handleViewReport={handleViewReport}
          handleDownloadReport={handleDownloadReport}
        />
        <FinancialTab
          handleOpenGenerateDialog={handleOpenGenerateDialog}
          handleViewReport={handleViewReport}
          handleDownloadReport={handleDownloadReport}
        />
        <SalesTab
          handleOpenGenerateDialog={handleOpenGenerateDialog}
          handleViewReport={handleViewReport}
          handleDownloadReport={handleDownloadReport}
        />
        <InventoryTab
          handleOpenGenerateDialog={handleOpenGenerateDialog}
          handleViewReport={handleViewReport}
          handleDownloadReport={handleDownloadReport}
        />
      </Tabs>

      <GenerateReportDialog
        currentReportType={currentReportType}
        setCurrentReportType={setCurrentReportType}
        openGenerateDialog={openGenerateDialog}
        setOpenGenerateDialog={setOpenGenerateDialog}
      />
      <ViewReportDialog
        selectedReport={selectedReport}
        openViewDialog={openViewDialog}
        setOpenViewDialog={setOpenViewDialog}
        handleDownloadReport={handleDownloadReport}
      />
    </div>
  );
};

export default Reports;
