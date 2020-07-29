import File from '../Entities/File.js';
import Folder from '../Entities/Folder.js';
import { getActiveParent } from '../Explorer/helper.js';

// some mock data
const root = new Folder('root', null, null, 'root');
const ch = new Folder('src', root);
root.children = {
  'index.html': new File('index.html', root, null), 'style.css': new File('style.css', root, null), 'index.js': new File('index.js', root, "alert('hello world')"), src: ch,
};
ch.children = { data: new Folder('data', {}) };
root.children.src.children.data.parent = root.children.src;

class State {
  constructor() {
    // this.root = new Folder('root', null, null, 'root');
    this.root = root;
  }

    create = (name, type, active) => {
      const activeFolder = getActiveParent(active); // folder is returned
      if (activeFolder.children[name]) return false;
      if (type === 'file') {
        activeFolder.children[name] = new File(name, activeFolder);
      } else {
        activeFolder.children[name] = new Folder(name, activeFolder);
      }

      this.updateUI();
      return true;
    };

    remove = (active) => {
      if (!active.parent || !active.parent.children[active.name]) return false;
      delete active.parent.children[active.name];

      this.updateUI();
      return true;
    };

    move() {
      // ...

      // this.updateUI()
    }

    open() {
      // ...
    }

    close() {
      // ...
    }

    replace() {
      // ...
    }

    rename(active, newName) {
      if (!active.parent.children[active.name]) return false;
      active.parent.children[newName] = active.parent.children[active.name];
      delete active.parent.children[active.name];
      active.parent.children[newName].name = newName;

      this.updateUI();
      return true;
    }

    updateUI() {
      this.renderExplorer();
      // ... other function that will update ui anywhere
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
        this.tabs = this.tabs.filter((tab) => closingTabs.indexOf(tab) === -1);
        this.activeTab = this.tabs[this.tabs.length - 1];
      } else if (operation === 'rename') {
        // console.log('rename')
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
    }
}

export default new State();
