function createElement(tagName, id, className) {
  const element = document.createElement(tagName);
  if (id) element.id = id;

  if (className) {
    const classNames = className.split(' ');
    for (className of classNames) {
      element.classList.add(className);
    }
  }

  return element;
}

function getElement(id) {
  return document.getElementById(id);
}

const isFile = (element) => element.id === 'file';

function getActiveParent(el) {
  if (el.type === 'folder') return el;
  return el.parent;
}

function sortExplorer(items, root) {
  items.sort().sort((a, b) => {
    if ((root.children[a].type < root.children[b].type)) {
      return 1;
    }
    if ((root.children[a].type > root.children[b].type)) {
      return -1;
    }
  });
}

function checkExtension(file) {
  const str = file.trim();

  if (str.endsWith('.js')) {
    return 'js';
  } if (str.endsWith('.css')) {
    return 'css';
  } if (str.endsWith('.html')) {
    return 'html';
  }
  return 'file';
}

function getDirectChild(el, dataName) {
  const ul = el.lastElementChild;
  let childElem;
  for (const li of ul.children) {
    if (li.dataset.name === dataName) {
      childElem = li;
    }
  }
  return childElem;
}

function getPath(el) {
  let path = [];
  while(el.id !== 'root') {
    path.unshift(el.dataset.name);
    el = el.parentElement.parentElement;
  }
  return path;
}

export {
  createElement, getElement, isFile, getActiveParent, sortExplorer, checkExtension, getDirectChild, getPath
};
