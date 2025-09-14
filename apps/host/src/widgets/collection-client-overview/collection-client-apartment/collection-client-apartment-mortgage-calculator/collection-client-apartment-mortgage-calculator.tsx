"use client";

import {
  extractNumbers,
  formatNumberWithSpaces,
  getMortgageInfo,
} from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";

import { FC, useState } from "react";

import { CollectionClientApartmentMortgageCalculatorSlider } from "./collection-client-apartment-mortgage-calculator-slider";

interface Props {
  priceString?: string | null;
}

export const CollectionClientApartmentMortgageCalculator: FC<Props> = ({
  priceString,
}) => {
  const [firstPayment, setFirstPayment] = useState(() =>
    Math.round(extractNumbers(priceString) * 0.2),
  );
  const [creditPeriod, setCreditPeriod] = useState(25);
  const [creditRate, setCreditRate] = useState(8);

  const price = extractNumbers(priceString);

  const { montlyPayment, creditSum, overPayment } = getMortgageInfo({
    firstPayment,
    creditPeriod,
    creditRate,
    price,
  });

  return (
    <div className="md:sticky md:top-5 space-y-8 bg-background p-5 rounded-lg">
      <p className="text-lg font-semibold">Ипотечный калькулятор</p>
      <div className="space-y-8">
        <Label className="flex-col items-start">
          Стоимость объекта
          <Input
            value={priceString ? formatNumberWithSpaces(price) : ""}
            placeholder="Цена объекта"
            disabled
            readOnly
            className="disabled:opacity-100 disabled:bg-muted [word-spacing:0.3125rem] h-12"
          />
        </Label>
        <CollectionClientApartmentMortgageCalculatorSlider
          value={firstPayment}
          setValue={setFirstPayment}
          label="Первоначальный взнос"
          placeholder="1 000 000"
          price={price}
          min={9}
        />
        <CollectionClientApartmentMortgageCalculatorSlider
          value={creditPeriod}
          setValue={setCreditPeriod}
          label="Срок кредитования"
          placeholder="10"
          onlyValue
          max={30}
          min={1}
          inputLabel="лет"
        />
        <CollectionClientApartmentMortgageCalculatorSlider
          value={creditRate}
          setValue={setCreditRate}
          label="Процентная ставка"
          placeholder="12"
          onlyValue
          max={30}
          min={0.1}
        />
      </div>
      <div>
        <div className="flex items-center justify-between gap-5 border-b py-2">
          <span>Ежемесячный платёж</span>
          <span className="text-xl font-bold">{montlyPayment || "-"}</span>
        </div>
        <div className="flex items-center justify-between gap-5 border-b py-2">
          <span>Сумма кредита</span>
          <span>{creditSum || "-"}</span>
        </div>
        <div className="flex items-center justify-between gap-5 py-2">
          <span>Переплата по процентам</span>
          <span>{overPayment || "-"}</span>
        </div>
      </div>
    </div>
  );
};
