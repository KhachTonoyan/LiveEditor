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

    const fieldNameFilesToInclude = document.createElement('p');
    fieldNameFilesToInclude.textContent = 'Files to include (comma-separated):';
    fieldNameFilesToInclude.style.marginBottom = '1px';
    topPanel.appendChild(fieldNameFilesToInclude);

    this.filesInclude = document.createElement('input');
    this.filesInclude.id = 'ftiInput';
    this.filesInclude.style.marginBottom = '1px';
    topPanel.appendChild(this.filesInclude);

    const fieldNameFilesToExclude = document.createElement('p');
    fieldNameFilesToExclude.textContent = 'Files to exlude (comma-separated):';
    fieldNameFilesToExclude.style.marginBottom = '1px';
    topPanel.appendChild(fieldNameFilesToExclude);

    this.filesExclude = document.createElement('input');
    this.filesExclude.id = 'fteInput';
    this.filesExclude.style.marginBottom = '1px';
    topPanel.appendChild(this.filesExclude);

    const closeButton = document.createElement('button');
    closeButton.id = 'closeButton';
    closeButton.textContent = 'X';
    closeButton.onclick = () => {
      document.getElementById('app').removeChild(this.searchPanel);
      this.isSearchPanelOpen = false;
    };
    this.searchPanel.appendChild(closeButton);

    this.searchPanel.appendChild(topPanel);

    this.resultsPanel = document.createElement('div');
    this.searchPanel.appendChild(this.resultsPanel);

    this.isSearchPanelOpen = false;
  }

  openSearchWindow() {
    if(!this.isSearchPanelOpen) {
      document.getElementById('app').appendChild(this.searchPanel);
      this.isSearchPanelOpen = true;
    } else {
      document.getElementById('app').removeChild(this.searchPanel);
      this.isSearchPanelOpen = false;
    }
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
