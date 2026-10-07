import { storeConfig } from "@/config/store";

export function formatCurrency(
  amount: number,
  currency: string = storeConfig.currency,
  locale: string = storeConfig.locale,
  fractionDigits?: number,
): string {
  const digits = fractionDigits ?? (currency === "INR" ? 0 : undefined);
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    ...(digits !== undefined
      ? { minimumFractionDigits: digits, maximumFractionDigits: digits }
      : {}),
  }).format(amount);
}
