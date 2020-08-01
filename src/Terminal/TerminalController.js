import TerminalModel from './TerminalModel.js';
import TerminalView from './TerminalView.js';
import state from '../_common/State/State.js';

class TerminalController {
  constructor(model, view) {
    this.model = model;
    this.view = view;

    state.bindUpdateTerminal(this.model.update);
    this.view.bindOnGetPath(this.model.getPath);
    this.view.bindPathAction(this.model.changeLocation);
    this.view.bindOpenFile(this.model.openFile);
    this.view.bindRunFile(this.model.runFile);
    this.view.bindCreate(this.model.create);
    this.view.bindRemove(this.model.remove);
    this.view.bindRename(this.model.rename);
  }
}

export default new TerminalController(new TerminalModel(), new TerminalView());
