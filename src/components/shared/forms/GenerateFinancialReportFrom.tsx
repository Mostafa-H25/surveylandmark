import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface FinancialReportForm {
  name: string;
  type: string;
  period: string;
}

type Props = { setOpenGenerateDialog: Dispatch<SetStateAction<boolean>> };

const GenerateFinancialReportFrom = ({ setOpenGenerateDialog }: Props) => {
  const financialForm = useForm<FinancialReportForm>();

  const handleGenerateFinancialReport = (data: FinancialReportForm) => {
    console.log("Generating financial report:", data);
    toast.success("Financial Report Generated", {
      description: `${data.name} has been generated successfully.`,
      richColors: true,
    });
    setOpenGenerateDialog(false);
    financialForm.reset();
  };

  return (
    <Form {...financialForm}>
      <form
        onSubmit={financialForm.handleSubmit(handleGenerateFinancialReport)}
        className="space-y-4"
      >
        <FormField
          control={financialForm.control}
          name="name"
          rules={{ required: "Report name is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Report Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter report name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={financialForm.control}
          name="type"
          rules={{ required: "Report type is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Report Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Summary">Financial Summary</SelectItem>
                  <SelectItem value="Budget">Budget Analysis</SelectItem>
                  <SelectItem value="Revenue">Revenue Report</SelectItem>
                  <SelectItem value="Expenses">Expense Report</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={financialForm.control}
          name="period"
          rules={{ required: "Period is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Period</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="January 2024">January 2024</SelectItem>
                  <SelectItem value="Q1 2024">Q1 2024</SelectItem>
                  <SelectItem value="Q2 2024">Q2 2024</SelectItem>
                  <SelectItem value="Q3 2024">Q3 2024</SelectItem>
                  <SelectItem value="Q4 2024">Q4 2024</SelectItem>
                  <SelectItem value="Year 2024">Year 2024</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogFooter>
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpenGenerateDialog(false)}
          >
            Cancel
          </Button>
          <Button type="submit">Generate Report</Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

export default GenerateFinancialReportFrom;
