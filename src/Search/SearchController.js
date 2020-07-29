import SearchModel from './SearchModel.js';
import SearchView from './SearchView.js';
import State from '../State/State.js';

class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;

    this.initView();
  }

  initView() {
    document.getElementById('searchBtn').addEventListener('click', () => {
      this.view.openSearchWindow();
    });

    document.getElementById('app').addEventListener('input', (event) => {
      if (event.target.id === 'searchInput' || event.target.id === 'fteInput') {
        find.call(this,
          document.getElementById('searchInput').value,
          document.getElementById('fteInput').value);
      }
    });
  }

  updateResults(path) {
    if (path) this.view.printResults(path);
  }
}

function find(input, fteInput) {
  const pattern = input;

  const filesToExclude = new Map();
  fteInput.trim().split(',').forEach((value) => {
    filesToExclude.set(value, true);
  });

  this.view.clearResultList();
  if (pattern) this.model.search(State.root, pattern, filesToExclude);
}

export default new Controller(new SearchView(), new SearchModel());
