import state from "../State/State.js"

class TerminalModel {
    constructor() {
        this.path = state.root
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
    create = (type,name) =>{
        if(!state.create(name,type,this.path)) return "You have file or folder in the same name"
        return `You create ${name}`
    }
    remove = (name) =>{
        if(this.path.children[name]){
            return state.remove(this.path.children[name])
        }   return false
    }
}

export default TerminalModel