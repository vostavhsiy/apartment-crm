import { formatNumberWithSpaces } from "@/shared/lib/utils";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { Slider } from "@/shared/ui/slider";

import { FC } from "react";

interface Props {
  value: number;
  setValue: (val: number) => void;
  label: string;
  placeholder: string;
  price?: number;
  onlyValue?: boolean;
  max?: number;
  min?: number;
  inputLabel?: string;
}

export const CollectionClientApartmentMortgageCalculatorSlider: FC<Props> = ({
  value,
  setValue,
  label,
  placeholder,
  price = 0,
  onlyValue,
  max = 100,
  min,
  inputLabel = "%",
}) => {
  const handleSliderChange = (values: number[]) => {
    if (onlyValue) {
      setValue(values[0]);
    } else {
      setValue(Math.round(price * (values[0] / 100)));
    }
  };

  const percent = Math.min(Math.round((value / price) * 100), 100);

  return (
    <Label className="relative flex-col items-start">
      {label}
      <Input
        value={formatNumberWithSpaces(value)}
        onChange={(e) => {
          const value = e.currentTarget.value.replace(/\D/g, "");
          if (value !== "" && isNaN(+value)) {
            return;
          }
          if (+value > (onlyValue ? max : price)) return;
          setValue(+value);
        }}
        placeholder={placeholder}
        className="appearance-none disabled:opacity-100 disabled:bg-muted [word-spacing:0.3125rem] h-14 rounded-b-none outline-0 !ring-0 !border-border border-b-transparent"
      />
      <Slider
        value={[onlyValue ? value : Math.round((value / price) * 100)]}
        onValueChange={handleSliderChange}
        max={onlyValue ? max : 100}
        min={min || 0}
        className="absolute w-full left-0 bottom-0 rounded-none translate-y-1/2"
      />
      <span className="absolute bottom-7 translate-y-1/2 right-3">
        {!onlyValue && `${isNaN(percent) ? "" : percent}%`}
        {onlyValue && inputLabel}
      </span>
    </Label>
  );
};
