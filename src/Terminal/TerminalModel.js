import File from "../Entities/File.js"
import Folder from "../Entities/Folder.js"

const root = new Folder("root",null,null,"root")
const ch = new Folder("src",root)
root.children = {"index.html":new File("index.html",root),"src":ch}
ch.children = {"data":new Folder("data",{})}
root.children.src.children.data.parent = root.children.src

class TerminalModel{
    constructor(){
        this.path = root

        console.log(root)
    }
    getPath = () =>{
        let path = this.path
        let pathName = ""
        while(path !== null){
            pathName = pathName === "" ? path.name : `${path.name}\\${pathName}`
            path = path.parent
        }
        return "localhost:" + pathName
    }
}

export default TerminalModel