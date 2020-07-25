import { createElement, getElement, sortExplorer } from './helper.js';

const createFile = document.getElementById('createFile');
const createFolder = document.getElementById('createFolder');
const root = document.getElementById('root');

function onClickCreateButton(type) {
  this.input = createElement('input', type);
  this.input.onblur = (event) => {
    if (!event.target.value) return;
    this.inputValue = event.target.value;
    event.target.remove();
    this.create(this.inputValue, type);
  };
  root.append(this.input);
}

class ExplorerView {
  constructor() {
    this.createFile = createFile;
    this.createFolder = createFolder;
    this.input = null;
    this.root = getElement('root');
    this.list = createElement('ul');
    this.list.id = 'root_folder';
    this.selectedElement = this.root;
    this.selectedElementPath = '';

    this.rootContainer = createElement('ul');
    this.rootContainerTitle = createElement('li');
    this.rootContainerTitle.classList.add('folder');
    this.rootContainerTitle.setAttribute('data-name', 'Project');

    this.rootContainerTitle.addEventListener('click', this.highlightActive);
    this.rootContainerTitle.addEventListener('click', this.getPath);
    this.rootContainerTitle.addEventListener('click', this.expand);

    this.rootContainerTitleText = createElement('span');
    this.rootContainerTitleText.innerHTML = 'Project';

    this.rootContainerTitle.append(this.rootContainerTitleText);
    this.rootContainer.append(this.rootContainerTitle);
    this.root.append(this.rootContainer);
    this.rootContainerTitle.append(this.list);

    this.createFile.onclick = onClickCreateButton.bind(this, 'file');
    this.createFolder.onclick = onClickCreateButton.bind(this, 'folder');
  }

    bindOnCreate = (cb) => {
      this.create = cb;
    };

    renderExplorer(rootObj, list) {
      this.list.innerHTML = '';
      const self = this;
      function renderTree(rootObj, list) {
        if (rootObj) {
          const keys = Object.keys(rootObj.children);

          sortExplorer(keys, rootObj);

          for (const key of keys) {
            if (rootObj.children[key].type === 'file') {
              const listFileItem = document.createElement('li');
              listFileItem.setAttribute('data-name', key);
              listFileItem.classList.add('file', `${self.checkExtension(key)}`);
              listFileItem.addEventListener('click', self.highlightActive);
              listFileItem.addEventListener('click', self.getPath);
              const span = createElement('span');
              span.innerHTML = key;
              listFileItem.append(span);
              list.append(listFileItem);
            } else {
              const listFolderItem = document.createElement('li');
              listFolderItem.addEventListener('click', self.highlightActive);
              listFolderItem.addEventListener('click', self.getPath);
              listFolderItem.setAttribute('data-name', key);
              if (rootObj.children[key].expanded) {
                listFolderItem.classList.add('expand');
              }
              listFolderItem.classList.add('folder');
              const span = createElement('span');
              span.innerHTML = key;
              listFolderItem.append(span);
              const innerList = document.createElement('ul');
              listFolderItem.append(innerList);
              list.append(listFolderItem);
              renderTree(rootObj.children[key], innerList);
            }
          }
        }
      }
      renderTree(rootObj, list);
    }

    checkExtension = (file) => {
      const str = file.trim();

      if (str.endsWith('.js')) {
        return 'js';
      } if (str.endsWith('.css')) {
        return 'css';
      } if (str.endsWith('.html')) {
        return 'html';
      }
      return 'file';
    };

    highlightActive = (e) => {
      const target = e.target.closest('li[data-name]');
      this.selectedElement.querySelector('span').classList.remove('selected');
      target.querySelector('span').classList.add('selected');
      this.selectedElement = target;
    };

    getPath = (e) => {
      let target = e.target.closest('li[data-name]');

      const path = [];
      while (target.id !== 'root') {
        path.unshift(target.dataset.name);
        target = target.parentElement.parentElement;
      }
      this.selectedElementPath = path;
      this.setActive(this.selectedElementPath);
    };

    expand = (e) => {
      if (e.target.closest('li.file')) return;
      const target = e.target.closest('li.folder[data-name]');

      target.classList.toggle('expand');

      this.toggleExpanded(this.selectedElementPath);
    };

    bindSetActive(cb) {
      this.setActive = cb;
    }

    bindToggleExpanded(cb) {
      this.toggleExpanded = cb;
    }
}

export default ExplorerView;
