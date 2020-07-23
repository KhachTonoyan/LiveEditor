import TerminalModel from "./TerminalModel.js"
import TerminalView from "./TerminalView.js"

class TerminalController {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.view.bindOnGetPath(this.model.getPath)
        this.view.bindPathAction(this.model.changeLocation)
        this.view.bindOpenFile(this.model.openFile)
        this.view.bindRunFile(this.model.runFile)
    }
}

export default new TerminalController(new TerminalModel, new TerminalView)
