export interface PriceComparatorFormValues {
  dateA: Date | null;
  priceA: number;
  dateB: Date | null;
  priceB: number;
  useToday: boolean;
}

export interface DatePrice {
  date: Date;
  price: number;
}

export interface PriceComparatorResult {
  priceOne: number;
  priceTwo: number;
  diff: number;
}
