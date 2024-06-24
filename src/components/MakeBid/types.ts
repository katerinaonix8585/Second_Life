export interface CounterProps {
  countValue: number;
  onMakeABid: (bidValue: number) => void;
  isFirstBid: boolean;
}

export interface InputComponentProps {
  error?: string;
}
