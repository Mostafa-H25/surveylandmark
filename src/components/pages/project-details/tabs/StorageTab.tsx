import { TabsContent } from "@/components/ui/tabs";
import { CategoriesEnum } from "@/constants/defaults";
import type { DepartmentType } from "@/types/default";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CircleSlash, Expand } from "lucide-react";
import { useParams } from "react-router-dom";
import { getStorageByProjectIdApi } from "@/api/projects/get-storage-by-project-id.api";
import { useCallback, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";

const DEPARTMENTS_QUERY_KEY = "department-section";

type Props = { selectedDepartment: DepartmentType };

const StorageTab = ({ selectedDepartment }: Props) => {
  const { projectId } = useParams();

  const [expand, setExpand] = useState(false);

  const isStorageSelected = selectedDepartment === CategoriesEnum.STORAGE;

  const { data: storage, isFetching } = useQuery({
    queryKey: [DEPARTMENTS_QUERY_KEY, selectedDepartment],
    enabled: isStorageSelected,
    queryFn: () => getStorageByProjectIdApi(projectId!),
    select: useCallback((data: StorageQueryResponse) => {
      return data?.data;
    }, []),
  });

  return (
    <TabsContent key={CategoriesEnum.STORAGE} value={CategoriesEnum.STORAGE}>
      <div className="space-y-4 rounded-lg border bg-white p-4">
        <div className="flex w-full items-center justify-end gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Dialog open={expand} onOpenChange={setExpand}>
                <DialogTrigger asChild>
                  <Button className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200">
                    <Expand />
                  </Button>
                </DialogTrigger>
                <DialogContent className="!w-4xl max-w-screen px-4">
                  <DialogHeader>
                    <DialogTitle className="capitalize">
                      {selectedDepartment}
                    </DialogTitle>
                  </DialogHeader>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Total Quantity</TableHead>
              <TableHead>Unit</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isFetching && !storage && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  <div className="flex h-full w-full items-center justify-center p-8">
                    <div className="aspect-square h-full max-h-32 w-full max-w-32 animate-spin rounded-full border-b-2 border-blue-600"></div>
                  </div>
                </TableCell>
              </TableRow>
            )}
            {!isFetching && !storage?.length && (
              <TableRow>
                <TableCell colSpan={3} className="text-center">
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <CircleSlash color="#4a5565 " />
                      </EmptyMedia>
                      <EmptyTitle>No data</EmptyTitle>
                      <EmptyDescription>No data found</EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent></EmptyContent>
                  </Empty>
                </TableCell>
              </TableRow>
            )}
            {storage?.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.totalQuantity}</TableCell>
                <TableCell>{item.unit}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </TabsContent>
  );
};

export default StorageTab;

type StorageQueryResponse = {
  message: string;
  projectId: string;
  totalMaterials: number;
  data: [
    {
      id: string;
      name: string;
      unit: string;
      totalQuantity: number;
      availableQuantity: number;
      receipts: [];
    },
  ];
};
