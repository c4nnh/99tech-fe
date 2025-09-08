import axios from "axios";
import type { Token, TokenWithIcon } from "../types/index.ts";
import { API_CONFIG, TOKEN_ICONS_CONFIG } from "../constants/config";

export const api = axios.create({
  baseURL: API_CONFIG.BASE_URL,
  timeout: API_CONFIG.TIMEOUT,
});

export const fetchTokenPrices = async (): Promise<Token[]> => {
  try {
    const response = await api.get<Token[]>("/prices.json");
    return response.data;
  } catch (error) {
    console.error("Error fetching token prices:", error);
    throw new Error("Failed to fetch token prices");
  }
};

export const getTokensWithIcons = async (): Promise<TokenWithIcon[]> => {
  try {
    const tokens = await fetchTokenPrices();

    // Filter out tokens without prices and remove duplicates
    const uniqueTokens = tokens
      .filter((token) => token.price > 0)
      .reduce((acc, token) => {
        const existing = acc.find((t) => t.currency === token.currency);
        if (!existing || new Date(token.date) > new Date(existing.date)) {
          const index = acc.findIndex((t) => t.currency === token.currency);
          if (index >= 0) {
            acc[index] = token;
          } else {
            acc.push(token);
          }
        }
        return acc;
      }, [] as Token[]);

    // Add icon URLs and names
    return uniqueTokens.map((token) => ({
      ...token,
      icon: `${TOKEN_ICONS_CONFIG.BASE_URL}/${token.currency}.svg`,
      name: getTokenName(token.currency),
    }));
  } catch (error) {
    console.error("Error getting tokens with icons:", error);
    throw error;
  }
};

// Helper function to get token display names
const getTokenName = (currency: string): string => {
  const tokenNames: Record<string, string> = {
    SWTH: "Switcheo",
    ETH: "Ethereum",
    BTC: "Bitcoin",
    USDC: "USD Coin",
    USDT: "Tether",
    BNB: "Binance Coin",
    ADA: "Cardano",
    DOT: "Polkadot",
    MATIC: "Polygon",
    AVAX: "Avalanche",
    SOL: "Solana",
    ATOM: "Cosmos",
    NEAR: "Near Protocol",
    FTM: "Fantom",
    LUNA: "Terra Luna",
    OSMO: "Osmosis",
  };

  return tokenNames[currency] || currency;
};
