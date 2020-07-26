import { createElement, getElement, sortExplorer } from './helper.js';

class ExplorerView {
  constructor() {
    // this.test = getElement('test');

    this.createFile = getElement('createFile');
    this.createFolder = getElement('createFolder');
    this.remove = getElement('remove');
    this.overlay = getElement('overlay');

    this.root = getElement('root');
    this.list = createElement('ul');
    this.list.id = 'root_folder';

    this.rootContainer = createElement('ul');
    this.rootContainerTitle = createElement('li');
    this.selectedElement = this.rootContainerTitle;
    this.selectedElementPath = '';
    this.rootContainerTitle.classList.add('folder');
    this.rootContainerTitle.setAttribute('data-name', 'Project');

    this.rootContainerTitle.addEventListener('click', this.setSelectedElement);
    this.rootContainerTitle.addEventListener('click', this.getPath);
    this.rootContainerTitle.addEventListener('click', this.expand);

    this.rootContainerTitleText = createElement('span');
    this.rootContainerTitleText.innerHTML = 'Project';

    this.rootContainerTitle.append(this.rootContainerTitleText);
    this.rootContainer.append(this.rootContainerTitle);
    this.root.append(this.rootContainer);
    this.rootContainerTitle.append(this.list);

    this.createFile.onclick = this.clickCreate.bind(this, 'file');
    this.createFolder.onclick = this.clickCreate.bind(this, 'folder');
    this.remove.addEventListener('click', this.clickRemove.bind(this));

    // this.test.onclick =() => {
    //   console.log(this.selectedElement)
    // }
  }

    clickRemove = () => {
      const selected = this.selectedElement.parentElement.parentElement;
      const path = this.getPathPartial(selected);
      this.clickRemove();

      let el = this.root;
      for (const p of path) {
        el = el.lastChild.querySelector(`[data-name='${p}']`);
      }

      this.highlight(el);

      this.selectedElement = el;
    };

    clickCreate = (type) => {
      let selected = this.selectedElement;
      if (selected.classList.contains('file')) {
        selected = selected.parentElement.parentElement;
      }

      this.overlay.style.display = 'block';
      const path = this.getPathPartial(selected);

      selected.classList.add('expand');

      this.expandInModel(true);

      const list = selected.querySelector('ul');

      const li = createElement('li');
      if (type === 'file') {
        li.classList.add('file', 'input');
      } else {
        li.classList.add('folder', 'input');
      }

      const input = createElement('input', null, 'create-input-field');

      li.append(input);
      list.prepend(li);

      const create = (e) => {
        const { target } = e;

        if (!target.value && li.parentElement || e.key === 'Escape') {
          try {
            li.remove();
          } catch (e) {
            console.log('');
          }
        } else {
          const creation = this.create(target.value, type);

          if (!creation) {
            this.warning = true;
            const span = createElement('span', null, 'warning');
            span.innerHTML = `A file or folder <b>${target.value}</b> already exists at this location. Please choose a different name.`;
            target.parentElement.append(span);
            target.classList.add('danger');

            input.addEventListener('blur', () => {
              li.remove();

              this.overlay.style.display = 'none';
            });
            return;
          }

          let el = this.root;
          for (const p of path) {
            el = el.lastChild.querySelector(`[data-name='${p}']`);
          }
          el = el.lastChild.querySelector(`[data-name='${target.value}']`);

          this.highlight(el);

          this.selectedElement = el;
        }
        this.overlay.style.display = 'none';
      };

      input.focus();
      input.addEventListener('keyup', (e) => {
        if (e.keyCode === 13) {
          input.removeEventListener('blur', create);
          create(e);
        } else if (e.keyCode === 27) {
          input.removeEventListener('blur', create);
          create(e);
        }
      });

      input.addEventListener('blur', create);
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
              listFileItem.addEventListener('click', self.setSelectedElement);
              listFileItem.addEventListener('click', self.getPath);
              const span = createElement('span');
              span.innerHTML = key;
              listFileItem.append(span);
              list.append(listFileItem);
            } else {
              const listFolderItem = document.createElement('li');
              listFolderItem.addEventListener('click', self.setSelectedElement);
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

    setSelectedElement = (e) => {
      if (e.target.id === 'root_folder') return;
      const target = e.target.closest('li[data-name]');

      this.highlight(target);

      this.selectedElement = target;
    };

    highlight = (newElem) => {
      this.selectedElement.querySelector('span').classList.remove('selected');
      newElem.querySelector('span').classList.add('selected');
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

    getPathPartial = (el) => {
      const path = [];

      while (el.id !== 'root') {
        path.unshift(el.dataset.name);
        el = el.parentElement.parentElement;
      }

      return path;
    };

    expand = (e) => {
      if (e.target.closest('li.file') || e.target.id === 'root_folder' || e.target.classList.contains('create-input-field')) return;
      const target = e.target.closest('li.folder[data-name]');

      target.classList.toggle('expand');

      this.toggleExpanded(this.selectedElementPath);
    };

    bindOnCreate = (cb) => {
      this.create = cb;
    };

    bindSetActive(cb) {
      this.setActive = cb;
    }

    bindToggleExpanded(cb) {
      this.toggleExpanded = cb;
    }

    bindClickRemove(cb) {
      this.clickRemove = cb;
    }

    bindExpandInModel(cb) {
      this.expandInModel = cb;
    }
}

export default ExplorerView;
