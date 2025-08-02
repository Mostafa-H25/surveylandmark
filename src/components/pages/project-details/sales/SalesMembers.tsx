import { salesMembersData } from "@/assets/data";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/helpers/formatCurrency";

const SalesMembers = () => {
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
        {salesMembersData.map((member) => (
          <TableRow key={member.id}>
            <TableCell className="font-medium">{member.name}</TableCell>
            <TableCell>{member.email}</TableCell>
            <TableCell>{member.phone}</TableCell>
            <TableCell>{member.position}</TableCell>
            <TableCell>{member.project}</TableCell>
            <TableCell>{formatCurrency(member.salary)}</TableCell>
            <TableCell>{member.commission}%</TableCell>

            <TableCell>
              <Button
                variant="outline"
                size="sm"
                // onClick={() => handleViewMember(member.id)}
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
