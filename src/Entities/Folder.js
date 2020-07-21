export default class Folder{
    constructor(name,parent,childs){
        this.name = name
        this.parent = parent
        this.childs = childs || {}
        this.id = Date.now() * Math.random()
    }
}