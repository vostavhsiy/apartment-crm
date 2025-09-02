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

export const TIPTAP_EMPTY_DOC =
  '{"type":"doc","content":[{"type":"paragraph","attrs":{"textAlign":null}}]}';
