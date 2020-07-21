export default class File {
    constructor(name,parent,content){
        this.name = name
        this.parent = parent
        this.content = content || ""
        this.id = Date.now() * Math.random()
    }
}