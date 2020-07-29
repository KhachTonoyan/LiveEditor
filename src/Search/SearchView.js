class SearchView {
  constructor() {
    this.searchPanel = document.createElement('div');
    this.searchPanel.className = 'searchPanel';

    const topPanel = document.createElement('div');
    topPanel.id = 'topPanel';

    const fieldNameSearch = document.createElement('p');
    fieldNameSearch.textContent = 'Search:';
    fieldNameSearch.style.marginBottom = '1px';
    topPanel.appendChild(fieldNameSearch);

    this.input = document.createElement('input');
    this.input.id = 'searchInput';
    this.input.style.marginBottom = '1px';
    topPanel.appendChild(this.input);

    const fieldNameFilesToExclude = document.createElement('p');
    fieldNameFilesToExclude.textContent = 'Files to exlude (comma-separated):';
    fieldNameFilesToExclude.style.marginBottom = '1px';
    topPanel.appendChild(fieldNameFilesToExclude);

    this.filesExclude = document.createElement('input');
    this.filesExclude.id = 'fteInput';
    this.filesExclude.style.marginBottom = '1px';
    topPanel.appendChild(this.filesExclude);

    // const goButton = document.createElement('button');
    // goButton.id = 'go';
    // goButton.textContent = 'GO!';
    // topPanel.appendChild(goButton);

    const closeButton = document.createElement('button');
    closeButton.id = 'closeButton';
    closeButton.textContent = 'X';
    closeButton.onclick = () => {
      document.getElementById('app').removeChild(this.searchPanel);
    };
    this.searchPanel.appendChild(closeButton);

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
    // this.input.value = '';
  }
}

export default SearchView;
