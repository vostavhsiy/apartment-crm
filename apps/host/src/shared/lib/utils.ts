import { months as monthsList } from "@apartment-crm/constants";
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(input: string) {
  let namePart = input.includes("@") ? input.split("@")[0] : input;

  namePart = namePart.replace(/[^a-zA-Z ]/g, "");

  const words = namePart.trim().split(/\s+/);

  if (words.length === 0) {
    return "?";
  }

  if (words.length === 1) {
    return words[0].substring(0, 2).toUpperCase();
  }

  return (words[0][0] + words[1][0]).toUpperCase();
}

export function reorder<T>(
  list: T[],
  startIndex: number,
  endIndex: number,
): T[] {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
}

export function wordEnding(
  count: number,
  forms: [string, string, string],
): string {
  // forms: [singular, few, many], e.g. ['день', 'дня', 'дней']
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return forms[0];
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 10 || mod100 >= 20))
    return forms[1];
  return forms[2];
}

export async function copyToClipboard(textToCopy: string) {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(textToCopy);
    toast.success("Скопировано в буфер обмена!");
  } else {
    const textArea = document.createElement("textarea");
    textArea.value = textToCopy;

    textArea.style.position = "absolute";
    textArea.style.left = "-999999px";

    document.body.prepend(textArea);
    textArea.select();

    try {
      document.execCommand("copy");
      toast.success("Скопировано в буфер обмена!");
    } catch (error) {
      console.error(error);
    } finally {
      textArea.remove();
    }
  }
}

export function getFormDataFromObject(obj: Record<string, any>): FormData {
  const formData = new FormData();

  const appendValue = (key: string, value: any) => {
    if (value instanceof File) {
      formData.append(key, value);
    } else if (value instanceof Blob) {
      formData.append(key, value);
    } else if (typeof value === "object" && value !== null) {
      formData.append(key, JSON.stringify(value));
    } else {
      formData.append(key, String(value));
    }
  };

  Object.entries(obj).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach((item) => {
        appendValue(`${key}`, item);
      });
    } else {
      appendValue(key, value);
    }
  });

  return formData;
}

export function getMMSSfromSeconds(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Pad with leading zeros
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = remainingSeconds.toString().padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

export function getRelativeTime(inputDate: Date) {
  const now = new Date();
  const date = new Date(inputDate);
  const diffTime = Math.abs(now.getTime() - date.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays > 3) {
    return date.toLocaleDateString("ru-RU");
  }

  const diffMinutes = Math.floor(diffTime / (1000 * 60));
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60));

  if (diffMinutes < 1) {
    return "только что";
  } else if (diffMinutes < 60) {
    const minutes = diffMinutes;
    let minuteWord = "мин";
    return `${minutes} ${minuteWord} назад`;
  } else if (diffHours < 24) {
    const hours = diffHours;
    let hourWord = "ч";
    return `${hours} ${hourWord} назад`;
  } else {
    const days = diffDays;
    let dayWord = "д";
    return `${days} ${dayWord} назад`;
  }
}

export function getShortNumber(num: number) {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M";
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
}

export function getMapBounds(coordinates: number[][]) {
  let minLat = Infinity,
    minLng = Infinity;
  let maxLat = -Infinity,
    maxLng = -Infinity;

  for (const coords of coordinates) {
    const lat = coords[1];
    const lng = coords[0];

    if (lat < minLat) minLat = lat;
    if (lat > maxLat) maxLat = lat;
    if (lng < minLng) minLng = lng;
    if (lng > maxLng) maxLng = lng;
  }

  return [
    [minLng, minLat],
    [maxLng, maxLat],
  ];
}

export function isInMapBounds(coords: number[], bounds: number[][]) {
  if (!bounds || bounds.length !== 2) return false;

  const [southWest, northEast] = bounds;
  const [lat, lng] = coords;

  return (
    lat >= southWest[0] &&
    lat <= northEast[0] &&
    lng >= southWest[1] &&
    lng <= northEast[1]
  );
}

export function extractNumbers(input?: string | null) {
  if (!input) return 0;
  const n = input?.replace(/\D/g, "");
  return n && isNaN(+n) ? 0 : +n;
}

export function formatNumberWithSpaces(num: number | null) {
  return num
    ? new Intl.NumberFormat("fr-FR", {
        maximumFractionDigits: 2,
      })
        .format(num)
        .replace(/\s/g, "\u00A0")
    : "";
}

export function getMortgageInfo(props: {
  price: number;
  firstPayment: number;
  creditPeriod: number;
  creditRate: number;
}) {
  const creditSum = props.price - props.firstPayment;
  const monthlyRate = props.creditRate / 12 / 100;
  const creditMonthsCount = props.creditPeriod * 12;
  const Ka =
    (monthlyRate * (1 + monthlyRate) ** creditMonthsCount) /
    ((1 + monthlyRate) ** creditMonthsCount - 1);
  const montlyPayment = creditSum * Ka;
  const overPayment = montlyPayment * creditMonthsCount - creditSum;

  return {
    montlyPayment: formatNumberWithSpaces(Math.round(montlyPayment)),
    creditSum: formatNumberWithSpaces(Math.round(creditSum)),
    overPayment: formatNumberWithSpaces(Math.round(overPayment)),
  };
}

type ScheduleOptions = {
  principal?: number;
  price?: number;
  downPayment?: number;
  years: number;
  annualRate: number;
};

export function getMortgageSchedule(opts: ScheduleOptions): PaymentRow[] {
  const { principal, price, downPayment, years, annualRate } = opts;

  const startDate = new Date();

  let P: number;
  if (typeof principal === "number") {
    P = principal;
  } else if (typeof price === "number" && typeof downPayment === "number") {
    P = price - downPayment;
  } else {
    throw new Error("Укажи либо principal, либо price и downPayment.");
  }

  const months = years * 12;
  const i = annualRate / 12 / 100; // месячная ставка
  const pow = Math.pow(1 + i, months);
  const monthlyPayment = (P * (i * pow)) / (pow - 1); // аннуитетный платёж (как число, не округляем для расчётов)

  const schedule: PaymentRow[] = [];
  let balance = P;

  for (let k = 1; k <= months; k++) {
    const currentDate = new Date(startDate);
    currentDate.setMonth(currentDate.getMonth() + k); // первый платёж = следующий месяц

    const year = currentDate.getFullYear();
    const monthIdx = currentDate.getMonth(); // 0..11
    const month = monthIdx + 1;
    const monthName = monthsList[monthIdx];

    // проценты за месяц (по текущему остатку до платежа)
    const interestExact = balance * i;
    // часть в счёт тела кредита
    let principalExact = monthlyPayment - interestExact;

    // если остаток меньше principalExact (последний платёж) — погашаем остаток полностью
    let paymentExact = monthlyPayment;
    if (principalExact > balance) {
      principalExact = balance;
      paymentExact = interestExact + principalExact;
      balance = 0;
    } else {
      balance = balance - principalExact;
      // чтобы избежать очень маленьких отрицательных чисел из-за FP
      if (Math.abs(balance) < 1e-8) balance = 0;
    }

    // Округляем для вывода (банки обычно показывают в копейках/рублях; тут — целые рубли)
    schedule.push({
      year,
      month: monthName,
      payment: Math.round(monthlyPayment),
      interest: Math.round(interestExact),
      principal: Math.round(principalExact),
      balance: Math.round(balance),
    });

    if (balance <= 0) break;
  }

  return schedule;
}

export type PaymentRow = {
  year: number;
  month: string;
  payment: number;
  interest: number;
  principal: number;
  balance: number;
};

// export function getMortgageSchedule(
//   loanAmount: number,
//   initialPayment: number,
//   years: number,
//   annualRate: number,
// ): PaymentRow[] {
//   const schedule: PaymentRow[] = [];
//   const months = years * 12;
//   const monthlyRate = annualRate / 12 / 100;

//   let balance = loanAmount - initialPayment;

//   // считаем аннуитетный платёж
//   const monthlyPayment =
//     balance *
//     (monthlyRate * Math.pow(1 + monthlyRate, months)) /
//     (Math.pow(1 + monthlyRate, months) - 1);

//   for (let i = 1; i <= months; i++) {
//     const currentDate = new Date();
//     currentDate.setMonth(currentDate.getMonth() + i);

//     const year = currentDate.getFullYear();
//     const month = currentDate.getMonth() + 1;

//     const interest = balance * monthlyRate;
//     const principal = monthlyPayment - interest;
//     balance -= principal;

//     if (balance < 0) balance = 0;

//     schedule.push({
//       year,
//       month: monthsList[month],
//       payment: Math.round(monthlyPayment),
//       interest: Math.round(interest),
//       principal: Math.round(principal),
//       balance: Math.round(balance),
//     });

//     if (balance <= 0) break;
//   }

//   return schedule;
// }

export const TIPTAP_EMPTY_DOC =
  '{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null}}]}';
