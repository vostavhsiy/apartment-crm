import {
  cn,
  extractNumbers,
  formatNumberWithSpaces,
  getMortgageSchedule,
} from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";

import { FC, useMemo } from "react";

import { MortgageItem } from "./mortgage.store";

interface Props {
  item: MortgageItem;
  order: number;
}

export const CollectionClientMortgagePaymentsButton: FC<Props> = ({
  item,
  order,
}) => {
  const mortgageSchedule = useMemo(() => {
    return getMortgageSchedule({
      principal: extractNumbers(item.creditSum),
      price: item.price,
      downPayment: item.firstPayment,
      years: item.creditPeriod,
      annualRate: item.creditRate,
    });
  }, [item]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>График платежей</Button>
      </DialogTrigger>
      <DialogContent className="h-[90vh] w-[90%] sm:max-w-full flex flex-col gap-5">
        <DialogTitle>График платежей</DialogTitle>
        <div className="flex-1 max-h-[95%] overflow-hidden flex rounded-md border">
          <div className="w-full max-w-[12.5rem] min-w-[9.375rem]  max-md:hidden shrink-0 flex flex-col border-r">
            <div className="border-b px-4 flex-1 flex items-center gap-4 justify-center text-center">
              <span>Мой расчет {order}</span>
            </div>
            <div className="text-sm mt-2 px-4 text-muted-foreground justify-end text-end">
              Ежемесячный платёж
            </div>
            <div className="border-b px-4 flex-1 flex items-center md:justify-end md:text-end font-semibold">
              {item.montlyPayment || 0} ₽
            </div>
            <div className="text-sm mt-2 px-4 text-muted-foreground justify-end text-end">
              Первонач. взнос
            </div>
            <div className="border-b px-4 flex-1 flex items-center md:justify-end md:text-end">
              {formatNumberWithSpaces(item.firstPayment) || 0} ₽ (
              {Math.round((item.firstPayment / item.price) * 100)}%)
            </div>
            <div className="text-sm mt-2 px-4 text-muted-foreground justify-end text-end">
              Сумма кредита
            </div>
            <div className="border-b px-4 flex-1 flex items-center md:justify-end md:text-end">
              {item.creditSum || 0} ₽
            </div>
            <div className="text-sm mt-2 px-4 text-muted-foreground justify-end text-end">
              Срок
            </div>
            <div className="border-b px-4 flex-1 flex items-center md:justify-end md:text-end">
              {item.creditPeriod} лет
            </div>
            <div className="text-sm mt-2 px-4 text-muted-foreground justify-end text-end">
              Ставка
            </div>
            <div className="px-4 flex-1 flex items-center md:justify-end md:text-end">
              {item.creditRate}%
            </div>
          </div>
          <div className="relative w-full p-4 overflow-hidden">
            <div className="w-full h-full flex flex-col border rounded-md overflow-auto">
              <div className="min-w-[50rem] shrink-0 sticky top-0 grid grid-cols-[1fr_1.5fr_1fr_1fr_1.5fr_1.5fr] py-2 px-4 bg-secondary rounded-t-md text-sm text-muted-foreground">
                <div>Год</div>
                <div>Месяц</div>
                <div>Платёж</div>
                <div>Проценты</div>
                <div className="text-end">Основной долг</div>
                <div className="text-end">Остаток долга</div>
              </div>
              <div className="min-w-[50rem] flex-1">
                {mortgageSchedule.map((row, index) => {
                  return (
                    <div
                      key={index}
                      className={cn(
                        "grid grid-cols-[1fr_1.5fr_1fr_1fr_1.5fr_1.5fr] py-2 px-4 text-sm",
                        index > 0 && "border-t",
                      )}
                    >
                      <div
                        className={cn(
                          "text-muted-foreground/80",
                          mortgageSchedule[index - 1]?.year !== row.year &&
                            "text-primary font-semibold",
                        )}
                      >
                        {row.year}
                      </div>
                      <div>{row.month}</div>
                      <div>{formatNumberWithSpaces(row.payment) || 0} ₽</div>
                      <div>{formatNumberWithSpaces(row.interest) || 0} ₽</div>
                      <div className="text-end">
                        {formatNumberWithSpaces(row.principal) || 0} ₽
                      </div>
                      <div className="text-end">
                        {formatNumberWithSpaces(row.balance) || 0} ₽
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
