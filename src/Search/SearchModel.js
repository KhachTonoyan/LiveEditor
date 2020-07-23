class Search {
    search(root, pattern) {
        let values = Object.values(root.children);
        search1(values, pattern)
    }
}

function search1(values, pattern){
    console.log("here")
    values.forEach(v => {
        if (v && v.type === 'file') {
            let results = KMP(v.content, pattern);
            

        } else if(v && v.type === 'folder'){
            console.log("found folder")
            search1(Object.values(v.children), pattern);
        }
    })
}

function KMP(content, pattern) {

    let results = [];

    const n = content.length;
    const m = pattern.length;

    let lsp = [];

    preprocess(pattern, m, lsp);

    let j = 0;
    let i = 0;

    while (i < n) {
        if (content.charAt(i) === pattern.charAt(j)) {
            i++;
            j++;
        }

        if (j === m) {
            console.log(`found at ${i - j}`);
            results.push(i-j);
            j = lsp[j - 1];
        }

        else if (i < n && pattern.charAt(j) !== content.charAt(i)) {
            if (j !== 0) j = lsp[j - 1];
            else i = i + 1;
        }
    }
}

//O(m)
function preprocess(pattern, m, lps) {
    let j = 0;

    let i = 1;

    lps[0] = 0;

    while (i < m) {
        if (pattern.charAt(i) === pattern.charAt(j)) {
            j++;
            lps[i] = j;
            i++;
        } else {
            if (j != 0) {
                j = lps[j - 1];
            } else {
                lps[i] = 0;
                i++;
            }
        }
    }
}



export default Search;









// let root = {
//     "index.js": {
//         content: "let s = 'hello'; console.log(s.search('el'))",
//         id: "1239945868010",
//         name: "index.js",
//         parent: { "index.js": File },
//         type: "file",
//     },

//     models: {
//         children: {
//             'stylecss': {
//                 content: "style",
//                 id: "658317754850",
//                 name: "style.css",
//                 parent: { 'style.css': File },
//                 type: "file"
//             },

//             'index.html': {
//                 content: '<!DOCTYPE html> <html lang="en"><head><meta charset="UTF-8"> </head>',
//                 id: "123994586801456",
//                 name: "ыва",
//                 parent: { ыва: File },
//                 type: "file",
//             },

//             modelImg : {
//                 children : {
//                     'stylecs': {
//                         content: "fstyle",
//                         id: "658317754850",
//                         name: "style.css",
//                         parent: { 'style.css': File },
//                         type: "file"
//                     }
//                 },

//                 id: "78073947935",
//                 name: "dd",
//                 parent: {
//                     ddfg: "Folder"
//                 },
//                 type: "folder"
//             }
//         },

//         id: "78073947935",
//         name: "ddfg",
//         parent: {
//             ddfg: "Folder"
//         },
//         type: "folder",
//     }
// }