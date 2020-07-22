import ExplorerModel from "./ExplorerModel.js"
import ExplorerView from "./ExplorerView.js"

class ExplorerController {
    constructor(model, view) {
        this.model = model;
        this.view = view;

        this.view.renderExplorer(this.model.root, this.view.list);

        this.view.bindOnCreate(this.model.onCreate);
        this.model.bindRenderExplorer(() => this.view.renderExplorer(this.model.root, this.view.list))


    }
}

export default new ExplorerController(new ExplorerModel, new ExplorerView)