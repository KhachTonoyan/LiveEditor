import File from "../Entities/File.js"
import Folder from "../Entities/Folder.js"
import {isFile, getActiveParent} from "./helper.js"

class ExplorerModel {
    constructor() {
        this.root = new Folder('root', null, {}, 'root');
        this.active = this.root;
    }

    onCreate = (name, type) => {
        if (isFile(this.active)) {
            this.active = this.active.parent
        }
        if (type === "file") {
            this.active.children[name] = new File(name, this.active);
        } else if (type === "folder") {
            this.active.children[name] = new Folder(name, this.active)
        }

        this.renderExplorer()
    };

    create = (name, type) => {
        let activeFolder = getActiveParent(this.active); // folder is returned

        if(type === 'file') {
            activeFolder.children[name] = new File(name, activeFolder)
        } else {
            activeFolder.children[name] = new Folder(name, activeFolder)
        }

        this.renderExplorer()
    };

    setActive(path) {
        let active = this.root;
        for(const key of path) {
            active = active.children[key]
        }
        this.active = active;
    }

    bindRenderExplorer(cb) {
        this.renderExplorer = cb
    }

}

export default ExplorerModel