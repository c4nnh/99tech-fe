// Import necessary React libraries and hooks
import React, { useMemo } from "react";

// Assuming these types and hooks are defined elsewhere or would be provided.
// For the purpose of this refactor, I'm defining placeholder types/components.
interface BoxProps {
  className?: string;
  // Other box properties
}

// Define Blockchain enum
enum Blockchain {
  OSMOSIS = "Osmosis",
  ETHEREUM = "Ethereum",
  ARBITRUM = "Arbitrum",
  ZILLIQA = "Zilliqa",
  NEO = "Neo",
}

// Or we can save blockchain in database. It's very useful in case we want to change priority
// Then we will have interface like this:
// interface Blockchain {
//   id: string;
//   name: string;
//   priority: number;
// }
// With this approach, we can easily change the priority of a blockchain without changing the code.

// Corrected WalletBalance interface: added 'blockchain' property, using enum
interface WalletBalance {
  id: string; // Added unique identifier for list keying
  currency: string;
  amount: number;
  blockchain: Blockchain; // Now using Blockchain enum
}

// Helper function moved outside the component to prevent unnecessary re-creations
// and improve clarity. It's a pure function.
const getPriority = (blockchain: Blockchain): number => {
  switch (blockchain) {
    case Blockchain.OSMOSIS:
      return 100;
    case Blockchain.ETHEREUM:
      return 50;
    case Blockchain.ARBITRUM:
      return 30;
    case Blockchain.ZILLIQA:
    case Blockchain.NEO: // Grouped common priority for Zilliqa and Neo
      return 20;
    default:
      return -99;
  }
};

interface WalletPageProps extends BoxProps {} // Renamed Props to WalletPageProps for clarity

const WalletPage: React.FC<WalletPageProps> = (props) => {
  const { children, ...rest } = props;

  // Use custom hooks for data fetching and processing
  const balances = useWalletBalances();
  const prices = usePrices("USD"); // Pass "USD" as baseCurrency

  // Use the custom hook to get sorted and formatted balances
  const formattedBalances = useFormattedWalletBalances(balances, prices);

  // Render rows using the pre-formatted data
  // Using useCallback for `renderRow` if it were passed down to avoid re-creation
  // For direct mapping, useMemo is sufficient for the `rows` array itself
  const rows = useMemo(() => {
    return formattedBalances.map((balance: FormattedWalletBalance) => (
      <WalletRow
        key={balance.id}
        className={rest.className}
        // Removed amount prop as it's not displayed in WalletRow per new requirement
        usdValue={balance.usdValue}
        formattedAmount={balance.formatted}
      />
    ));
  }, [formattedBalances, rest.className]); // Dependencies for rows

  // Basic responsive styling - In a real app, this would be handled by CSS modules,
  // styled-components, or a UI library.
  const containerStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column",
    padding: "16px", // Mobile-first padding
    "@media (min-width: 768px)": {
      // Example for tablet/desktop
      padding: "24px",
    },
  };

  return (
    <div style={containerStyle} {...rest}>
      {children}
      {rows}
    </div>
  );
};

// Assuming these are external hooks/components
declare function useWalletBalances(): WalletBalance[];
declare function usePrices(baseCurrency: string): { [key: string]: number }; // Added baseCurrency parameter

// This interface remains the same
interface FormattedWalletBalance extends WalletBalance {
  formatted: string;
  usdValue: number; // Added usdValue for clarity and pre-calculation
}

// Custom hook to encapsulate the logic for filtering, sorting, and formatting balances.
// This improves separation of concerns and reusability.
const useFormattedWalletBalances = (
  balances: WalletBalance[],
  prices: { [key: string]: number }
): FormattedWalletBalance[] => {
  const sortedAndFormattedBalances = useMemo(() => {
    // Filter balances: only include those with valid priority and positive amount
    const filteredBalances = balances.filter((balance: WalletBalance) => {
      const priority = getPriority(balance.blockchain);
      return priority > -99 && balance.amount > 0;
    });

    // Sort balances by priority
    const sorted = filteredBalances.sort(
      (lhs: WalletBalance, rhs: WalletBalance) => {
        const leftPriority = getPriority(lhs.blockchain);
        const rightPriority = getPriority(rhs.blockchain);
        return leftPriority === rightPriority
          ? 0
          : leftPriority > rightPriority
          ? -1
          : 1;
      }
    );

    // Format balances and calculate USD value
    return sorted.map((balance: WalletBalance) => {
      const usdValue = prices[balance.currency] * balance.amount;
      return {
        ...balance,
        formatted: balance.amount.toFixed(2), // Format to 2 decimal places for consistency
        usdValue, // Pre-calculated USD value
      };
    });
  }, [balances, prices]); // Dependency array now correctly includes 'balances' and 'prices'

  return sortedAndFormattedBalances;
};

// WalletRow component placeholder. In a real app, this would be a separate component file.
// It should accept `formattedAmount` as a string, not `amount` directly.
interface WalletRowProps {
  className?: string;
  amount: number;
  usdValue: number;
  formattedAmount: string;
}

const WalletRow: React.FC<WalletRowProps> = ({
  className,
  usdValue,
  formattedAmount,
}) => {
  return (
    <div className={className}>
      <span>
        {formattedAmount} ~ {usdValue.toFixed(2)}
      </span>
    </div>
  );
};

export default WalletPage; // Export the component
