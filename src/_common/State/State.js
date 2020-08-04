import File from '../Entities/File.js';
import Folder from '../Entities/Folder.js';
import { getActiveParent } from '../../helper.js';

class State {
  constructor() {
    this.root = new Folder('Project', null, null, 'root');
    this.root.expanded = true;
    this.activeTab = null;
    this.tabs = [];
  }

  create = (name, type, active, from) => {
    const activeFolder = getActiveParent(active); // folder is returned
    if (activeFolder.children[name]) return false;
    if (type === 'file') {
      activeFolder.children[name] = new File(name, activeFolder);
    } else {
      activeFolder.children[name] = new Folder(name, activeFolder);
    }
    this.updateUI(from);
    return true;
  };

  reset = () => {
    this.root = new Folder('Project', null, null, 'root');
    this.onAuth();
  };

  remove = (active, from) => {
    if (!active.parent || !active.parent.children[active.name]) return false;
    delete active.parent.children[active.name];
    this.updateUI(from);
    return true;
  };

  rename(active, newName, from) {
    if (!active.parent.children[active.name]) return false;
    active.parent.children[newName] = active.parent.children[active.name];
    delete active.parent.children[active.name];
    active.parent.children[newName].name = newName;
    this.updateUI(from);
    return true;
  }

  myRename(active, newName) {
    if (active.name !== newName) {
      Object.defineProperty(
        active.parent.children,
        newName,
        Object.getOwnPropertyDescriptor(
          active.parent.children,
          active.name,
        ),
      );
      delete active.parent.children[active.name];
      active.parent.children[newName].name = newName;
    }
    this.updateUI();
    this.updateTabsInState(active, 'rename');
    return true;
  }

  onAuth = () => {
    this.tabs = [];
    this.activeTab = null;
    this.updateTabsInState(null);
    this.updateExplorerModel(this.root);
    this.explorerViewActive();
    this.updateUI();
  };

  updateUI(from) {
    if (from !== 'terminal') this.updateTerminal();
    this.renderExplorer();
  }

  bindUpdateExplorerModel(cb) {
    this.updateExplorerModel = cb;
  }

  bindUpdateTerminal(cb) {
    this.updateTerminal = cb;
  }

  bindRenderExplorer(cb) {
    this.renderExplorer = cb;
  }

  updateTabsInState = (file, operation) => {
    if (operation === 'select') {
      this.activeTab = file;
      if (!this.tabs.includes(file)) {
        this.tabs.push(file);
      }
    } else if (operation === 'closeTab') {
      this.tabs = this.tabs.filter((tab) => tab !== file);
      this.activeTab = this.tabs[this.tabs.length - 1];
    } else if (operation === 'createFile') {
      this.tabs.push(file);
      this.activeTab = file;
    } else if (operation === 'removeFile') {
      this.tabs = this.tabs.filter((tab) => tab !== file);
      this.activeTab = this.tabs[this.tabs.length - 1];
    } else if (operation === 'removeFolder') {
      // here file is our deleting folder
      const closingTabs = [];
      this.tabs.forEach((tab) => {
        let item = tab;
        while (item.parent.id !== 'root') {
          if (item.parent === file) {
            closingTabs.push(tab);
            break;
          }
          item = item.parent;
        }
      });
      this.tabs = this.tabs.filter(
        (tab) => closingTabs.indexOf(tab) === -1,
      );
      this.activeTab = this.tabs[this.tabs.length - 1];
    }
    this.updateTabsInModel(this.activeTab, operation, this.tabs);
  };

  saveTabContent = (file, content) => {
    if (file) {
      file.content = content;
    }
  };

  bindUpdateTabsInModel = (cb) => {
    this.updateTabsInModel = cb;
  };

  bindExplorerViewActive = (cb) => {
    this.explorerViewActive = cb;
  };
}
export default new State();
