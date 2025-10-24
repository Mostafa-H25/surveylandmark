import { useState } from "react";

import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import AddClientForm from "./content/AddClientForm";

const AddClientDialog = () => {
  const [isAddClientOpen, setIsAddClientOpen] = useState(false);

  return (
    <Dialog open={isAddClientOpen} onOpenChange={setIsAddClientOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="mr-2 size-4" />
          Add Client
        </Button>
      </DialogTrigger>
      <AddClientForm setIsAddClientOpen={setIsAddClientOpen} />
    </Dialog>
  );
};

export default AddClientDialog;
