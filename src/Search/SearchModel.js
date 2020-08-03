import controller from './SearchController.js';
import KMP from './KMPUtil.js';

class Search {
  search(root, pattern, filesToExclude, filesToInclude) {
    const values = Object.values(root.children);
    searchUtil(values, pattern, filesToExclude, filesToInclude);
  }
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

export default Search;
