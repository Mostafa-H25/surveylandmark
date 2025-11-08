import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { CircleSlash } from "lucide-react";

const EmptyDepartmentCard = () => {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <CircleSlash color="#4a5565 " />
        </EmptyMedia>
        <EmptyTitle>No data</EmptyTitle>
        <EmptyDescription>Please select valid filter data.</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>{/* <Button>Add data</Button> */}</EmptyContent>
    </Empty>
  );
};

export default EmptyDepartmentCard;
