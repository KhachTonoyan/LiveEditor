export default class Folder {
    constructor(name, parent, children, id) {
        this.name = name;
        this.parent = parent;
        this.children = children || {};
        this.type = "folder";
        this.id = id || `${Math.ceil(Date.now() * Math.random())}`
    }
}