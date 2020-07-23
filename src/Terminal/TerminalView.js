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
                            <p class="logP"><input class="log activLog" maxlength="60"/></p>
                         `
        this.terminalContent.append(main)
        this.activInput = main.querySelector(".activLog")
        this.activInput.focus()
        this.activInput.onkeyup = this.hendleInput
        if (ok === false && this.activInput) {
            this.activInput.classList.remove("activLog")
            this.activInput.disabled = "disabled"
            this.activInput = null
        }
    }

    hendleInput = (event) => {
        if (event.key === "Enter") {
            const inpVal = this.activInput.value.replace(/\s+/g, ' ').trim().toLowerCase()
            this.activInput.classList.remove("activLog")
            this.activInput.disabled = "disabled"
            this.activInput.onkeyup = null
            this.activInput = null
            if (inpVal !== "") this.do(inpVal)
            else this.putPath(this.getPath() + ">")
        }
    }

    do = (value) => {
        const commandsArray = value.split(" ")
        if (commandsArray.length !== 2) {
            this.putPath("it's don't correct command", false)
            this.putPath(this.getPath() + ">")
        }
        else {
            const [first, second] = commandsArray
            switch (first) {
                case "cd":
                    {
                        let res;
                        if (second === "..") res = this.pathAction("goBack")
                        else res = this.pathAction(second)
                        if (res) this.putPath(this.getPath() + ">")
                        else {
                            this.putPath(`Don't found folder ${second}`, false)
                            this.putPath(this.getPath() + ">",)
                        }
                    }
                    break;
                case "open":
                    {
                        let res = this.openFile(second)
                        if (!res) this.putPath(this.getPath() + ">")
                        else {
                            this.putPath(res, false)
                            this.putPath(this.getPath() + ">")
                        }
                    }
                    break;
                case "run":
                    {
                        let res = this.runFile(second)
                        if (res === false) {
                            this.putPath(`Don't found file ${second}`, res)
                            this.putPath(this.getPath() + ">")
                        }
                        else {
                            this.putPath(res, false)
                            this.putPath(this.getPath() + ">")
                        }

                    }
                    break;
                default:
                    console.log(commandsArray)
                    this.putPath("it's don't correct command", false)
                    this.putPath(this.getPath() + ">")
            }
        }
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
}

export default TerminalView
