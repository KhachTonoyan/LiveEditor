function terminalCommandsHandler(value) {
    const commandsArray = value.split(" ")
    if (commandsArray.length === 1) {
        const [first] = commandsArray
        if (first === "halp") {
            this.halp()
            this.putPath(this.getPath() + ">")
        } else {
            this.putPath("it's don't correct command, writh halp", false)
            this.putPath(this.getPath() + ">")
        }
    }
    else if (commandsArray.length == !2 && commandsArray.length == !3) {
        this.putPath("it's don't correct command, writh halp", false)
        this.putPath(this.getPath() + ">")
    }
    else {
        const [first, second, third] = commandsArray
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
                    }
                    else {
                        this.putPath(res, false)
                    }
                    this.putPath(this.getPath() + ">")

                }
                break;
            case "create":
                {
                    if ((second === "file" || second === "folder") && third === undefined) {
                        this.putPath(`Please writh ${second} name`, false)
                    }
                    else if (second === "file" || second === "folder") {
                        this.putPath(this.create(second, third), false)
                    }
                    else {
                        this.putPath("You can create only file or folder", false)
                    }
                    this.putPath(this.getPath() + ">")
                }
                break;
            case "delete":
                {
                    if (this.remove(second)) this.putPath(`${second} deleted`, false)
                    else this.putPath(`${second} don't found in this folder`, false)
                    this.putPath(this.getPath() + ">")
                }
                break;
            case "rename":
                {
                    if(second === undefined || third === undefined){
                        this.putPath(`You must writh "rename [old name] [new name]"`, false)
                    }
                    else if(this.rename(second,third)){
                        this.putPath(`You rename ${second} to ${third}`, false)
                    }else{
                        this.putPath(`We can't rename ${second} to ${third}`, false)
                    }
                    this.putPath(this.getPath() + ">")
                }
                break;
            default:
                {
                    this.putPath("it's don't correct command, writh halp", false)
                    this.putPath(this.getPath() + ">")
                }
        }
    }
}

const changeVal = val => val.replace(/\s+/g, ' ').trim().toLowerCase()

function commandHalp() {
    const main = document.createElement("p")
    main.classList.add("main")
    main.innerHTML = `
                        <p class="main"><p class="path">Change folder "cd [folder name]"</p></p>
                        <p class="main"><p class="path">Open file "open [file name]"</p></p>
                        <p class="main"><p class="path">Run file "open [file name]"</p></p>
                        <p class="main"><p class="path">Create file "create file [file name]"</p></p>
                        <p class="main"><p class="path">Create folder "create folder [folder name]"</p></p>
                        <p class="main"><p class="path">Delete file or folder "delete [name]"</p></p>
                        <p class="main"><p class="path">Rename file or folder "rename [old name] [new name]"</p></p>
                     `
    this.terminalContent.append(main)
}

export { terminalCommandsHandler, changeVal, commandHalp }
