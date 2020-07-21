import File from "../Entities/File.js"
import Folder from "../Entities/Folder.js"
import { isFile } from "./helper.js"

class ExplorerModel{
    constructor(){
        this.root = {}
        this.active = this.root
    }

    onCreate = (name,type) =>{
        if(isFile(this.active)){
            this.active = this.active.parent
        }
        if(type === "file"){
            this.active[name] = new File(name,this.active)
        }else if(type === "folder"){
            this.active[name] = new Folder(name,this.active)
        }

    }
}


export default ExplorerModel