import TabsModel from './TabsModel.js';
import TabsView from './TabsView.js';

class TabsController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    this.model.bindRenderTabs(this.view.renderTabs);
    this.view.bindUpdateTabsInState(this.model.updateTabsInState);
    this.view.bindSaveTabContent(this.model.saveTabContent);
  }
}

export default new TabsController(new TabsModel(), new TabsView());
