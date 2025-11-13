// import { constructionMembersData } from "@/assets/data";
import { Button } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
// import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/helpers/formatCurrency";
import { CircleSlash } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

type Props = {
  data: TeamQueryResponse;
  isFetching: boolean;
};

const ConstructionMembers = ({ data, isFetching }: Props) => {
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
          {/* <TableHead>Sales Department Access</TableHead> */}
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isFetching && !members && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
              <div className="flex h-full w-full items-center justify-center p-8">
                <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
              </div>
            </TableCell>
          </TableRow>
        )}
        {!isFetching && !members.length && (
          <TableRow>
            <TableCell colSpan={7} className="text-center">
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
            <TableCell className="font-medium capitalize">
              {member.name}
            </TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>{member.phone}</TableCell>
            <TableCell className="capitalize">{member.position}</TableCell>
            <TableCell className="capitalize">{member.project}</TableCell>
            <TableCell>{formatCurrency(member.salary)}</TableCell>
            {/* <TableCell>
              <Switch
                id="sales-department-access"
                checked={member.salesDepartmentAccess}
              />
            </TableCell> */}

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
