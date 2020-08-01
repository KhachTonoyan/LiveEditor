import state from '../_common/State/State.js';

class TabsModel {
  constructor() {
    state.bindUpdateTabsInModel(this.updateTabsInModel);
    this.updateTabsInState = state.updateTabsInState;
    this.saveTabContent = state.saveTabContent;
  }

  updateTabsInModel = (file, operation, openTabs) => {
    this.renderTabs(file, operation, openTabs);
  };

  bindRenderTabs(cb) {
    this.renderTabs = cb;
  }
}

export default TabsModel;
