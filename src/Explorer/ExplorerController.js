import ExplorerModel from "./ExplorerModel.js"
import ExplorerView from "./ExplorerView.js"

class ExplorerController{
    constructor(model,view){
        this.model = model
        this.view = view

        this.view.bindOnCreate(this.model.onCreate)
    } 
}

export default new ExplorerController(new ExplorerModel,new ExplorerView)