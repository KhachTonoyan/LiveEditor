// memoization container
const map = new Map();

/*
Knuth-Morris-Pratt algorithm

An elaborated version of naive pattern matching technique.

Wins time by prepocessing the pattern string into prefix-suffix array, which helps to avoid re-checking on some of the characters.
Ideally fits with alphabet that has a great chance of repeating substrings

Time-Complexity: O(n+m). While the naive's worst case is O(nm)

Space-Complexity: O(m) due to the prefix-suffix array
*/

// O(n)
export default function KMP(content, pattern) {
  // this array will hold the resulting indexes
  const results = [];

  const n = content.length;
  const m = pattern.length;

  // supplement array to preprocess the pattern string
  let prefixSuffix = [];

  // memoization:
  // if the pattern has been processed already we win O(m) time
  if (map.get(pattern)) prefixSuffix = map.get(pattern);
  else preprocess(pattern, m, prefixSuffix);

  let j = 0;
  let i = 0;

  let line = 1;
  let column = 0;

  while (i < n) {
    if (/\n/.exec(content.charAt(i))) {
      line += 1;
      column = -1;
    }
    if (content.charAt(i) === pattern.charAt(j)) {
      i++;
      column++;
      j++;
    }

    if (j === m) {
      // results.push(i - j);
      results.push(`at line ${line} column ${column - pattern.length}`);
      j = prefixSuffix[j - 1];
    } else if (i < n && pattern.charAt(j) !== content.charAt(i)) {
      /*
            Key point of KMP. If mismatch occurs, instead of adjusting pointer to the beggining it will be set to
            prefix end.
          */
      if (j !== 0) j = prefixSuffix[j - 1];
      else {
        i += 1;
        column++;
      }
    }
  }
  return results;
}

/*
      Preprocessing works on this idea: if some suffix subsequence is the same as some prefix subsequence — remember the
      index at which prefix ends so by time main function will be checking matches pointer will not be adjusted to the beginning,
      since it will know that if this point has been reached and there is a prefix which is also a suffix no need to check the prefix again.
  */

// O(m)
function preprocess(pattern, m, prefixSuffix) {
  let j = 0;

  let i = 1;

  prefixSuffix[0] = 0;

  while (i < m) {
    if (pattern.charAt(i) === pattern.charAt(j)) {
      j++;

      prefixSuffix[i] = j;

      i++;
    } else if (j !== 0) j = prefixSuffix[j - 1];
    else {
      prefixSuffix[i] = 0;
      i++;
    }
  }

  // memoize
  map.set(pattern, prefixSuffix);
}
