import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ROUTES } from "@/constants/routes";
import { formatCurrency } from "@/helpers/formatCurrency";
import { formatPhoneNumber } from "@/helpers/formatPhoneNumber";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  data: MembersQueryResponse;
};

const SalesMembers = ({ data }: Props) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const members = data.data.map((member) => member);

  const handleViewMember = (id: string) =>
    navigate(ROUTES.MEMBER(projectId, id));

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
