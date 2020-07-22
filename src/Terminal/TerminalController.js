import TerminalModel from "./TerminalModel.js"
import TerminalView from "./TerminalView.js"

class TerminalController{
    constructor(model,view){
        this.model = model
        this.view = view

        this.view.bindOnGetPath(this.model.getPath)
    }
}

export default new TerminalController(new TerminalModel,new TerminalView)
