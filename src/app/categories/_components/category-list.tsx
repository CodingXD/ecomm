"use client";

import { useRouter } from "next/navigation";
import { Checkbox } from "~/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { Skeleton } from "~/components/ui/skeleton";
import useUserStore from "~/store/user";
import { api } from "~/trpc/react";

type Props = {
  page: number;
};

export default function CategoryList({ page }: Props) {
  const router = useRouter();
  const user = useUserStore((state) => state.user);
  const rowsPerPage = 6;
  const offset = rowsPerPage * (page - 1);
  const tccResponse = api.categories.getTotalCategoriesCount.useQuery(
    undefined,
    { enabled: !!user?.id },
  );
  const catResponse = api.categories.getCategories.useQuery(
    {
      limit: rowsPerPage,
      offset,
      userId: user?.id ?? "",
    },
    { enabled: !!user?.id },
  );
  const totalPages = Math.ceil(tccResponse.data ?? 100 / rowsPerPage);
  const saveInterest = api.categories.saveInterest.useMutation({
    onSuccess: () => router.refresh(),
  });

  const renderPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <PaginationItem key={i}>
          <PaginationLink isActive={i === page} href={`?p=${i}`}>
            {i}
          </PaginationLink>
        </PaginationItem>,
      );
    }
    return pageNumbers;
  };

  return (
    <div className="space-y-4">
      {catResponse.isLoading && (
        <div className="space-y-4">
          {Array(10).fill(<Skeleton className="h-5 w-3/4 rounded-full" />)}
        </div>
      )}
      {catResponse?.data?.map(
        ({ categories: { id, name }, user_interested_categories }) => (
          <div key={id} className="flex items-center space-x-2">
            <Checkbox
              id={id}
              value={id}
              defaultChecked={!!user_interested_categories}
              onCheckedChange={() =>
                saveInterest.mutate({ categoryId: id, userId: user!.id })
              }
            />
            <label
              htmlFor={id}
              className="text-sm font-medium leading-none peer-disabled:opacity-70"
            >
              {name}
            </label>
          </div>
        ),
      )}
      {!tccResponse.isLoading && tccResponse.data! > rowsPerPage && (
        <Pagination>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious href={`?p=${page - 1}`} />
              </PaginationItem>
            )}
            {renderPageNumbers().slice(
              Math.max(0, page - 2),
              Math.min(totalPages, page + 1),
            )}
            {page !== totalPages && (
              <PaginationItem>
                <PaginationNext href={`?p=${page + 1}`} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
