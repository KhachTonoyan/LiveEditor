import { getActiveParent } from './helper.js';
import state from '../State/State.js';

const removeButton = document.getElementById('removeFile');

class ExplorerModel {
  constructor() {
    this.root = state.root;
    this.active = this.root;

    removeButton.onclick = () => {
      this.remove(this.active);
    };
  }

    toggleExpanded = () => {
      this.active.expanded = !this.active.expanded;
    }

    create = (name, type) => {
      const activeFolder = getActiveParent(this.active); // folder is returned
      state.create(name, type, activeFolder);
    };

    remove = (active) => {
      if (active.parent) {
        this.active = active.parent;
      }
      state.remove(active);
    };

    setActive(path) {
      let active = this.root;
      const paths = path.slice(1);
      for (const key of paths) {
        active = active.children[key];
      }
      this.active = active;
    }

    bindRenderExplorer(cb) {
      this.renderExplorer = cb;
      state.bindRenderExplorer(this.renderExplorer);
    }
}

export default ExplorerModel;
