// import { constructionContractorsData } from "@/assets/data";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  data: VendorsQueryResponse;
};

const ConstructionContractors = ({ data }: Props) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const vendors = data.data.map((vendor) => ({
    id: vendor.id,
    name: vendor.name,
    email: vendor.email,
    phone: vendor.phone,
    position: vendor.position,
    title: vendor.title,
    specialty: vendor.specialty,
    project: vendor.projectName,
  }));

  const handleViewContractor = (id: string) =>
    navigate(`/project/${projectId}/contractors/${id}`);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {vendors.map((contractor) => (
          <TableRow key={contractor.id}>
            <TableCell className="font-medium capitalize">
              {contractor.name}
            </TableCell>
            <TableCell>{contractor.email}</TableCell>
            <TableCell>{contractor.phone}</TableCell>
            <TableCell className="capitalize">{contractor.position}</TableCell>

            <TableCell>
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
                onClick={() => handleViewContractor(contractor.id)}
              >
                View Profile
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ConstructionContractors;

type VendorsQueryResponse = {
  message: string;
  section: string;
  kind: string;
  page: number;
  limit: number;
  total: number;
  count: number;
  data: [
    {
      id: string;
      name: string;
      email: string;
      phone: string;
      title: string;
      specialty: string;
      position: string;
      projectName: string;
    },
  ];
};
