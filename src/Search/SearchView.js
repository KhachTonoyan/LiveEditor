class SearchView {
  constructor() {
    this.searchPanel = document.createElement('div');
    this.searchPanel.className = 'searchPanel';
    this.searchPanel.id = 'searchPanelId';

    const header = document.createElement('div');
    header.id = 'header';
    header.style.cursor = 'move';
    const closeButton = document.createElement('button');
    closeButton.id = 'closeButton';
    closeButton.setAttribute('class', 'fa fa-times');
    closeButton.onclick = () => {
      document.getElementById('app').removeChild(this.searchPanel);
    };
    header.appendChild(closeButton);
    this.searchPanel.appendChild(header);

    const topPanel = document.createElement('div');
    topPanel.id = 'topPanel';

    const fieldNameSearch = document.createElement('p');
    fieldNameSearch.textContent = 'Search:';
    fieldNameSearch.style.marginBottom = '1px';
    topPanel.appendChild(fieldNameSearch);

    this.input = document.createElement('input');
    this.input.id = 'searchInput';
    this.input.className = 'input-group';
    this.input.style.marginBottom = '1px';
    topPanel.appendChild(this.input);

    const fieldNameFilesToInclude = document.createElement('p');
    fieldNameFilesToInclude.textContent = 'Files to include (comma-separated):';
    fieldNameFilesToInclude.style.marginBottom = '1px';
    topPanel.appendChild(fieldNameFilesToInclude);

    this.filesInclude = document.createElement('input');
    this.filesInclude.id = 'ftiInput';
    this.filesInclude.className = 'input-group';
    this.filesInclude.style.marginBottom = '1px';
    topPanel.appendChild(this.filesInclude);

    const fieldNameFilesToExclude = document.createElement('p');
    fieldNameFilesToExclude.textContent = 'Files to exclude (comma-separated):';
    fieldNameFilesToExclude.style.marginBottom = '1px';
    topPanel.appendChild(fieldNameFilesToExclude);

    this.filesExclude = document.createElement('input');
    this.filesExclude.id = 'fteInput';
    this.filesExclude.className = 'input-group';
    this.filesExclude.style.marginBottom = '1px';
    topPanel.appendChild(this.filesExclude);

    this.searchPanel.appendChild(topPanel);

    this.resultsPanel = document.createElement('div');
    this.searchPanel.appendChild(this.resultsPanel);
    drag(this.searchPanel);
  }

  openSearchWindow() {
    if (this.searchPanel.parentNode === null) document.getElementById('app').appendChild(this.searchPanel);
    else document.getElementById('app').removeChild(this.searchPanel);
  }

  printResults(path) {
    const res = document.createElement('p');
    res.textContent = path;
    this.resultsPanel.insertAdjacentElement('beforeend', res);
  }

  clearResultList() {
    this.resultsPanel.innerHTML = '';
  }
}

function drag(element) {
  let x = 0;
  let y = 0;
  let x1 = 0;
  let y2 = 0;

  element.onmousedown = dragMouseDown;

  function dragMouseDown(e) {
    if (e.target.id !== 'header') return;
    e.preventDefault();
    element.style.opacity = '10%';
    x1 = e.clientX;
    y2 = e.clientY;
    document.onmouseup = closedrag;
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e.preventDefault();

    x = x1 - e.clientX;
    y = y2 - e.clientY;
    x1 = e.clientX;
    y2 = e.clientY;
    element.style.top = `${element.offsetTop - y}px`;
    element.style.left = `${element.offsetLeft - x}px`;
  }

  function closedrag() {
    document.onmouseup = null;
    document.onmousemove = null;
    element.style.opacity = '85%';
  }
}

export default SearchView;
