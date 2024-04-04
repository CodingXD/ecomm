"use client";

import { Checkbox } from "~/components/ui/checkbox";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "~/components/ui/pagination";
import { Skeleton } from "~/components/ui/skeleton";
import { api } from "~/trpc/react";

export default function CategoryList() {
  const tccResponse = api.categories.getTotalCategoriesCount.useQuery();
  const catResponse = api.categories.getCategories.useQuery({
    limit: 10,
    offset: 0,
  });

  return (
    <div className="space-y-4">
      {catResponse.isLoading && (
        <div className="space-y-4">
          {Array(10).fill(<Skeleton className="h-5 w-3/4 rounded-full" />)}
        </div>
      )}
      {catResponse.data &&
        catResponse.data.map(({ id, name }) => (
          <div key={id} className="flex items-center space-x-2">
            <Checkbox id={id} />
            <label
              htmlFor={id}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {name}
            </label>
          </div>
        ))}
      {!tccResponse.isLoading && tccResponse.data! > 10 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
