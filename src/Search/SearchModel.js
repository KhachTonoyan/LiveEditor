let root = {

    "index.js": {
        content: "let s = 'hello'; console.log(s.search('el'))",
        id: "1239945868010",
        name: "index.js",
        parent: { "index.js": File },
        type: "file",
    },

    models: {
        children: {
            'stylecss': {
                content: "",
                id: "658317754850",
                name: "style.css",
                parent: { 'style.css': File },
                type: "file"
            },

            'index.html': {
                content: '<!DOCTYPE html> <html lang="en"><head><meta charset="UTF-8"> </head>',
                id: "123994586801456",
                name: "ыва",
                parent: { ыва: File },
                type: "file",
            }
        },

        id: "78073947935",
        name: "ddfg",
        parent: {
            ddfg: "Folder"
        },
        type: "folder",
    }
}

class Search {
    constructor() {

    }

    search(){
        let values = Object.values(root);
        
        values.forEach(v => {
            if(v.type === 'file'){
                KMP(v.content);
            }
        })
    }
}

function KMP(content){

}




export default Search;