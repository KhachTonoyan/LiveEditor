import {getActiveParent} from "./helper.js"
import state from '../State/State.js'
const removeButton = document.getElementById('removeFile');


class ExplorerModel {
    constructor() {
        this.root = state.root;
        this.active = this.root;

        removeButton.onclick = () => {
            this.remove(this.active)
        }

        console.log(this.renderExplorer)
    }

    create = (name, type) => {
        let activeFolder = getActiveParent(this.active); // folder is returned
        state.create(name, type, activeFolder)
    };

    remove = (active) => {
        this.active = active.parent;
        state.remove(active);
        console.log(this.active, 'active after remove')
    };

    setActive(path) {
        let active = this.root;
        for(const key of path) {
            active = active.children[key]
        }
        this.active = active;
    }

    bindRenderExplorer(cb) {
        this.renderExplorer = cb;
        state.bindRenderExplorer(this.renderExplorer)
    }

}

export default ExplorerModel