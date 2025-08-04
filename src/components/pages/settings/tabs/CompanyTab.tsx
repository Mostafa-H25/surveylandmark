import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { TabsContent } from "@/components/ui/tabs";

import { Building } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { companyInfo } from "@/assets/data";

const CompanyTab = () => {
  const { toast } = useToast();

  const handleSave = (section: string) => {
    toast({
      title: "Settings saved",
      description: `Your ${section} settings have been updated successfully.`,
    });
  };
  return (
    <TabsContent value="company" className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="size-5 text-blue-600" />
            Company Information
          </CardTitle>
          <CardDescription>
            Manage your company details and registration information
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" defaultValue={companyInfo.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tax-id">Tax ID</Label>
              <Input id="tax-id" defaultValue={companyInfo.taxId} />
            </div>
            <div className="space-y-2 md:col-span-2">
              <Label htmlFor="company-address">Address</Label>
              <Input id="company-address" defaultValue={companyInfo.address} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-phone">Phone</Label>
              <Input id="company-phone" defaultValue={companyInfo.phone} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-email">Email</Label>
              <Input
                id="company-email"
                type="email"
                defaultValue={companyInfo.email}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company-website">Website</Label>
              <Input id="company-website" defaultValue={companyInfo.website} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registration-number">Registration Number</Label>
              <Input
                id="registration-number"
                defaultValue={companyInfo.registrationNumber}
              />
            </div>
          </div>
          <Button
            type="submit"
            className="self-end bg-blue-600 hover:bg-blue-700"
            onClick={() => handleSave("company")}
          >
            Save Company Information
          </Button>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default CompanyTab;
