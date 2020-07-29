import File from '../Entities/File.js';
import Folder from '../Entities/Folder.js';
import { getActiveParent } from '../helper.js';

// some mock data
const root = new Folder('Project', null, null, 'root');
const ch = new Folder('src', root);
root.children = {
  'index.html': new File('index.html', root, null), 'style.css': new File('style.css', root, null), 'index.js': new File('index.js', root, "alert('hello world')"), src: ch,
};
ch.children = { data: new Folder('data', root.children.src) };

class State {
  constructor() {
    // this.root = new Folder('root', null, null, 'root');
    this.root = root;
    this.activeTab = null;
    this.tabs = [];

    this.test = document.getElementById('testState');
    this.test.onclick = () => {
      console.log(this.root, 'root')
    }

    // this.myRename(ch, 'asdf')
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

  rename(active, newName) {
    if (!active.parent.children[active.name]) return false;
    active.parent.children[newName] = active.parent.children[active.name];
    delete active.parent.children[active.name];
    active.parent.children[newName].name = newName;

    this.updateUI();
    return true;
  }

  myRename(active, newName) {
    if(active.parent.children[newName]) return false;

    if (active.name !== newName) {
      Object.defineProperty(active.parent.children, newName, Object.getOwnPropertyDescriptor(active.parent.children, active.name));
      delete active.parent.children[active.name];
    }
    active.parent.children[newName].name = newName;

    this.updateUI();
    this.updateTabsInState(active, 'rename');
    return true
  }

  updateUI() {
    this.renderExplorer();
    // ... other function that will update ui anywhere
  }

  bindRenderExplorer(cb) {
    this.renderExplorer = cb;
  }

}

export default new State();
