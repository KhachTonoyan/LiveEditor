import SearchModel from './SearchModel.js';
import SearchView from './SearchView.js';
import State from '../State/State.js';

let timer = null;
class Controller {
  constructor(view, model) {
    this.view = view;
    this.model = model;
    console.log(State.root);
    this.initView();
  }

  initView() {
    document.getElementById('searchBtn').addEventListener('click', () => {
      this.view.openSearchWindow();
    });

    document.getElementById('app').addEventListener('keydown', (event) => {
      clearTimeout(timer);
      timer = setTimeout(helper.bind(this, event), 1000);
    });
  }

  updateResults(path) {
    if (path) this.view.printResults(path);
  }
}

function helper(event) {
  if (event.target.id === 'searchInput'
  || event.target.id === 'fteInput'
  || event.target.id === 'ftiInput') {
    find.call(this, document.getElementById('searchInput').value,
      document.getElementById('fteInput').value,
      document.getElementById('ftiInput').value);
  }
}

function find(input, fteInput, ftiInput) {
  const pattern = input;

  const filesToExclude = new Map();
  fteInput.split(',').forEach((value) => {
    if (value) filesToExclude.set(value.trim(), true);
  });

  const filesToInclude = new Map();
  ftiInput.split(',').forEach((value) => {
    if (value) filesToInclude.set(value.trim(), true);
  });

  this.view.clearResultList();
  if (pattern) this.model.search(State.root, pattern, filesToExclude, filesToInclude);
}

export default new Controller(new SearchView(), new SearchModel());
