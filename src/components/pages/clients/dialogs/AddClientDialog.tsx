import { useState } from "react";

import { Plus } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const AddClientDialog = () => {
  const { toast } = useToast();

  const [isAddClientOpen, setIsAddClientOpen] = useState(false);
  const [newClientData, setNewClientData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
  });

  const handleAddClient = () => {
    setIsAddClientOpen(true);
  };

  const handleSubmitNewClient = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Client Added",
      description: `${newClientData.name} from ${newClientData.company} has been added successfully.`,
    });
    setIsAddClientOpen(false);
    setNewClientData({ name: "", email: "", phone: "", company: "" });
  };

  const handleInputChange = (field: string, value: string) => {
    setNewClientData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={handleAddClient}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="mr-2 size-4" />
          Add Client
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Client</DialogTitle>
          <DialogDescription>
            Enter the client information below to create a new client profile.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmitNewClient} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName">Full Name</Label>
            <Input
              id="clientName"
              value={newClientData.name}
              onChange={(e) => handleInputChange("name", e.target.value)}
              placeholder="Enter client name"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientEmail">Email</Label>
            <Input
              id="clientEmail"
              type="email"
              value={newClientData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="client@example.com"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientPhone">Phone</Label>
            <Input
              id="clientPhone"
              value={newClientData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              placeholder="+1-555-0123"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="clientCompany">Company</Label>
            <Input
              id="clientCompany"
              value={newClientData.company}
              onChange={(e) => handleInputChange("company", e.target.value)}
              placeholder="Company name"
              required
            />
          </div>
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsAddClientOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Add Client
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddClientDialog;
