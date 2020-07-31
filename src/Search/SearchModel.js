import controller from './SearchController.js';
// import File from '../Entities/File.js';
// import Folder from '../Entities/Folder.js';

// // mock data
// const root = new Folder('root', null, null, 'root');
// const ch = new Folder('src', root);

// root.children = {
//   // 'aloha.js': new File('aloha.js', root, `${'aloha'.repeat(1000)}`),
//   // 'a.js': new File('a.js', root, `${'a'.repeat(200)}`),
//   'hidden.js': new File('hidden.js', root, `${'hidden'}`),
//   // 'htmlTest.js': new File('htmlTest.js', root, `${document.getElementById('content').value}`),
//   src: ch,
//   fold: new Folder(
//     'fold',
//     root,
//     {
//       'i.js': new File('i.js', { name: 'fold' }, `${'hello \n'.repeat(10)}`),
//     },
//     'id',
//   ),
//   // 'index.js': new File('index.js', root, `${'hello!\nearly\ncanal\nrodeo\nlate latte'.repeat(10)}`),
//   'index.js': new File('index.js', root, `${'index'}`),
// };
// ch.children = { data: new Folder('data', {}) };
// root.children.src.children.data.parent = root.children.src;
// console.log(root);

// memoization container
const map = new Map();

class Search {
  search(root, pattern, filesToExclude, filesToInclude) {
    const values = Object.values(root.children);
    searchUtil(values, pattern, filesToExclude, filesToInclude);
  }

  // works with mock data
  // search(_, pattern, filesToExclude, filesToInclude) {
  //   const values = Object.values(root.children);
  //   searchUtil(values, pattern, filesToExclude, filesToInclude);
  // }
}

// global variable "path" to trace the road
let path = '';

// recursive function that traverses the file system tree
// returns when neither file nor folder is met
function searchUtil(values, pattern, filesToExclude, filesToInclude) {
  // iteratively traverse all the children of the current folder
  values.forEach((v) => {
    if (v && v.type === 'file'
    && !filesToExclude.get(v.name)
    && (filesToInclude.size === 0 || (filesToInclude.get(v.name)))) {
      const results = KMP(v.content, pattern);

      path += `/${v.parent.name}`;

      if (results.length !== 0) {
        path += `/${v.name}`;
        results.forEach((i) => controller.updateResults(`${path} ${i}`));
        path = '';
      } else {
        path = '';
      }
    } else if (v && v.type === 'folder') {
      // recursive step
      searchUtil(Object.values(v.children), pattern, filesToExclude, filesToInclude); // recurrence relation: O(n)
    }
  });
}

/*
Knuth-Morris-Pratt algorithm

An elaborated version of naive pattern matching technique.

Wins time by prepocessing the pattern string into prefix-suffix array, which helps to avoid re-checking on some of the characters.
Ideally fits with alphabet that has a great chance of repeating substrings

Time-Complexity: O(n+m). While the naive's worst case is O(nm)

Space-Complexity: O(m) due to the prefix-suffix array
*/

// O(n)
function KMP(content, pattern) {
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

export default Search;
