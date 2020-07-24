import controller from './SearchController.js'
import File from '../Entities/File.js'
import Folder from '../Entities/Folder.js'

const root = new Folder("root", null, null, "root");
const ch = new Folder("src", root);
root.children = {
    "index.js": new File("index.js", root, "alert('hello world')"), "src": ch,
    "fold": new Folder("fold", root, {
        "i.js": new File("i.js", { name: "fold" }, "asd")
    }, "id")
};
ch.children = { "data": new Folder("data", {}) };
root.children.src.children.data.parent = root.children.src;

console.log(root)

//memoization container
let map = new Map();

class Search {
    // search(root, pattern) {
    //     let values = Object.values(root.children);
    //     search1(values, pattern);
    // }

    search(root1, pattern) {
        let values = Object.values(root.children);
        search1(values, pattern);
    }
}

//global variable path to trace the road
let path = "";

//recursive function that traverses the file system tree
//returns when neither file nor folder is met
function search1(values, pattern) {
    //iteratively traverse all the children of the current folder
    values.forEach(v => {
        if (v && v.type === 'file') {
            let results = KMP(v.content, pattern);

            path += "/" + v.parent.name;

            if (results.length !== 0) {
                path += "/" + v.name;
                results.forEach(i => controller.updateResults(`${path} at index ${i}`)); //change this
                path = ""
            }
        } else if (v && v.type === 'folder') {
            //recursive step
            search1(Object.values(v.children), pattern); //recurrence relation: O(n)
        }
    })
}

/*
Knuth-Morris-Prath algorithm

An elaborated version of naive pattern matching technique.

Wins time by prepocessing the pattern string into prefix-suffix array, which helps to avoid re-checking on some of the characters.
Ideally fits with alphabet that has a great chance of repeating substrings

Time-Complexity: O(n+m). While the naive's worst case is O(nm)

Space-Complexity: O(m) due to the prefix-suffix array
*/

//O(n)
function KMP(content, pattern) {

    //this array will hold the resulting indexes 
    let results = [];
    
    const n = content.length;
    const m = pattern.length;

    //supplement array to preprocess the pattern string
    let prefixSuffix = [];

    // memoization:
    // if the pattern has been processed already we win O(m) time
    if (map.get(pattern)) prefixSuffix = map.get(pattern);
    else preprocess(pattern, m, prefixSuffix);

    let j = 0;
    let i = 0;

    while (i < n) {
        if (content.charAt(i) === pattern.charAt(j)) {
            i++;
            j++;
        }

        if (j === m) {
            results.push(i - j);
            j = prefixSuffix[j - 1];
        }

        /*
          Key point of KMP. If mismatch occurs, instead of adjasting pointer to the beggining it will be set to
          prefix end.
        */
        else if (i < n && pattern.charAt(j) !== content.charAt(i)) {
            if (j !== 0) j = prefixSuffix[j - 1];
            else i = i + 1;
        }
    }
    return results;
}

/*
    Preprocessing works on this idea: if some suffix subsequence is the same as some prefix subsequence — remember the
    index at which prefix ends so by time main function will be checking matches pointer will not be adjusted to the beginning,
    since it will know that if this point has been reached and there is a prefix which is also a suffix no need to check the prefix again.
*/

//O(m)
function preprocess(pattern, m, prefixSuffix) {
    let j = 0;

    let i = 1;

    prefixSuffix[0] = 0;
    console.log("preprocessing")
    while (i < m) {
        if (pattern.charAt(i) === pattern.charAt(j)) {
            j++;
            prefixSuffix[i] = j;
            i++;
        } else {
            if (j != 0) j = prefixSuffix[j - 1];
            else {
                prefixSuffix[i] = 0;
                i++;
            }
        }
    }

    //memoize
    map.set(pattern, prefixSuffix);
}


export default Search;
