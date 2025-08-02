import { useState } from "react";
import { Calendar, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { clientsData } from "@/assets/data";

interface AddPaymentDialogProps {
  onAddPayment: (payment: {
    client: string;
    project: string;
    paymentAmount: number;
    dueDate: string;
    status: "pending" | "received" | "overdue";
  }) => void;
}

export function AddPaymentDialog({ onAddPayment }: AddPaymentDialogProps) {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    client: "",
    project: "",
    paymentAmount: "",
    dueDate: "",
    status: "pending" as const,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !formData.client ||
      !formData.project ||
      !formData.paymentAmount ||
      !formData.dueDate
    ) {
      return;
    }

    onAddPayment({
      client: formData.client,
      project: formData.project,
      paymentAmount: parseFloat(formData.paymentAmount),
      dueDate: formData.dueDate,
      status: formData.status,
    });

    // Reset form
    setFormData({
      client: "",
      project: "",
      paymentAmount: "",
      dueDate: "",
      status: "pending",
    });

    setOpen(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white hover:bg-blue-700">
          <DollarSign className="mr-2 size-4" />
          Add Payment
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Payment</DialogTitle>
          <DialogDescription>
            Create a new payment entry for tracking client payments and project
            deadlines.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="client">Client Name</Label>
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

            <div className="space-y-2">
              <Label htmlFor="project">Project Name</Label>
              <Input
                id="project"
                placeholder="Enter project name"
                value={formData.project}
                onChange={(e) => handleInputChange("project", e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="amount">Payment Amount</Label>
              <div className="relative">
                <DollarSign className="absolute top-1/2 left-3 size-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  id="amount"
                  type="number"
                  placeholder="0.00"
                  className="pl-10"
                  value={formData.paymentAmount}
                  onChange={(e) =>
                    handleInputChange("paymentAmount", e.target.value)
                  }
                  required
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">Due Date</Label>
              <div className="relative">
                <Calendar className="absolute top-1/2 left-3 size-4 -translate-y-1/2 transform text-gray-400" />
                <Input
                  id="dueDate"
                  type="date"
                  className="pl-10"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => handleInputChange("status", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="received">Received</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Payment
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
