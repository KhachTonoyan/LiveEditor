class SearchView {
  constructor() {
    this.searchPanel = document.createElement('div');
    this.searchPanel.className = 'searchPanel';

    const topPanel = document.createElement('div');
    topPanel.id = 'topPanel';

    this.input = document.createElement('input');
    this.input.id = 'searchInput';
    topPanel.appendChild(this.input);

    const goButton = document.createElement('button');
    goButton.id = 'go';
    goButton.textContent = 'GO!';
    topPanel.appendChild(goButton);

    const closeButton = document.createElement('button');
    closeButton.id = 'closeButton';
    closeButton.textContent = 'X';
    closeButton.onclick = () => {
      document.getElementById('app').removeChild(this.searchPanel);
    };
    topPanel.appendChild(closeButton);

    this.searchPanel.appendChild(topPanel);

    this.resultsPanel = document.createElement('div');
    this.searchPanel.appendChild(this.resultsPanel);
  }

  openSearchWindow() {
    document.getElementById('app').appendChild(this.searchPanel);
  }

  printResults(path) {
    const res = document.createElement('p');
    res.textContent = path;
    this.resultsPanel.insertAdjacentElement('beforeend', res);
  }

  clearResultList() {
    this.resultsPanel.innerHTML = '';
    this.input.value = '';
  }
}

export default SearchView;
