import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";
import AddClientForm from "./content/AddClientForm";

const AddClientDialogQuickActions = () => {
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);

  return (
    <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
      <DialogTrigger asChild>
        <Button
          className="h-auto w-full cursor-pointer justify-start p-4 text-left"
          variant="outline"
        >
          <div>
            <div className="font-medium text-gray-900">Register New Client</div>
            <div className="text-sm text-gray-600">
              Add a new client to the system
            </div>
          </div>
        </Button>
      </DialogTrigger>
      <AddClientForm setIsAddClientOpen={setIsAddClientOpen} />
    </Dialog>
  );
};

export default AddClientDialogQuickActions;
