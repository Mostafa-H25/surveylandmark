// import { constructionContractorsData } from "@/assets/data";

// import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  // TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ConstructionContractors = () => {
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
        {/* {constructionContractorsData.map((contractor) => (
          <TableRow key={contractor.id}>
            <TableCell className="font-medium">{contractor.name}</TableCell>
            <TableCell>{contractor.email}</TableCell>
            <TableCell>{contractor.phone}</TableCell>
            <TableCell>{contractor.position}</TableCell>

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
        ))} */}
      </TableBody>
    </Table>
  );
};

export default ConstructionContractors;
