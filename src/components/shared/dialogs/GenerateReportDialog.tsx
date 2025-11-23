import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import GenerateProjectReportForm from "../forms/GenerateProjectReportForm";
import GenerateFinancialReportFrom from "../forms/GenerateFinancialReportFrom";
import GenerateSalesReportForm from "../forms/GenerateSalesReportForm";
import GenerateInventoryReportForm from "../forms/GenerateInventoryReportForm";
import type { Dispatch, SetStateAction } from "react";
import { reportTypes, ReportTypesEnum } from "@/constants/defaults";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

type Props = {
  currentReportType: string;
  setCurrentReportType: Dispatch<SetStateAction<string>>;
  openGenerateDialog: boolean;
  setOpenGenerateDialog: Dispatch<SetStateAction<boolean>>;
};

const GenerateReportDialog = ({
  currentReportType,
  setCurrentReportType,
  openGenerateDialog,
  setOpenGenerateDialog,
}: Props) => {
  const renderGenerateReportForm = () => {
    switch (currentReportType) {
      case ReportTypesEnum.PROJECTS.value:
        return (
          <GenerateProjectReportForm
            setOpenGenerateDialog={setOpenGenerateDialog}
          />
        );

      case ReportTypesEnum.FINANCIAL.value:
        return (
          <GenerateFinancialReportFrom
            setOpenGenerateDialog={setOpenGenerateDialog}
          />
        );

      case ReportTypesEnum.SALES.value:
        return (
          <GenerateSalesReportForm
            setOpenGenerateDialog={setOpenGenerateDialog}
          />
        );

      case ReportTypesEnum.INVENTORY.value:
        return (
          <GenerateInventoryReportForm
            setOpenGenerateDialog={setOpenGenerateDialog}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Dialog open={openGenerateDialog} onOpenChange={setOpenGenerateDialog}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="capitalize">
            Generate {currentReportType} Report
          </DialogTitle>
          <DialogDescription>
            Create a new {currentReportType.toLowerCase()} report with the
            details below.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <Label htmlFor="reportType">Report Type</Label>

          <Select
            defaultValue={currentReportType}
            onValueChange={setCurrentReportType}
          >
            <SelectTrigger className="w-full capitalize">
              <SelectValue placeholder="Select report type" />
            </SelectTrigger>
            <SelectContent>
              {reportTypes.map((tab) => (
                <SelectItem
                  key={tab.value}
                  value={tab.value}
                  className="capitalize"
                >
                  {tab.label.replaceAll("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {renderGenerateReportForm()}
      </DialogContent>
    </Dialog>
  );
};

export default GenerateReportDialog;
