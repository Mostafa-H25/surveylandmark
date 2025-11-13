// import { constructionContractorsData } from "@/assets/data";

import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleSlash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  data: VendorsQueryResponse;
  isFetching: boolean;
};

const ConstructionContractors = ({ data, isFetching }: Props) => {
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
        {isFetching && !vendors && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              <div className="flex h-full w-full items-center justify-center p-8">
                <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
              </div>
            </TableCell>
          </TableRow>
        )}
        {!isFetching && !vendors.length && (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <CircleSlash color="#4a5565 " />
                  </EmptyMedia>
                  <EmptyTitle>No data</EmptyTitle>
                  <EmptyDescription>No data found</EmptyDescription>
                </EmptyHeader>
                <EmptyContent>{/* <Button>Add data</Button> */}</EmptyContent>
              </Empty>
            </TableCell>
          </TableRow>
        )}
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
