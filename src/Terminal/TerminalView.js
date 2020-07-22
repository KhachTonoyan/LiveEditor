const openTerminal = document.getElementById("terminalBtn")
const terminal = document.getElementById("terminal")

class TerminalView {
    constructor() {
        this.openTerminalButton = openTerminal
        this.terminal = terminal

        this.openTerminalButton.onclick = () => {
            this.terminal.style.display = "block"
            this.putPath(this.getPath() + ">")
        }
    }
    bindOnGetPath = (cb) => {
        this.getPath = cb
    }

    putPath = (path) => {
        const main = document.createElement("p")
        main.innerHTML = `
                            <p class="path">${path}</p>
                            <p class="logP"><input class="log activLog" maxlength="50"/></p>
                         `
        this.terminal.append(main)
        const activInput = main.querySelector(".activLog")
        activInput.onkeyup = this.hendleInput
        activInput.focus()
    }

    hendleInput = ({target}) => {
        if (event.key === "Enter"){
            const inpVal = target.value.replace(/\s+/g, ' ').trim().toLowerCase()
            if(inpVal !== "") this.do(inpVal)
            else this.putPath(this.getPath() + ">")
            target.classList.remove("activLog")
            target.disabled = "disabled"
            target.onkeyup = null
        }
    }

    do = (value)=>{
        const commandsArray = value.split(" ")
        if(commandsArray.length > 2){
            this.putPath("it's don't correct command")
            this.putPath(this.getPath() + ">")
        } 
        const [first,second] = commandsArray
        console.log(first,second)
        switch(first){
            case "cd":
                if(second === "..") console.log("..")
        }
    }
}

export default TerminalView
