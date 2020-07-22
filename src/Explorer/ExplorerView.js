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

root.onclick = function (event) {
    let element = event.target;
    let elementName = event.target.name;
    let path = [];
    while (element.id !== "root") {
        path.push(elementName);
        element = element.parentElement
    }
}

class ExplorerView {
    constructor() {
        this.createFile = createFile;
        this.createFolder = createFolder;
        this.input = null;
        this.root = getElement('root');
        this.list = createElement('ul');
        this.list.id = 'main_folder';
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
            let keys = Object.keys(rootObj);
            for(let key of keys) {
                if(rootObj[key] instanceof File) {
                    const listFileItem = document.createElement('li');
                    listFileItem.setAttribute('data-name', key);
                    listFileItem.addEventListener('click', self.highlightActive)
                    listFileItem.innerHTML = '&#128196; ' + key ;
                    list.append(listFileItem)
                } else {
                    const listFolderItem = document.createElement('li');
                    listFolderItem.addEventListener('click', self.highlightActive)
                    listFolderItem.setAttribute('data-name', key);
                    const span = createElement('span');
                    span.innerHTML = '&#128194; ' + key;
                    listFolderItem.append(span);
                    const innerList = document.createElement('ul');
                    listFolderItem.append(innerList);
                    list.append(listFolderItem);
                    renderTree(rootObj[key].childs, innerList)
                }
            }
        }
        renderTree(rootObj, list)
    }

    highlightActive = (e, handler) => {
        let target = e.target.closest('li[data-name]');
        this.selectedElement.classList.remove('selected');
        target.classList.add('selected');
        this.selectedElement = target;

        let path = [];
        // console.log(target)
        while (target.id !== "main_folder") {
            path.push(target.dataset.name);
            target = target.parentElement
        }
        this.selectedElementPath = path;
        console.log(this.selectedElementPath)
        handler(this.selectedElementPath)
    }


}

export default ExplorerView