# Problem 1: Summation to N

## Problem Description

Implement a function `sum_to_n(n)` that calculates the summation of all integers from 1 to `n`.

**Input**: `n` - any integer.
_Assumption: This input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`._

**Output**: The sum of integers from 1 to `n`.
_Example: `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`_

You are required to provide **3 unique implementations** of this function in JavaScript.

## Solution Approaches

I will explore three distinct ways to implement the `sum_to_n` function:

1.  **Using a `for` loop**: A straightforward iterative approach.
2.  **Using Recursion**: A functional approach using recursive calls.
3.  **Using the Arithmetic Series Formula**: A mathematical approach for direct calculation.
4.  **Using a `do-while` loop**: An additional iterative approach. (This is my extra solution although the task only requires 3 ways)

## Detailed Implementations and Analysis

### 1. `sum_to_n_for_loop` (Using a `for` loop)

This implementation uses a simple `for` loop to iterate from 1 to `n`, adding each number to a running total.

```javascript
const sum_to_n_for_loop = (n) => {
  if (n < 1) {
    return 0;
  }
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};
```

**Explanation**:

- The function initializes `sum` to 0.
- It iterates from `i = 1` up to `n`, adding `i` to `sum` in each iteration.
- Handles edge cases where `n` is less than 1 by returning 0.

**Big O Analysis**:

- **Time Complexity**: O(n) - The loop runs `n` times, performing a constant amount of work in each iteration.
- **Space Complexity**: O(1) - Only a few variables (`sum`, `i`) are used, regardless of the input size.

### 2. `sum_to_n_recursive` (Using Recursion)

This approach uses recursion to calculate the sum. The sum of numbers from 1 to `n` can be expressed as `n` plus the sum of numbers from 1 to `n-1`.

```javascript
const sum_to_n_recursive = (n) => {
  if (n < 1) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_recursive(n - 1);
};
```

**Explanation**:

- The base cases handle `n < 1` (returns 0) and `n === 1` (returns 1).
- For `n > 1`, the function calls itself with `n - 1` and adds `n` to the result.

**Big O Analysis**:

- **Time Complexity**: O(n) - The function makes `n` recursive calls.
- **Space Complexity**: O(n) - Due to the recursion stack, `n` stack frames are created in the worst case.

### 3. `sum_to_n_formula` (Using the Arithmetic Series Formula)

This is the most efficient method, utilizing the mathematical formula for the sum of an arithmetic series: `sum = n * (n + 1) / 2`.

```javascript
const sum_to_n_formula = (n) => {
  if (n < 1) {
    return 0;
  }
  return (n * (n + 1)) / 2;
};
```

**Explanation**:

- Directly applies the arithmetic series formula.
- Handles edge cases where `n` is less than 1 by returning 0.

**Big O Analysis**:

- **Time Complexity**: O(1) - The calculation involves a fixed number of arithmetic operations, regardless of the value of `n`.
- **Space Complexity**: O(1) - Only a few variables are used.

### 4. `sum_to_n_do_while_loop` (Using a `do-while` loop)

This implementation uses a `do-while` loop, ensuring the loop body executes at least once. It iterates from 1 to `n`, adding each number to a running total.

```javascript
const sum_to_n_do_while_loop = (n) => {
  if (n < 1) {
    return 0;
  }
  let sum = 0;
  let i = 1;
  do {
    sum += i;
    i++;
  } while (i <= n);
  return sum;
};
```

**Explanation**:

- The function initializes `sum` to 0 and `i` to 1.
- The `do-while` loop ensures that `sum += i` and `i++` execute at least once, then continues as long as `i` is less than or equal to `n`.
- Handles edge cases where `n` is less than 1 by returning 0 before the loop.

**Big O Analysis**:

- **Time Complexity**: O(n) - The loop runs `n` times, performing a constant amount of work in each iteration.
- **Space Complexity**: O(1) - Only a few variables (`sum`, `i`) are used, regardless of the input size.

## Implementation

The full implementations of these solutions, along with console logs for testing, are directly included in `solution.js`.

## How to Run

To run the solutions directly and see the console logs, execute the `solution.js` file using Node.js:

```bash
node solution.js
```
