import File from '../Entities/File.js'
import Folder from '../Entities/Folder.js'
import {getActiveParent} from "../Explorer/helper.js";

class State {
    constructor() {
        this.root = new Folder('root', null, null, 'root');
    }

    create = (name, type, active) => {
        let activeFolder = getActiveParent(active); // folder is returned

        if(type === 'file') {
            activeFolder.children[name] = new File(name, activeFolder)
        } else {
            activeFolder.children[name] = new Folder(name, activeFolder)
        }

        // updateUI()
    };

    remove(active) {
        delete active.parent.children[active.name];

        // updateUI()
    }

    move() {
        //...
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
    }


    // updateUI() {
    //    ...
    // }

    // bindRenderExplorer() {
    //
    // }
}

export default new State()