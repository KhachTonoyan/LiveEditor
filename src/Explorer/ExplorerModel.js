import {getActiveParent} from "./helper.js"
import state from '../State/State.js'
// const removeButton = document.getElementById('removeFile');


class ExplorerModel {
    constructor() {
        this.root = state.root;
        this.active = this.root;

        // removeButton.onclick = () => {
        //     state.remove(this.active)
        //     console.log(this.root, 'root from model')
        // }
    }

    create = (name, type) => {
        let activeFolder = getActiveParent(this.active); // folder is returned
        state.create(name, type, activeFolder);

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