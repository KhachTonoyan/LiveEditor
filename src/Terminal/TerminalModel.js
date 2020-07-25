import state from '../State/State.js';

class TerminalModel {
  constructor() {
    this.path = state.root;
  }

    getPath = () => {
      let { path } = this;
      let pathName = '';
      while (path !== null) {
        pathName = pathName === '' ? path.name : `${path.name}\\${pathName}`;
        path = path.parent;
      }
      return `${location.host}:${pathName}`;
    }

    changeLocation = (loc) => {
      if (loc === 'goBack') {
        return this.goBack();
      }
      if (this.path.children[loc]) {
        this.path = this.path.children[loc];
        return true;
      }

      return false;
    }

    goBack = () => {
      if (this.path.parent) {
        this.path = this.path.parent;
        return true;
      }
      return true;
    }

    openFile = (title) => {
      if (this.path.children[title] && this.path.children[title].type === 'file') {
        console.log(this.path.children[title].content);
      } else return `Don't found file ${title}`;
    }

    runFile = (title) => {
      if (this.path.children[title] && this.path.children[title].type === 'file') {
        return eval(this.path.children[title].content);
      }
      return false;
    }

    create = (type, name) => {
      if (!state.create(name, type, this.path)) return 'You have file or folder in the same name';
      return `You create ${name}`;
    }

    remove = (name) => {
      if (this.path.children[name]) {
        return state.remove(this.path.children[name]);
      } return false;
    }

    rename = (oldName, newName) => {
      if (this.path.children[oldName]) {
        return state.rename(this.path.children[oldName], newName);
      } return false;
    }
}

export default TerminalModel;
