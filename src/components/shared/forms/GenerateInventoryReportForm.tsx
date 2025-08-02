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
import { useToast } from "@/hooks/use-toast";
import type { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";

interface InventoryReportForm {
  name: string;
  type: string;
  project: string;
}

type Props = { setOpenGenerateDialog: Dispatch<SetStateAction<boolean>> };

const GenerateInventoryReportForm = ({ setOpenGenerateDialog }: Props) => {
  const { toast } = useToast();
  const inventoryForm = useForm<InventoryReportForm>();

  const handleGenerateInventoryReport = (data: InventoryReportForm) => {
    console.log("Generating inventory report:", data);
    toast({
      title: "Inventory Report Generated",
      description: `${data.name} has been generated successfully.`,
    });
    setOpenGenerateDialog(false);
    inventoryForm.reset();
  };
  return (
    <Form {...inventoryForm}>
      <form
        onSubmit={inventoryForm.handleSubmit(handleGenerateInventoryReport)}
        className="space-y-4"
      >
        <FormField
          control={inventoryForm.control}
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
          control={inventoryForm.control}
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
                  <SelectItem value="Consumption">
                    Consumption Report
                  </SelectItem>
                  <SelectItem value="Summary">Inventory Summary</SelectItem>
                  <SelectItem value="Stock">Stock Levels</SelectItem>
                  <SelectItem value="Procurement">
                    Procurement Report
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={inventoryForm.control}
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

export default GenerateInventoryReportForm;
