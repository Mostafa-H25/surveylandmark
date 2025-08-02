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

interface ProjectReportForm {
  name: string;
  type: string;
  project: string;
}

type Props = { setOpenGenerateDialog: Dispatch<SetStateAction<boolean>> };

const GenerateProjectReportForm = ({ setOpenGenerateDialog }: Props) => {
  const { toast } = useToast();
  const projectForm = useForm<ProjectReportForm>();

  const handleGenerateProjectReport = (data: ProjectReportForm) => {
    console.log("Generating project report:", data);
    toast({
      title: "Project Report Generated",
      description: `${data.name} has been generated successfully.`,
    });
    setOpenGenerateDialog(false);
    projectForm.reset();
  };

  return (
    <Form {...projectForm}>
      <form
        onSubmit={projectForm.handleSubmit(handleGenerateProjectReport)}
        className="space-y-4"
      >
        <FormField
          control={projectForm.control}
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
          control={projectForm.control}
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
                  <SelectItem value="Progress">Progress Report</SelectItem>
                  <SelectItem value="Timeline">Timeline Report</SelectItem>
                  <SelectItem value="Budget">Budget Report</SelectItem>
                  <SelectItem value="Quality">Quality Report</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={projectForm.control}
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

export default GenerateProjectReportForm;
