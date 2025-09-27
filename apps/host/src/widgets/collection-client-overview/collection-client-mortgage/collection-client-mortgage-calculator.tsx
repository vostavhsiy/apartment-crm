"use client";

import { getMortgageInfo } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { Plus } from "lucide-react";

import { FC, useState } from "react";

import { MortgageCalculatorSlider } from "../mortgage-calculator-slider";
import { MortgageItem } from "./mortgage.store";

interface Props {
  onAdding: (item: MortgageItem) => void;
}

export const CollectionClientMortgageCalculator: FC<Props> = ({ onAdding }) => {
  const [price, setPrice] = useState(() => 5500000);
  const [firstPayment, setFirstPayment] = useState(() =>
    Math.round(price * 0.2),
  );
  const [creditPeriod, setCreditPeriod] = useState(25);
  const [creditRate, setCreditRate] = useState(8);

  const { montlyPayment, creditSum, overPayment } = getMortgageInfo({
    firstPayment,
    creditPeriod,
    creditRate,
    price,
  });

  return (
    <div className="space-y-8 bg-background p-5 rounded-lg">
      <p className="text-lg font-semibold">Ипотечный калькулятор</p>
      <div className="space-y-8">
        <MortgageCalculatorSlider
          value={price}
          setValue={setPrice}
          label="Стоимость объекта"
          placeholder="1 000 000"
          inputLabel="₽"
          onlyValue
          min={100000}
          max={1000000000}
        />
        <MortgageCalculatorSlider
          value={firstPayment}
          setValue={setFirstPayment}
          label="Первоначальный взнос"
          placeholder="1 000 000"
          price={price}
          min={9}
        />
        <MortgageCalculatorSlider
          value={creditPeriod}
          setValue={setCreditPeriod}
          label="Срок кредитования"
          placeholder="10"
          onlyValue
          max={30}
          min={1}
          inputLabel="лет"
        />
        <MortgageCalculatorSlider
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
          <span>
            Переплата
            <br /> по процентам
          </span>
          <span>{overPayment || "-"}</span>
        </div>
      </div>
      <Button
        className="w-full"
        onClick={() =>
          onAdding({
            price,
            firstPayment,
            creditPeriod,
            creditRate,
            montlyPayment,
            creditSum,
            overPayment,
          })
        }
      >
        <Plus /> К сравнению
      </Button>
    </div>
  );
};
