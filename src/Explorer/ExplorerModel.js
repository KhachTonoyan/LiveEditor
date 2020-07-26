import { getActiveParent } from './helper.js';
import state from '../State/State.js';

// const test = document.getElementById('testModel');
class ExplorerModel {
  constructor() {
    this.root = state.root;
    this.active = this.root;

    // test.onclick = () => {
    //   console.log(this.root, this.active)
    // }
  }

    toggleExpanded = () => {
      this.active.expanded = !this.active.expanded;
    };

    expand = (bool) => {
      let { active } = this;
      if (this.active.type === 'file') {
        active = this.active.parent;
      }
      active.expanded = bool;
    };

    create = (name, type) => {
      const activeFolder = getActiveParent(this.active); // folder is returned
      const creating = state.create(name, type, activeFolder);
      this.active = activeFolder.children[name];
      return creating;
    };

    remove = () => {
      const { active } = this;
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
