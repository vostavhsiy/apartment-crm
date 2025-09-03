"use client";

import { ApartmentWithRelations } from "@/entities/apartment/model/apartment-with-relations";
import { useFindCollectionsForUser } from "@/entities/collection/api/hooks";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Heading } from "@/shared/ui/heading";
import { Input } from "@/shared/ui/input";
import { Spinner } from "@/shared/ui/spinner";
import { useDebounce } from "use-debounce";

import { FC, useState } from "react";

import { ApartmentToCollectionItem } from "./apartment-to-collection-item";

interface Props {
  apartment: ApartmentWithRelations;
}

export const ApartmentToCollectionDialog: FC<Props> = ({ apartment }) => {
  const [search, setSearch] = useState("");
  const [debounsedSearch] = useDebounce(search, 300);

  const {
    data: collectionData,
    isPending,
    ref,
    hasNextPage,
    isFetchingNextPage,
  } = useFindCollectionsForUser({
    search: debounsedSearch,
  });

  return (
    <Dialog
      onOpenChange={(open) => {
        if (!open) setSearch("");
      }}
    >
      <DialogTrigger asChild>
        <Button type="button">Добавить в подборку</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Добавить объект в подборку</DialogTitle>
        <Input
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder="Поиск подборок"
        />
        <div className="flex flex-col gap-3 h-80 overflow-auto border p-3 rounded-md">
          {isPending && <Spinner />}
          {!isPending &&
            !!collectionData?.pages?.[0]?.data.length &&
            collectionData?.pages
              ?.flatMap((page) => page.data)
              .map((collection) => {
                return (
                  <ApartmentToCollectionItem
                    key={collection.id}
                    apartment={apartment}
                    collection={collection}
                  />
                );
              })}
          {!isPending && !collectionData?.pages?.[0]?.data.length && (
            <Heading
              className="flex-1 flex items-center justify-center"
              asChild
              size={"h2"}
            >
              <p>Подборок не найдено!</p>
            </Heading>
          )}
          {isFetchingNextPage && (
            <div className="mt-5">
              <Spinner />
            </div>
          )}
          {hasNextPage && !isFetchingNextPage && (
            <div ref={ref} className="h-10" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
