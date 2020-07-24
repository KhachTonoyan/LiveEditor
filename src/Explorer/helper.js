function createElement(tagName, id, className) {
    const element = document.createElement(tagName);
    if (id) element.id = id;

    if(className) {
        let classNames = className.split(' ');
        for(className of classNames) {
            element.classList.add(className)
        }
    }

    return element
}

function getElement(id) {
    return document.getElementById(id)
}

const isFile = element => element.id === "file";

function getActiveParent(el) {
    if(el.type === 'folder') return el;
    return el.parent
}

function sortExplorer(items, root) {
    items.sort().sort((a, b) => {
        if((root.children[a].type < root.children[b].type)) {
            return 1
        }
        if((root.children[a].type > root.children[b].type)) {
            return -1
        }
    });
}

export {createElement, getElement, isFile, getActiveParent, sortExplorer}