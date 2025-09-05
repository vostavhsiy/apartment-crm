import { SortOrder } from "@apartment-crm/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useMemo } from "react";

export function usePaginateParams() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const params = useMemo(() => {
    return {
      page: searchParams.get("page")
        ? Number(searchParams.get("page"))
        : undefined,
      perPage: searchParams.get("perPage")
        ? Number(searchParams.get("perPage"))
        : undefined,
      search: searchParams.get("search") || undefined,
      sortOrder:
        (searchParams.get("sortOrder") as SortOrder) || SortOrder.ALPHABET,
    };
  }, [searchParams]);

  return {
    params,
    addParam: (
      key: "page" | "perPage" | "search" | "sortOrder",
      value: string,
    ) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(key, value);
      if (key === "sortOrder") params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    },
    removeParam: (key: "page" | "perPage" | "search" | "sortOrder") => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(key);
      if (key === "sortOrder") params.set("page", "1");
      router.push(`${pathname}?${params.toString()}`);
    },
  };
}
