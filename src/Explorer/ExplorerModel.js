import { getActiveParent } from '../helper.js';
import state from '../State/State.js';

class ExplorerModel {
  constructor() {
    this.root = state.root;
    this.active = this.root;
    this.updateTabs = state.updateTabsInState;

    // this.test = document.getElementById('testModel')
    // this.test.onclick = () => {
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
      if (creating) {
        this.active = activeFolder.children[name];
        if (type === 'file') {
          this.updateTabs(this.active, 'createFile');
        }
      }

      return creating;
    };

    remove = () => {
      const { active } = this;

      if (active.type === 'file') {
        this.updateTabs(active, 'removeFile');
      } else {
        this.updateTabs(active, 'removeFolder');
      }

      if (active.parent) {
        this.active = active.parent;
      }
      state.remove(active);
    };

    rename = (newName) => {
      if (this.active.id === 'root') return;
      state.myRename(this.active, newName);
    };

    setActive(path) {
      let active = this.root;
      const paths = path.slice(1);
      for (const key of paths) {
        active = active.children[key];
      }
      this.active = active;

      if (this.active.type === 'file') {
        this.updateTabs(this.active, 'select');
      }
    }

    bindRenderExplorer(cb) {
      this.renderExplorer = cb;
      state.bindRenderExplorer(this.renderExplorer);
    }
}

export default ExplorerModel;
