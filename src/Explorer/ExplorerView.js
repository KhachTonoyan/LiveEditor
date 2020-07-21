import {createElement} from "./helper.js"

const createFile = document.getElementById("createFile")
const createFolder = document.getElementById("createFolder")
const root = document.getElementById("root")

function onClickCreateButton(type){
    this.input = createElement("input",type)
    this.input.onblur = (event) => {
        this.inputValue = event.target.value
        event.target.remove()
        this.create(this.inputValue,type)
    }
    root.append(this.input)
}
root.onclick = function(event){
    let element = event.target
    let elementName = event.target.name
    let path = []
    while(element.id !== "root"){
        path.push(elementName)
        element = element.parentElement
    }
    console.log(path)
}

class ExplorerView {
    constructor(){
        this.createFile = createFile
        this.createFolder = createFolder
        this.input = null

        this.createFile.onclick = onClickCreateButton.bind(this,"file")
        this.createFolder.onclick = onClickCreateButton.bind(this,"folder")
    }
    bindOnCreate = (cb) =>{
        this.create = cb
    }
}

export default ExplorerView