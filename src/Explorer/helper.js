function createElement(tagName, id, className) {
    const element = document.createElement(tagName);
    if (id) element.id = id;
    if (className) element.classList.add(className);

    return element
}

function getElement(id) {
    return document.getElementById(id)
}

const isFile = element => element.id === "file";


export {createElement, getElement, isFile}