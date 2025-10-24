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

interface SalesReportForm {
  name: string;
  type: string;
  project: string;
}

type Props = { setOpenGenerateDialog: Dispatch<SetStateAction<boolean>> };

const GenerateSalesReportForm = ({ setOpenGenerateDialog }: Props) => {
  const salesForm = useForm<SalesReportForm>();

  const handleGenerateSalesReport = (data: SalesReportForm) => {
    console.log("Generating sales report:", data);
    toast.success("Sales Report Generated", {
      description: `${data.name} has been generated successfully.`,
      richColors: true,
    });
    setOpenGenerateDialog(false);
    salesForm.reset();
  };

  return (
    <Form {...salesForm}>
      <form
        onSubmit={salesForm.handleSubmit(handleGenerateSalesReport)}
        className="space-y-4"
      >
        <FormField
          control={salesForm.control}
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
          control={salesForm.control}
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
                  <SelectItem value="Unit Sales">Unit Sales</SelectItem>
                  <SelectItem value="Performance">Performance</SelectItem>
                  <SelectItem value="Revenue">Sales Revenue</SelectItem>
                  <SelectItem value="Trends">Sales Trends</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={salesForm.control}
          name="project"
          rules={{ required: "Project is required" }}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Project</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select project" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Skyline Tower">Skyline Tower</SelectItem>
                  <SelectItem value="Garden View">Garden View</SelectItem>
                  <SelectItem value="Downtown Plaza">Downtown Plaza</SelectItem>
                  <SelectItem value="All Projects">All Projects</SelectItem>
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

export default GenerateSalesReportForm;
