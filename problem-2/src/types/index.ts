export interface Token {
  currency: string;
  date: string;
  price: number;
}

export interface TokenWithIcon extends Token {
  icon?: string;
  name?: string;
}

export interface SwapFormData {
  fromToken: string;
  toToken: string;
  fromAmount: number;
}

export interface SwapTransaction {
  id: string;
  fromToken: string;
  toToken: string;
  fromAmount: number;
  toAmount: number;
  exchangeRate: number;
  timestamp: string;
  status: "pending" | "completed" | "failed" | "cancelled";
}
