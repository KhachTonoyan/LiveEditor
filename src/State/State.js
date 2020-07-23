import File from '../Entities/File.js'
import Folder from '../Entities/Folder.js'
import {getActiveParent} from "../Explorer/helper.js";

// some mock data
const root = new Folder("root", null, null, "root");
const ch = new Folder("src", root);
root.children = { "index.js": new File("index.js", root, "alert('hello world')"), "src": ch };
ch.children = { "data": new Folder("data", {}) };
root.children.src.children.data.parent = root.children.src;


class State {
    constructor() {
        // this.root = new Folder('root', null, null, 'root');
        this.root = root
    }

    create = (name, type, active) => {
        let activeFolder = getActiveParent(active); // folder is returned

        if(type === 'file') {
            activeFolder.children[name] = new File(name, activeFolder)
        } else {
            activeFolder.children[name] = new Folder(name, activeFolder)
        }

        console.log(root)
        this.updateUI()
    };

    remove = active => {
        delete active.parent.children[active.name];

        this.updateUI()
    }

    move() {
        //...

        //this.updateUI()
    }

    open() {
        //...
    }

    close() {
        //...
    }

    replace() {
        //...
    }

    rename() {
        //...

        //this.updateUI()
    }


    updateUI() {
        this.renderExplorer()
        // ... other function that will update ui anywhere
    }

    bindRenderExplorer(cb) {
        this.renderExplorer = cb
    }
}

export default new State()