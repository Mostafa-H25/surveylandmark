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
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  data: TeamQueryResponse;
};

const ConstructionMembers = ({ data }: Props) => {
  const navigate = useNavigate();
  const { projectId } = useParams();
  const members = data.data.map((member) => ({
    id: member.id,
    name: member.name,
    email: member.email,
    phone: member.phone,
    position: member.position,
    project: member.projectName,
    salary: parseFloat(member.salary),
  }));

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
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {members.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-medium capitalize">
              {member.name}
            </TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>{member.phone}</TableCell>
            <TableCell className="capitalize">{member.position}</TableCell>
            <TableCell className="capitalize">{member.project}</TableCell>
            <TableCell>{formatCurrency(member.salary)}</TableCell>

            <TableCell>
              <Button
                variant="outline"
                size="sm"
                className="cursor-pointer"
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

export default ConstructionMembers;

type TeamQueryResponse = {
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
      position: string;
      projectName: string;
      salary: string;
    },
  ];
};
