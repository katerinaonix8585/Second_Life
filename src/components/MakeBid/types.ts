export interface CounterProps {
  countValue: number;
  onMakeABid: (bidValue: number) => void;
}

export interface InputComponentProps {
  error?: string;
}
