import {createElement, getElement} from "./helper.js"
import File from '../Entities/File.js'
import Folder from '../Entities/Folder.js'

const createFile = document.getElementById("createFile");
const createFolder = document.getElementById("createFolder");
const root = document.getElementById("root");

function onClickCreateButton(type) {
    this.input = createElement("input", type);
    this.input.onblur = (event) => {
        if(!event.target.value) return;
        this.inputValue = event.target.value;
        event.target.remove();
        this.create(this.inputValue, type)
    };
    root.append(this.input)
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

        this.root.append(document.createTextNode('root folder'), this.list);

        this.createFile.onclick = onClickCreateButton.bind(this, "file");
        this.createFolder.onclick = onClickCreateButton.bind(this, "folder")
    }

    bindOnCreate = (cb) => {
        this.create = cb
    };

    renderExplorer(rootObj, list) {
        this.list.innerHTML = '';
        let self = this;
        function renderTree(rootObj, list) {

            if(rootObj) {
                let keys = Object.keys(rootObj.children);
                for(let key of keys) {
                    if(rootObj.children[key] instanceof File) {
                        const listFileItem = document.createElement('li');
                        listFileItem.setAttribute('data-name', key);
                        listFileItem.addEventListener('click', self.highlightActive);
                        listFileItem.addEventListener('click', self.getPath);
                        const span = createElement('span');
                        span.innerHTML = '&#128196; ' + key ;
                        listFileItem.append(span);
                        list.append(listFileItem)
                    } else {
                        const listFolderItem = document.createElement('li');
                        listFolderItem.addEventListener('click', self.highlightActive);
                        listFolderItem.addEventListener('click', self.getPath);
                        listFolderItem.setAttribute('data-name', key);
                        const span = createElement('span');
                        span.innerHTML = '&#128194; ' + key;
                        listFolderItem.append(span);
                        const innerList = document.createElement('ul');
                        listFolderItem.append(innerList);
                        list.append(listFolderItem);
                        renderTree(rootObj.children[key], innerList)
                    }
                }
            }

        }
        renderTree(rootObj, list)
    }

    highlightActive = e => {
        let target = e.target.closest('li[data-name]');
        this.selectedElement.querySelector('span').classList.remove('selected');
        target.querySelector('span').classList.add('selected');
        this.selectedElement = target;
    };

    getPath = (e) => {
        let target = e.target.closest('li[data-name]');

        let path = [];
        while (target.id !== "root") {
            path.unshift(target.dataset.name);
            target = target.parentElement.parentElement
        }
        this.selectedElementPath = path;
        this.setActive(this.selectedElementPath)
    };

    bindSetActive(cb) {
        this.setActive = cb
    }
}

export default ExplorerView