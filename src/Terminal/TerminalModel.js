import File from "../Entities/File.js"
import Folder from "../Entities/Folder.js"

const root = new Folder("root", null, null, "root")
const ch = new Folder("src", root)
root.children = { "index.js": new File("index.js", root, "alert('hello world')"), "src": ch }
ch.children = { "data": new Folder("data", {}) }
root.children.src.children.data.parent = root.children.src

class TerminalModel {
    constructor() {
        this.path = root

        console.log(root)
    }
    getPath = () => {
        let path = this.path
        let pathName = ""
        while (path !== null) {
            pathName = pathName === "" ? path.name : `${path.name}\\${pathName}`
            path = path.parent
        }
        return "localhost:" + pathName
    }
    changeLocation = (loc) => {
        if (loc === "goBack") {
            return this.goBack()
        }
        else if (this.path.children[loc]) {
            this.path = this.path.children[loc]
            return true
        }
        else {
            return false
        }
    }
    goBack = () => {
        if (this.path.parent) {
            this.path = this.path.parent
            return true
        }
        return true
    }
    openFile = (title) => {
        if (this.path.children[title] && this.path.children[title].type === "file") {
            console.log(this.path.children[title].content)
        }
        else return `Don't found file ${title}`
    }
    runFile = (title) => {
        if (this.path.children[title] && this.path.children[title].type === "file") {
            return eval(this.path.children[title].content)
        }
        else return false
    }
}

export default TerminalModel