export default class File {
    constructor(name, parent, content) {
        this.name = name;
        this.parent = parent;
        this.content = content || "";
        this.type = "file";
        this.id = `${Math.ceil(Date.now() * Math.random())}`
    }
}