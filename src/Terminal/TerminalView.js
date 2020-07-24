import { terminalCommandsHandler, changeVal, commandHalp } from "./helper.js"

const openTerminal = document.getElementById("terminalBtn")
const terminal = document.getElementById("terminal")
const closeTerminal = terminal.querySelector("#closeTerminal")
const terminalContent = terminal.querySelector("#terminalContent")

class TerminalView {
    constructor() {
        this.openTerminalButton = openTerminal
        this.terminal = terminal
        this.terminalContent = terminalContent
        this.closeTerminal = closeTerminal
        this.activInput = null

        this.openTerminalButton.onclick = () => {
            this.terminal.style.display = "block"
            this.putPath(this.getPath() + ">")
        }
        this.terminal.onclick = () => {
            this.activInput && this.activInput.focus()
        }
        this.closeTerminal.onclick = () => {
            this.terminal.style.display = "none"
            this.terminalContent.innerHTML = ""
        }
    }
    bindOnGetPath = (cb) => {
        this.getPath = cb
    }

    putPath = (path, ok) => {
        const main = document.createElement("p")
        main.classList.add("main")
        main.innerHTML = `
                            <p class="path">${path}</p>
                            ${ ok === undefined ? '<p class="logP"><input class="log activLog" maxlength="60"/></p>' : ""}
                         `
        this.terminalContent.append(main)
        this.activInput = main.querySelector(".activLog")
        if (this.activInput) {
            this.activInput.focus()
            this.activInput.onkeyup = this.hendleInput
        }
    }

    hendleInput = (event) => {
        if (event.key === "Enter") {
            const inpVal = changeVal(this.activInput.value)
            this.activInput.classList.remove("activLog")
            this.activInput.disabled = "disabled"
            this.activInput.onkeyup = null
            this.activInput = null
            if (inpVal !== "") this.do(inpVal)
            else this.putPath(this.getPath() + ">")
        }
    }

    do = (value) => {
        terminalCommandsHandler.call(this, value)
    }
    halp = () => {
        commandHalp.call(this)
    }

    bindPathAction = (cb) => {
        this.pathAction = cb
    }
    bindOpenFile = (cb) => {
        this.openFile = cb
    }
    bindRunFile = (cb) => {
        this.runFile = cb
    }
    bindCreate = (cb) => {
        this.create = cb
    }
    bindRemove = (cb) => {
        this.remove = cb
    }
}

export default TerminalView
