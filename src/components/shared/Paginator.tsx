import {
  ChevronFirst,
  ChevronLast,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";

type Paginator = { page: number; total: number; limit: number };

type Props = {
  paginator: Paginator;
  setPaginator: Dispatch<SetStateAction<Paginator>>;
};

const Paginator = ({ paginator, setPaginator }: Props) => {
  const pageCount = Math.ceil(paginator.total / paginator.limit);
  const isMultiPage = pageCount > 1;
  const isFirstPage = paginator.page === 1;
  const isLastPage = paginator.page === pageCount;
  return (
    <div className="flex w-full items-center justify-end gap-4 p-4">
      <Button
        disabled={isFirstPage}
        onClick={() => setPaginator((prev) => ({ ...prev, page: 1 }))}
        className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200"
      >
        <ChevronFirst />
      </Button>
      <Button
        disabled={isFirstPage}
        onClick={() =>
          setPaginator((prev) => ({ ...prev, page: prev.page - 1 }))
        }
        className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200"
      >
        <ChevronLeft />
      </Button>
      {!isFirstPage && (
        <Button
          onClick={() =>
            setPaginator((prev) => ({ ...prev, page: prev.page - 1 }))
          }
          className="cursor-pointer border border-transparent bg-transparent text-blue-700 hover:border-blue-700 hover:bg-blue-100"
        >
          {paginator.page - 1}
        </Button>
      )}
      <Button
        disabled
        className="cursor-pointer border border-blue-700 bg-transparent text-blue-700"
      >
        {paginator.page}
      </Button>
      {isMultiPage && !isLastPage && (
        <Button
          onClick={() =>
            setPaginator((prev) => ({ ...prev, page: prev.page + 1 }))
          }
          className="cursor-pointer border border-transparent bg-transparent text-blue-700 hover:border-blue-700 hover:bg-blue-100"
        >
          {paginator.page + 1}
        </Button>
      )}

      <Button
        disabled={!isMultiPage || isLastPage}
        onClick={() =>
          setPaginator((prev) => ({ ...prev, page: prev.page + 1 }))
        }
        className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200"
      >
        <ChevronRight />
      </Button>
      <Button
        disabled={!isMultiPage || isLastPage}
        onClick={() => setPaginator((prev) => ({ ...prev, page: pageCount }))}
        className="cursor-pointer bg-blue-100 text-blue-700 hover:bg-blue-200"
      >
        <ChevronLast />
      </Button>
    </div>
  );
};

export default Paginator;
