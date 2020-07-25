import ExplorerModel from './ExplorerModel.js';
import ExplorerView from './ExplorerView.js';

class ExplorerController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.view.renderExplorer(this.model.root, this.view.list);

    this.view.bindOnCreate(this.model.create);
    this.model.bindRenderExplorer(() => this.view.renderExplorer(this.model.root, this.view.list));
    this.view.bindSetActive(this.model.setActive.bind(this.model));
    this.view.bindToggleExpanded(this.model.toggleExpanded);
  }
}

export default new ExplorerController(new ExplorerModel(), new ExplorerView());
