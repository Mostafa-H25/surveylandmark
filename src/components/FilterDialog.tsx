import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface FilterDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const FilterDialog = ({ open, onOpenChange }: FilterDialogProps) => {
  const [filters, setFilters] = useState({
    buildingNumber: "",
    floorNumber: "",
    unitsModel: "",
    unitsNumbers: "",
  });

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    console.log("Applied filters:", filters);
    onOpenChange(false);
  };

  const handleClearFilters = () => {
    setFilters({
      buildingNumber: "",
      floorNumber: "",
      unitsModel: "",
      unitsNumbers: "",
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Filter Options</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="building">Building Number</Label>
            <Select
              value={filters.buildingNumber}
              onValueChange={(value) =>
                handleFilterChange("buildingNumber", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select building" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="A">Building A</SelectItem>
                <SelectItem value="B">Building B</SelectItem>
                <SelectItem value="C">Building C</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="floor">Floor Number</Label>
            <Select
              value={filters.floorNumber}
              onValueChange={(value) =>
                handleFilterChange("floorNumber", value)
              }
            >
              <SelectTrigger>
                <SelectValue placeholder="Select floor" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem value="Ground">Ground Floor</SelectItem>
                <SelectItem value="1">1st Floor</SelectItem>
                <SelectItem value="2">2nd Floor</SelectItem>
                <SelectItem value="3">3rd Floor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="model">Units Model</Label>
            <Input
              id="model"
              value={filters.unitsModel}
              onChange={(e) => handleFilterChange("unitsModel", e.target.value)}
              placeholder="Enter units model"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="numbers">Units Numbers</Label>
            <Input
              id="numbers"
              value={filters.unitsNumbers}
              onChange={(e) =>
                handleFilterChange("unitsNumbers", e.target.value)
              }
              placeholder="Enter unit numbers"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            className="cursor-pointer"
            onClick={handleClearFilters}
          >
            Clear
          </Button>
          <Button
            onClick={handleApplyFilters}
            className="cursor-pointer bg-blue-600 hover:bg-blue-700"
          >
            Apply Filters
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilterDialog;
