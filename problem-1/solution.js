/**
 * Problem 1: Summation to N
 *
 * Implement a function `sum_to_n(n)` that calculates the summation of all integers from 1 to `n`.
 *
 * Input: `n` - any integer.
 * Assumption: This input will always produce a result lesser than `Number.MAX_SAFE_INTEGER`.
 *
 * Output: The sum of integers from 1 to `n`.
 * Example: `sum_to_n(5) === 1 + 2 + 3 + 4 + 5 === 15`
 */

/**
 * Implementation 1: Using a for loop
 * A straightforward iterative approach.
 * @param {number} n - The integer up to which to calculate the sum.
 * @returns {number} The sum of integers from 1 to n.
 */
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

/**
 * Implementation 2: Using Recursion
 * A recursive approach to calculate the sum.
 * @param {number} n - The integer up to which to calculate the sum.
 * @returns {number} The sum of integers from 1 to n.
 */
const sum_to_n_recursive = (n) => {
  if (n < 1) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return n + sum_to_n_recursive(n - 1);
};

/**
 * Implementation 3: Using the Arithmetic Series Formula
 * A mathematical approach for direct calculation.
 * Formula: sum = n * (n + 1) / 2
 * @param {number} n - The integer up to which to calculate the sum.
 * @returns {number} The sum of integers from 1 to n.
 */
const sum_to_n_formula = (n) => {
  if (n < 1) {
    return 0;
  }
  return (n * (n + 1)) / 2;
};

/**
 * Implementation 4: Using a do-while loop
 * An iterative approach that executes the loop body at least once.
 * @param {number} n - The integer up to which to calculate the sum.
 * @returns {number} The sum of integers from 1 to n.
 */
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

// Export the functions for testing

// --- Console Log Tests ---
// You can run this file directly using Node.js: node solution.js

const test_cases = [5, 10, 1, 0, -5];

test_cases.forEach((n, index) => {
  console.log(`\n--- Test Case ${index + 1}: n = ${n} ---`);
  console.log(`Using for loop: ${sum_to_n_for_loop(n)}`);
  console.log(`Using recursive: ${sum_to_n_recursive(n)}`);
  console.log(`Using formula: ${sum_to_n_formula(n)}`);
  console.log(`Using do-while loop: ${sum_to_n_do_while_loop(n)}`);
});
