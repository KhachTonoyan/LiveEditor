import state from '../_common/State/State.js';

class TerminalModel {
  constructor() {
    this.path = state.root;
  }

  update = () => {
    this.path = state.root;
  };

  getPath = () => {
    let { path } = this;
    let pathName = '';
    while (path !== null) {
      pathName = pathName === '' ? path.name : `${path.name}\\${pathName}`;
      path = path.parent;
    }
    return `${location.host}:${pathName}`;
  };

  changeLocation = (loc) => {
    if (loc === 'goBack') {
      return this.goBack();
    }
    if (this.path.children[loc]) {
      this.path = this.path.children[loc];
      return true;
    }

    return false;
  };

  goBack = () => {
    if (this.path.parent) {
      this.path = this.path.parent;
      return true;
    }
    return true;
  };

  openFile = (title) => {
    if (
      !this.path.children[title]
      || !this.path.children[title].type === 'file'
    ) {
      return `Can't open file ${title}`;
    }
    state.updateTabsInState(this.path.children[title], 'select');
  };

  runFile = (title) => {
    if (
      this.path.children[title]
      && this.path.children[title].type === 'file'
    ) {
      try {
        return eval(this.path.children[title].content);
      } catch (err) {
        return err;
      }
    }
    return false;
  };

  create = (type, name) => {
    if (!state.create(name, type, this.path, 'terminal')) return 'You have file or folder in the same name';
    return `You create ${name}`;
  };

  remove = (name) => {
    if (this.path.children[name]) {
      return state.remove(this.path.children[name], 'terminal');
    }
    return false;
  };

  rename = (oldName, newName) => {
    if (this.path.children[oldName] && !this.path.children[newName]) {
      return state.rename(this.path.children[oldName], newName, 'terminal');
    }
    return false;
  };
}

export default TerminalModel;
