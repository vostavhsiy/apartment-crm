"use client";

import { usePaginateParams } from "@/shared/lib/hooks/use-paginate-params";
import { cn } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Input } from "@/shared/ui/input";
import { SortOrder } from "@apartment-crm/types";
import { useDebounce } from "use-debounce";

import { useEffect, useState } from "react";

export const QueryParamsFilters = () => {
  const { params, addParam } = usePaginateParams();

  const [search, setSearch] = useState(params.search || "");
  const [debounceSearch] = useDebounce(search, 300);

  useEffect(() => {
    addParam("search", debounceSearch);
  }, [debounceSearch]);

  return (
    <div className="flex max-sm:flex-col items-center justify-between gap-3 mb-5">
      <Input
        placeholder="Поиск"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
        }}
        className="w-full max-w-sm"
      />
      <div className="flex items-center gap-2 shrink-0">
        <span>сортировать по</span>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button size={"sm"}>
              {params.sortOrder === SortOrder.CREATED_AT
                ? "дате создания"
                : params.sortOrder === SortOrder.UPDATED_AT
                  ? "дате обновления"
                  : "алфавиту"}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mr-3">
            <DropdownMenuItem
              className={cn(
                params.sortOrder === SortOrder.ALPHABET &&
                  "bg-accent font-semibold",
              )}
              onClick={() => addParam("sortOrder", SortOrder.ALPHABET)}
            >
              по алфавиту
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                params.sortOrder === SortOrder.CREATED_AT &&
                  "bg-accent font-semibold",
              )}
              onClick={() => addParam("sortOrder", SortOrder.CREATED_AT)}
            >
              по дате создания
            </DropdownMenuItem>
            <DropdownMenuItem
              className={cn(
                params.sortOrder === SortOrder.UPDATED_AT &&
                  "bg-accent font-semibold",
              )}
              onClick={() => addParam("sortOrder", SortOrder.UPDATED_AT)}
            >
              по дате обновления
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
