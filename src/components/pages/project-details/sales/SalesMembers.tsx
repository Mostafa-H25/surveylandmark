// import { salesMembersData } from "@/assets/data";
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
import { formatCurrency } from "@/helpers/formatCurrency";
import { formatPhoneNumber } from "@/helpers/formatPhoneNumber";
import { CircleSlash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  data: MembersQueryResponse;
  isFetching: boolean;
};

const SalesMembers = ({ data, isFetching }: Props) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const members = data.data.map((member) => member);

  const handleViewMember = (id: string) =>
    navigate(`/project/${projectId}/members/${id}`);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Position</TableHead>
          <TableHead>Project</TableHead>
          <TableHead>Salary</TableHead>
          <TableHead>Commission</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isFetching && !members && (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              <div className="flex h-full w-full items-center justify-center p-8">
                <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
              </div>
            </TableCell>
          </TableRow>
        )}
        {!isFetching && !members.length && (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
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
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-medium">{member.name}</TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>{formatPhoneNumber(member.phone)}</TableCell>
            <TableCell>{member.position}</TableCell>
            <TableCell>{member.projectName}</TableCell>
            <TableCell>{formatCurrency(parseFloat(member.salary))}</TableCell>
            <TableCell>{member.commission}%</TableCell>

            <TableCell>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleViewMember(member.id)}
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

export default SalesMembers;

type MembersQueryResponse = {
  message: string;
  section: string;
  kind: string;
  sub: string;
  page: number;
  limit: number;
  total: number;
  count: number;
  data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    position: string;
    projectName: string;
    salary: string;
    commission: number;
  }[];
};
