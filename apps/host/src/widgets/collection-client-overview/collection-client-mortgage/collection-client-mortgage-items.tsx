"use client";

import { formatNumberWithSpaces } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { Skeleton } from "@/shared/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/shared/ui/tooltip";
import { CircleQuestionMark, Trash } from "lucide-react";

import { CollectionClientMortgagePaymentsButton } from "./collection-client-mortgage-payments-button";
import { useMortgageStore } from "./mortgage.store";

export const CollectionClientMortgageItems = () => {
  const { items, setItems } = useMortgageStore();

  return (
    <div className="h-full flex flex-col space-y-8 p-5 pr-0 rounded-lg">
      <div>
        <p className="text-lg font-semibold">Сравнение</p>
      </div>
      <div className="w-full flex-1 flex items-stretch gap-3">
        <div className="max-md:hidden shrink-0 flex flex-col min-w-[9.375rem] max-w-[12.5rem]">
          <div className="flex-1 flex items-center text-sm text-muted-foreground">
            Расчет
          </div>
          <div className="flex-1 flex items-center text-sm text-muted-foreground">
            Ежемесячный платёж
          </div>
          <div className="flex-1 flex items-center text-sm text-muted-foreground gap-2">
            <span>Первонач. взнос</span>
            <Tooltip>
              <TooltipTrigger asChild>
                <CircleQuestionMark className="size-4 shrink-0" />
              </TooltipTrigger>
              <TooltipContent>
                <p>От стоимости объекта в договоре</p>
              </TooltipContent>
            </Tooltip>
          </div>
          <div className="flex-1 flex items-center text-sm text-muted-foreground">
            Сумма кредита
          </div>
          <div className="flex-1 flex items-center text-sm text-muted-foreground">
            Срок
          </div>
          <div className="flex-1 flex items-center text-sm text-muted-foreground">
            Ставка
          </div>
          <div className="flex-1 flex items-center text-sm text-muted-foreground">
            Ипотечная программа
          </div>
          <div className="flex-1 flex items-center text-sm text-muted-foreground">
            Город покупки
          </div>
          <div className="flex-1"></div>
        </div>
        <div className="max-md:min-h-[41.875rem] flex-1 flex items-stretch gap-3 overflow-auto pr-5">
          {items.map((item, index) => {
            const order = items.length - index;
            return (
              <div
                key={index}
                className="flex-shrink-0 flex flex-col min-w-[9.375rem] max-w-[12.5rem] bg-background rounded-md shadow-lg"
              >
                <div className="border-b px-4 flex-1 flex items-center gap-4 justify-between">
                  <span>Мой расчет {order}</span>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        size={"icon"}
                        variant={"ghost"}
                        className="text-muted-foreground"
                      >
                        <Trash />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <div className="w-full flex flex-col items-center gap-5">
                        <DialogTitle className="text-xl font-semibold">
                          Удалить «Расчет {items.length - index}»?
                        </DialogTitle>
                        <p className="text-muted-foreground">
                          Восстановление будет невозможно
                        </p>
                        <div className="w-full flex items-center gap-3">
                          <DialogClose asChild>
                            <Button
                              variant={"destructive"}
                              className="flex-1"
                              onClick={() => {
                                setItems(items.filter((_, i) => i !== index));
                              }}
                            >
                              Удалить
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button variant={"outline"} className="flex-1">
                              Отмена
                            </Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="md:hidden text-sm mt-2 px-4 text-muted-foreground">
                  Ежемесячный платёж
                </div>
                <div className="border-b px-4 flex-1 flex items-center md:justify-end md:text-end font-semibold">
                  {item.montlyPayment || 0} ₽
                </div>
                <div className="md:hidden text-sm mt-2 px-4 text-muted-foreground">
                  Первонач. взнос
                </div>
                <div className="border-b px-4 flex-1 flex items-center md:justify-end md:text-end">
                  {formatNumberWithSpaces(item.firstPayment) || 0} ₽ (
                  {Math.round((item.firstPayment / item.price) * 100)}%)
                </div>
                <div className="md:hidden text-sm mt-2 px-4 text-muted-foreground">
                  Сумма кредита
                </div>
                <div className="border-b px-4 flex-1 flex items-center md:justify-end md:text-end">
                  {item.creditSum || 0} ₽
                </div>
                <div className="md:hidden text-sm mt-2 px-4 text-muted-foreground">
                  Срок
                </div>
                <div className="border-b px-4 flex-1 flex items-center md:justify-end md:text-end">
                  {item.creditPeriod} лет
                </div>
                <div className="md:hidden text-sm mt-2 px-4 text-muted-foreground">
                  Ставка
                </div>
                <div className="border-b px-4 flex-1 flex items-center md:justify-end md:text-end">
                  {item.creditRate}%
                </div>
                <div className="md:hidden text-sm mt-2 px-4 text-muted-foreground">
                  Ипотечная программа
                </div>
                <div className="border-b px-4 flex-1 flex items-center md:justify-end md:text-end">
                  -
                </div>
                <div className="md:hidden text-sm mt-2 px-4 text-muted-foreground">
                  Город покупки
                </div>
                <div className="px-4 flex-1 flex items-center md:justify-end md:text-end">
                  -
                </div>
                <div className="flex-1 px-4 flex items-center justify-center">
                  <CollectionClientMortgagePaymentsButton
                    item={item}
                    order={order}
                  />
                </div>
              </div>
            );
          })}
          {items.length === 0 && (
            <Skeleton className="flex-1 w-full rounded-md max-w-[12.5rem]" />
          )}
        </div>
      </div>
    </div>
  );
};
